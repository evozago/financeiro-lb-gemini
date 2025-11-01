
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality, Blob as GenAI_Blob } from '@google/genai';
import { Mic, StopCircle, X } from 'lucide-react';

interface AudioTranscriberProps {
  onClose: () => void;
}

// Helper to encode raw audio data to base64
function encode(bytes: Uint8Array): string {
    let binary = '';
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}

const AudioTranscriber: React.FC<AudioTranscriberProps> = ({ onClose }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [status, setStatus] = useState('Pronto para gravar.');
  const sessionRef = useRef<Promise<any> | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const stopRecording = useCallback(() => {
    setStatus('Parando gravação...');
    if (sessionRef.current) {
        sessionRef.current.then(session => session?.close());
        sessionRef.current = null;
    }
    if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
    }
    if (processorRef.current) {
        processorRef.current.disconnect();
        processorRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
    }
    
    setIsRecording(false);
    setStatus('Gravação finalizada.');
  }, []);

  const startRecording = useCallback(async () => {
    try {
      setStatus('Iniciando...');
      const apiKey = process.env.API_KEY;
      if (!apiKey) {
        setStatus('Erro: A chave da API não está configurada.');
        console.error("Gemini API key not found in environment variables.");
        return;
      }
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      const ai = new GoogleGenAI({ apiKey });

      sessionRef.current = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          inputAudioTranscription: {},
        },
        callbacks: {
          onopen: () => setStatus('Conectado. Gravando...'),
          onmessage: (message: LiveServerMessage) => {
            if (message.serverContent?.inputTranscription) {
              setTranscription(prev => prev + message.serverContent.inputTranscription.text);
            }
          },
          onerror: (e: ErrorEvent) => {
            console.error('Live API Error:', e);
            setStatus(`Erro: ${e.message}`);
            stopRecording();
          },
          onclose: (e: CloseEvent) => {
             setStatus('Conexão fechada.');
          },
        }
      });
      
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const source = audioContextRef.current.createMediaStreamSource(stream);
      processorRef.current = audioContextRef.current.createScriptProcessor(4096, 1, 1);

      processorRef.current.onaudioprocess = (audioProcessingEvent) => {
        const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
        const l = inputData.length;
        const int16 = new Int16Array(l);
        for (let i = 0; i < l; i++) {
            int16[i] = inputData[i] * 32768;
        }
        const pcmBlob: GenAI_Blob = {
            data: encode(new Uint8Array(int16.buffer)),
            mimeType: 'audio/pcm;rate=16000',
        };
        
        sessionRef.current?.then((session) => {
            session.sendRealtimeInput({ media: pcmBlob });
        });
      };

      source.connect(processorRef.current);
      processorRef.current.connect(audioContextRef.current.destination);
      
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
      setStatus('Erro ao acessar o microfone.');
    }
  }, [stopRecording]);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if(isRecording) {
        stopRecording();
      }
    };
  }, [isRecording, stopRecording]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Transcrição de Áudio</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><X size={24} /></button>
        </div>
        <div className="space-y-4">
          <div className="w-full min-h-[150px] p-3 border rounded-md bg-gray-50 text-gray-800">
            {transcription || <span className="text-gray-400">A transcrição aparecerá aqui...</span>}
          </div>
          <div className="text-center text-sm font-medium text-gray-600">{status}</div>
          <div className="flex justify-center items-center space-x-4">
            {!isRecording ? (
              <button onClick={startRecording} className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition">
                <Mic size={20} />
                <span>Iniciar Gravação</span>
              </button>
            ) : (
              <button onClick={stopRecording} className="flex items-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 transition">
                <StopCircle size={20} />
                <span>Parar Gravação</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioTranscriber;
