export type Sender = 'personA' | 'personB';

export interface Message {
  id: string;
  sender: Sender;
  text: string;
}

export interface Participants {
  personA: string;
  personB: string;
}

export interface ConversationState {
  messages: Message[];
  participants: Participants;
}
