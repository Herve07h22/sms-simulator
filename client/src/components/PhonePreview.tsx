import { ChevronLeft, Phone, Video, MoreVertical, Wifi, Signal, BatteryFull } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatBubble from "./ChatBubble";
import type { Message, Participants } from "@/types/conversation";

interface PhonePreviewProps {
  messages: Message[];
  participants: Participants;
}

export default function PhonePreview({ messages, participants }: PhonePreviewProps) {
  const contactName = participants.personA || "Contact";
  
  return (
    <div className="flex items-center justify-center p-4">
      <div 
        className="relative w-[320px] h-[640px] bg-phone-frame rounded-[3rem] p-3 shadow-2xl"
        data-testid="phone-mockup"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-phone-frame rounded-b-2xl z-20" />
        
        <div className="w-full h-full bg-phone-screen rounded-[2.25rem] overflow-hidden flex flex-col">
          <div className="bg-card/80 backdrop-blur-sm pt-2 pb-0 px-1 flex-shrink-0">
            <div className="flex items-center justify-between px-4 py-1 text-xs text-muted-foreground">
              <span>9:41</span>
              <div className="flex items-center gap-1">
                <Signal className="w-3 h-3" />
                <Wifi className="w-3 h-3" />
                <BatteryFull className="w-4 h-4" />
              </div>
            </div>
            
            <div className="flex items-center gap-2 px-2 py-2">
              <button className="p-1.5 rounded-full" data-testid="button-back">
                <ChevronLeft className="w-5 h-5 text-foreground" />
              </button>
              
              <div className="flex-1 min-w-0">
                <h2 className="font-semibold text-sm truncate" data-testid="text-contact-name">
                  {contactName}
                </h2>
              </div>
              
              <div className="flex items-center gap-1">
                <button className="p-1.5 rounded-full" data-testid="button-call">
                  <Video className="w-4 h-4 text-muted-foreground" />
                </button>
                <button className="p-1.5 rounded-full" data-testid="button-phone">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                </button>
                <button className="p-1.5 rounded-full" data-testid="button-more">
                  <MoreVertical className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>
          </div>
          
          <ScrollArea className="flex-1 px-3 pb-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full py-20 text-muted-foreground">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Phone className="w-8 h-8" />
                </div>
                <p className="text-sm text-center px-4">
                  Add messages to see the conversation preview
                </p>
              </div>
            ) : (
              <div className="pt-2">
                {messages.map((message, index) => {
                  const prevMessage = messages[index - 1];
                  const isConsecutive = prevMessage?.sender === message.sender;
                  
                  return (
                    <ChatBubble
                      key={message.id}
                      text={message.text}
                      sender={message.sender}
                      isConsecutive={isConsecutive}
                    />
                  );
                })}
              </div>
            )}
          </ScrollArea>
          
          <div className="flex-shrink-0 px-3 pb-3 pt-2 bg-card/50 border-t border-border/50">
            <div className="flex items-center gap-2 bg-muted rounded-full px-4 py-2">
              <span className="text-sm text-muted-foreground flex-1">Message</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
