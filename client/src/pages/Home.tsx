import { useEffect, useState } from "react";
import { MessageSquarePlus, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import ConversationEditor from "@/components/ConversationEditor";
import PhonePreview from "@/components/PhonePreview";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { Message, Sender, Participants } from "@/types/conversation";

export default function Home() {
  const [messages, setMessages] = useLocalStorage<Message[]>('sms-simulator-messages', []);
  const [participants, setParticipants] = useLocalStorage<Participants>('sms-simulator-participants', {
    personA: "",
    personB: "",
  });
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('sms-simulator-theme') === 'dark';
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('sms-simulator-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

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

  const handleClearAll = () => {
    setMessages([]);
    setParticipants({ personA: "", personB: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between gap-4 h-16">
            <div className="flex items-center gap-3">
              <MessageSquarePlus className="w-6 h-6 text-primary" />
              <h1 className="font-semibold text-lg">SMS Chat Simulator</h1>
            </div>
            
            <div className="flex items-center gap-2">
              {messages.length > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleClearAll}
                  data-testid="button-clear-all"
                >
                  Clear All
                </Button>
              )}
              <Button
                size="icon"
                variant="ghost"
                onClick={toggleTheme}
                data-testid="button-toggle-theme"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="order-2 lg:order-1">
            <div className="lg:sticky lg:top-24">
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
          </div>

          <div className="order-1 lg:order-2">
            <div className="lg:sticky lg:top-24">
              <div className="flex items-center justify-center mb-4 lg:mb-0">
                <p className="text-sm text-muted-foreground lg:hidden">
                  Preview
                </p>
              </div>
              <PhonePreview 
                messages={messages} 
                participants={{
                  personA: participants.personA || "Friend",
                  personB: participants.personB || "You"
                }}
              />
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Create and preview SMS-style conversations
          </p>
        </div>
      </footer>
    </div>
  );
}
