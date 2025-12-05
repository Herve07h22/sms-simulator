import { useState, useRef, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Sender, Participants } from "@/types/conversation";

interface MessageFormProps {
  participants: Participants;
  onAddMessage: (text: string, sender: Sender) => void;
}

export default function MessageForm({ participants, onAddMessage }: MessageFormProps) {
  const [text, setText] = useState("");
  const [sender, setSender] = useState<Sender>("personA");
  const [error, setError] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const handleSubmit = () => {
    const trimmedText = text.trim();
    
    if (!trimmedText) {
      setError("Message cannot be empty");
      return;
    }

    onAddMessage(trimmedText, sender);
    setText("");
    setError("");
    
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    if (error) setError("");
  };

  return (
    <Card data-testid="message-form">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Add Message</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <RadioGroup 
          value={sender} 
          onValueChange={(v) => setSender(v as Sender)}
          className="flex gap-4"
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem value="personA" id="sender-personA" data-testid="radio-sender-personA" />
            <Label htmlFor="sender-personA" className="text-sm cursor-pointer">
              {participants.personA || 'Person A'}
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="personB" id="sender-personB" data-testid="radio-sender-personB" />
            <Label htmlFor="sender-personB" className="text-sm cursor-pointer">
              {participants.personB || 'Person B'}
            </Label>
          </div>
        </RadioGroup>

        <div className="space-y-2">
          <Textarea
            ref={textareaRef}
            value={text}
            onChange={handleTextChange}
            onKeyDown={handleKeyDown}
            placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)"
            className="min-h-24 resize-none"
            data-testid="input-message-text"
          />
          {error && (
            <p className="text-xs text-destructive" data-testid="text-error">
              {error}
            </p>
          )}
        </div>

        <Button 
          onClick={handleSubmit} 
          className="w-full"
          disabled={!text.trim()}
          data-testid="button-add-message"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Message
        </Button>
      </CardContent>
    </Card>
  );
}
