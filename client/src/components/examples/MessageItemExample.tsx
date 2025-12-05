import { useState } from 'react';
import MessageItem from '../MessageItem';
import type { Message, Sender, Participants } from '@/types/conversation';

export default function MessageItemExample() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'personA', text: 'Hey, how are you doing?' },
    { id: '2', sender: 'personB', text: 'Great! Just finished work.\nReady for the weekend!' },
  ]);

  const participants: Participants = {
    personA: 'Alex',
    personB: 'You',
  };

  const handleEdit = (id: string, text: string, sender: Sender) => {
    setMessages(prev => prev.map(m => 
      m.id === id ? { ...m, text, sender } : m
    ));
  };

  const handleDelete = (id: string) => {
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
    <div className="p-4 space-y-3 max-w-lg">
      {messages.map((message, index) => (
        <MessageItem
          key={message.id}
          message={message}
          participants={participants}
          isFirst={index === 0}
          isLast={index === messages.length - 1}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onMoveUp={handleMoveUp}
          onMoveDown={handleMoveDown}
        />
      ))}
    </div>
  );
}
