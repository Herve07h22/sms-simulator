import { useState } from 'react';
import ParticipantSettings from '../ParticipantSettings';
import type { Participants } from '@/types/conversation';

export default function ParticipantSettingsExample() {
  const [participants, setParticipants] = useState<Participants>({
    personA: 'Sarah',
    personB: 'You',
  });

  return (
    <div className="p-4 max-w-md space-y-4">
      <ParticipantSettings
        participants={participants}
        onParticipantsChange={setParticipants}
      />
      
      <div className="p-4 bg-muted rounded-md">
        <p className="text-sm font-medium mb-2">Current settings:</p>
        <p className="text-sm text-muted-foreground">
          Person A: {participants.personA || '(empty)'}
        </p>
        <p className="text-sm text-muted-foreground">
          Person B: {participants.personB || '(empty)'}
        </p>
      </div>
    </div>
  );
}
