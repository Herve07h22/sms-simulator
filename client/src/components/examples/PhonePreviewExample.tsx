import PhonePreview from '../PhonePreview';
import type { Message, Participants } from '@/types/conversation';

export default function PhonePreviewExample() {
  const messages: Message[] = [
    { id: '1', sender: 'personA', text: 'Hey! Are you coming to the party tonight?' },
    { id: '2', sender: 'personB', text: 'Yes! What time does it start?' },
    { id: '3', sender: 'personB', text: 'And should I bring anything?' },
    { id: '4', sender: 'personA', text: 'Starts at 8pm. Just bring yourself!' },
    { id: '5', sender: 'personB', text: 'Perfect, see you there!' },
  ];

  const participants: Participants = {
    personA: 'Sarah',
    personB: 'You',
  };

  return (
    <div className="bg-background min-h-screen flex items-center justify-center">
      <PhonePreview messages={messages} participants={participants} />
    </div>
  );
}
