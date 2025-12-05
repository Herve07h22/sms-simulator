import { cn } from "@/lib/utils";
import type { Sender } from "@/types/conversation";

interface ChatBubbleProps {
  text: string;
  sender: Sender;
  isConsecutive?: boolean;
}

export default function ChatBubble({ text, sender, isConsecutive = false }: ChatBubbleProps) {
  const isSent = sender === 'personB';
  
  return (
    <div
      className={cn(
        "flex w-full",
        isSent ? "justify-end" : "justify-start",
        isConsecutive ? "mt-1" : "mt-3"
      )}
      data-testid={`bubble-${sender}`}
    >
      <div
        className={cn(
          "max-w-[75%] px-4 py-2 text-sm whitespace-pre-wrap break-words",
          isSent 
            ? "bg-bubble-sent text-bubble-sent-foreground rounded-2xl rounded-br-md" 
            : "bg-bubble-received text-bubble-received-foreground rounded-2xl rounded-bl-md"
        )}
      >
        {text}
      </div>
    </div>
  );
}
