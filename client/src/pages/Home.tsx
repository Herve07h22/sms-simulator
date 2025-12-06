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
  const [phoneBgColor, setPhoneBgColor] = useLocalStorage<string>('sms-simulator-phone-bg-color', 'blue');

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

  const colorOptions = [
    { value: 'blue', label: 'Bleu', bgClass: 'bg-blue-200' },
    { value: 'green', label: 'Vert', bgClass: 'bg-green-200' },
    { value: 'purple', label: 'Violet', bgClass: 'bg-purple-200' },
    { value: 'pink', label: 'Rose', bgClass: 'bg-pink-200' },
    { value: 'orange', label: 'Orange', bgClass: 'bg-orange-200' },
  ];

  const selectedColor = colorOptions.find(c => c.value === phoneBgColor) || colorOptions[0];

  return (
    <div className="min-h-screen bg-background flex flex-col">
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

      <main className="flex-1 max-w-7xl mx-auto px-4 lg:px-8 py-6 w-full">
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
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-muted-foreground lg:hidden">
                  Preview
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground hidden sm:inline">Background color:</span>
                  <div className="flex gap-1">
                    {colorOptions.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => setPhoneBgColor(color.value)}
                        className={`w-6 h-6 rounded-full border-2 transition-all ${
                          phoneBgColor === color.value
                            ? 'border-foreground scale-110'
                            : 'border-transparent hover:border-muted-foreground/50'
                        } ${color.bgClass}`}
                        title={color.label}
                        data-testid={`color-option-${color.value}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className={selectedColor.bgClass}>
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
        </div>
      </main>

      <footer className="border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              <strong>SMS Chat Simulator</strong> is a free, browser-based tool that allows you to create and preview realistic SMS-style conversations between two people. Perfect for creating mockups, demonstrations, or educational content. All data is stored locally in your browser - no server, no database, completely private.
            </p>
            <p className="text-xs text-muted-foreground/80">
              Create, edit, and customize your conversations with real-time preview. Change participant names, add messages, and export your conversations as needed.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
