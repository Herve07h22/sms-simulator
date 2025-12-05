import { useState } from 'react';
import MessageForm from '../MessageForm';
import type { Message, Sender, Participants } from '@/types/conversation';

export default function MessageFormExample() {
  const [messages, setMessages] = useState<Message[]>([]);

  const participants: Participants = {
    personA: 'Friend',
    personB: 'You',
  };

  const handleAddMessage = (text: string, sender: Sender) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
    };
    setMessages(prev => [...prev, newMessage]);
    console.log('Added message:', newMessage);
  };

  return (
    <div className="p-4 max-w-md space-y-4">
      <MessageForm 
        participants={participants} 
        onAddMessage={handleAddMessage} 
      />
      
      {messages.length > 0 && (
        <div className="p-4 bg-muted rounded-md">
          <p className="text-sm font-medium mb-2">Added messages:</p>
          <ul className="space-y-1 text-sm">
            {messages.map(m => (
              <li key={m.id} className="text-muted-foreground">
                [{m.sender}]: {m.text}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
