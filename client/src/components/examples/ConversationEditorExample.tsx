import { useState } from 'react';
import ConversationEditor from '../ConversationEditor';
import type { Message, Sender, Participants } from '@/types/conversation';

export default function ConversationEditorExample() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'personA', text: 'Hey! Are you free this weekend?' },
    { id: '2', sender: 'personB', text: 'Yeah, what did you have in mind?' },
  ]);
  
  const [participants, setParticipants] = useState<Participants>({
    personA: 'Alex',
    personB: 'You',
  });

  const handleAddMessage = (text: string, sender: Sender) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleEditMessage = (id: string, text: string, sender: Sender) => {
    setMessages(prev => prev.map(m => 
      m.id === id ? { ...m, text, sender } : m
    ));
  };

  const handleDeleteMessage = (id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id));
  };

  const handleMoveUp = (id: string) => {
    setMessages(prev => {
      const idx = prev.findIndex(m => m.id === id);
      if (idx <= 0) return prev;
      const newArr = [...prev];
      [newArr[idx - 1], newArr[idx]] = [newArr[idx], newArr[idx - 1]];
      return newArr;
    });
  };

  const handleMoveDown = (id: string) => {
    setMessages(prev => {
      const idx = prev.findIndex(m => m.id === id);
      if (idx < 0 || idx >= prev.length - 1) return prev;
      const newArr = [...prev];
      [newArr[idx], newArr[idx + 1]] = [newArr[idx + 1], newArr[idx]];
      return newArr;
    });
  };

  return (
    <div className="p-4 max-w-lg h-screen">
      <ConversationEditor
        messages={messages}
        participants={participants}
        onParticipantsChange={setParticipants}
        onAddMessage={handleAddMessage}
        onEditMessage={handleEditMessage}
        onDeleteMessage={handleDeleteMessage}
        onMoveMessageUp={handleMoveUp}
        onMoveMessageDown={handleMoveDown}
      />
    </div>
  );
}
