import { ScrollArea } from "@/components/ui/scroll-area";
import ParticipantSettings from "./ParticipantSettings";
import MessageForm from "./MessageForm";
import MessageItem from "./MessageItem";
import type { Message, Sender, Participants } from "@/types/conversation";
import { MessageSquare } from "lucide-react";

interface ConversationEditorProps {
  messages: Message[];
  participants: Participants;
  onParticipantsChange: (participants: Participants) => void;
  onAddMessage: (text: string, sender: Sender) => void;
  onEditMessage: (id: string, text: string, sender: Sender) => void;
  onDeleteMessage: (id: string) => void;
  onMoveMessageUp: (id: string) => void;
  onMoveMessageDown: (id: string) => void;
}

export default function ConversationEditor({
  messages,
  participants,
  onParticipantsChange,
  onAddMessage,
  onEditMessage,
  onDeleteMessage,
  onMoveMessageUp,
  onMoveMessageDown,
}: ConversationEditorProps) {
  return (
    <div className="h-full flex flex-col" data-testid="conversation-editor">
      <div className="flex-shrink-0 space-y-4 pb-4">
        <ParticipantSettings
          participants={participants}
          onParticipantsChange={onParticipantsChange}
        />
        
        <MessageForm
          participants={participants}
          onAddMessage={onAddMessage}
        />
      </div>

      <div className="flex-1 min-h-0">
        <div className="flex items-center gap-2 mb-3">
          <MessageSquare className="w-4 h-4 text-muted-foreground" />
          <h3 className="font-medium text-sm">Messages ({messages.length})</h3>
        </div>
        
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <MessageSquare className="w-12 h-12 mb-3 opacity-50" />
            <p className="text-sm text-center">No messages yet</p>
            <p className="text-xs text-center mt-1">
              Add your first message using the form above
            </p>
          </div>
        ) : (
          <ScrollArea className="h-[calc(100vh-520px)] pr-2">
            <div className="space-y-3">
              {messages.map((message, index) => (
                <MessageItem
                  key={message.id}
                  message={message}
                  participants={participants}
                  isFirst={index === 0}
                  isLast={index === messages.length - 1}
                  onEdit={onEditMessage}
                  onDelete={onDeleteMessage}
                  onMoveUp={onMoveMessageUp}
                  onMoveDown={onMoveMessageDown}
                />
              ))}
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  );
}
