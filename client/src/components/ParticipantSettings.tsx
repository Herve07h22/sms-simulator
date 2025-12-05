import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Participants } from "@/types/conversation";

interface ParticipantSettingsProps {
  participants: Participants;
  onParticipantsChange: (participants: Participants) => void;
}

export default function ParticipantSettings({
  participants,
  onParticipantsChange,
}: ParticipantSettingsProps) {
  const handleChange = (field: keyof Participants, value: string) => {
    onParticipantsChange({
      ...participants,
      [field]: value,
    });
  };

  return (
    <Card data-testid="participant-settings">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Participants</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="personA" className="text-sm">Person A (Left side)</Label>
            <Input
              id="personA"
              value={participants.personA}
              onChange={(e) => handleChange('personA', e.target.value)}
              placeholder="e.g. Friend"
              data-testid="input-personA-name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="personB" className="text-sm">Person B (Right side)</Label>
            <Input
              id="personB"
              value={participants.personB}
              onChange={(e) => handleChange('personB', e.target.value)}
              placeholder="e.g. You"
              data-testid="input-personB-name"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
