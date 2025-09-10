import Vapi from "@vapi-ai/web";
import { useEffect, useState } from "react";

interface TranscriptMessage {
    role:"user" | "assistant";
    text: string;
};

export const useVapi = () => {
    const[vapi, setVapi] = useState<Vapi | null>(null);
    const[isConnected, setIsConnected] = useState(false);
    const[isConnecting, setIsConnecting] = useState(false);
    const[isSpeaking, setIsSpeaking] = useState(false);
    const[transcript, setTranscript] = useState<TranscriptMessage[]>([]);

    useEffect(() => {
        // Only for testing the Vapi API, otherwise customers will provide their own API keys
        const vapiInstance = new Vapi("2ec9da0f-2f1f-4be9-be2c-326b001c8bd5");
        setVapi(vapiInstance);

        vapiInstance.on("call-start", () => {
            setIsConnected(true);
            setIsConnecting(false);
            setTranscript([]);
        });

        vapiInstance.on("call-end", () => {
            setIsConnected(false);
            setIsConnecting(false);
            setIsSpeaking(false);
        });

        vapiInstance.on("speech-start", () => {
            setIsSpeaking(true);
        });

        vapiInstance.on("speech-end", () => {
            setIsSpeaking(false);
        });

        vapiInstance.on("error", (error) => {
            console.log(error, "VAPI_ERROR");
            setIsConnecting(false);
        });

        vapiInstance.on("message", (message) =>{
            if(message.type ==="transcript" && message.transcriptType === "final") {
                setTranscript((prev) => [
                    ...prev,
                    {
                        role: message.role ==="user" ? "user" : "assistant",
                        text: message.transcript,
                    }
                ]);
            }
        });

        return () => {
            vapiInstance?.stop();
        }

    }, []);

    const startCall = () => {
        setIsConnecting(true);

        if(vapi){
        // Only for testing the Vapi API, otherwise customers will provide their own Assistant IDs    
            vapi.start("bee36240-eb3d-4790-b892-845301e338ea");
        }
    };

    const endCall =() => {
        if (vapi) {
            vapi.stop();
        }
    };

    return {
        isSpeaking,
        isConnecting,
        isConnected,
        transcript,
        startCall,
        endCall,
    }

};