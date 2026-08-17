import type { Voice } from "@/lib/content";

export default function VoiceCard({ voice }: { voice: Voice }) {
  return (
    <div className="voice-card">
      <p className="quote">{voice.quote}</p>
      <p className="who">{voice.who}</p>
    </div>
  );
}
