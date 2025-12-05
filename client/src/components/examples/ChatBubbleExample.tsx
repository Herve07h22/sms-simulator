import ChatBubble from '../ChatBubble';

export default function ChatBubbleExample() {
  return (
    <div className="p-4 bg-phone-screen space-y-1 max-w-sm">
      <ChatBubble text="Hey! How are you?" sender="personA" />
      <ChatBubble text="I'm doing great, thanks for asking!" sender="personB" />
      <ChatBubble text="What are you up to today?" sender="personB" isConsecutive />
      <ChatBubble text="Just working on some projects. Want to grab coffee later?" sender="personA" />
    </div>
  );
}
