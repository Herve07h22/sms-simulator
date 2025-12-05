import { useState } from "react";
import { Pencil, Trash2, ChevronUp, ChevronDown, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import type { Message, Sender, Participants } from "@/types/conversation";

interface MessageItemProps {
  message: Message;
  participants: Participants;
  isFirst: boolean;
  isLast: boolean;
  onEdit: (id: string, text: string, sender: Sender) => void;
  onDelete: (id: string) => void;
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
}

export default function MessageItem({
  message,
  participants,
  isFirst,
  isLast,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown,
}: MessageItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(message.text);
  const [editSender, setEditSender] = useState<Sender>(message.sender);

  const senderName = message.sender === 'personA' 
    ? (participants.personA || 'Person A')
    : (participants.personB || 'Person B');

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(message.id, editText.trim(), editSender);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(message.text);
    setEditSender(message.sender);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <Card className="p-4 space-y-3" data-testid={`message-item-editing-${message.id}`}>
        <RadioGroup 
          value={editSender} 
          onValueChange={(v) => setEditSender(v as Sender)}
          className="flex gap-4"
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem value="personA" id={`edit-personA-${message.id}`} />
            <Label htmlFor={`edit-personA-${message.id}`} className="text-sm">
              {participants.personA || 'Person A'}
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="personB" id={`edit-personB-${message.id}`} />
            <Label htmlFor={`edit-personB-${message.id}`} className="text-sm">
              {participants.personB || 'Person B'}
            </Label>
          </div>
        </RadioGroup>
        
        <Textarea
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className="min-h-20 resize-none"
          data-testid={`input-edit-message-${message.id}`}
        />
        
        <div className="flex gap-2 justify-end">
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={handleCancel}
            data-testid={`button-cancel-edit-${message.id}`}
          >
            <X className="w-4 h-4 mr-1" />
            Cancel
          </Button>
          <Button 
            size="sm" 
            onClick={handleSave}
            disabled={!editText.trim()}
            data-testid={`button-save-edit-${message.id}`}
          >
            <Check className="w-4 h-4 mr-1" />
            Save
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 group" data-testid={`message-item-${message.id}`}>
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <Badge 
            variant="secondary" 
            className={message.sender === 'personB' ? 'bg-bubble-sent/20 text-bubble-sent' : ''}
          >
            {senderName}
          </Badge>
          <p className="mt-2 text-sm whitespace-pre-wrap break-words" data-testid={`text-message-${message.id}`}>
            {message.text}
          </p>
        </div>
        
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onMoveUp(message.id)}
            disabled={isFirst}
            data-testid={`button-move-up-${message.id}`}
          >
            <ChevronUp className="w-4 h-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onMoveDown(message.id)}
            disabled={isLast}
            data-testid={`button-move-down-${message.id}`}
          >
            <ChevronDown className="w-4 h-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setIsEditing(true)}
            data-testid={`button-edit-${message.id}`}
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onDelete(message.id)}
            data-testid={`button-delete-${message.id}`}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
