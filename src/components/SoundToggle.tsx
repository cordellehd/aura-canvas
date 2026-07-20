import { Volume2, VolumeX } from "lucide-react";
import { useSound } from "@/hooks/useSound";

export function SoundToggle() {
  const { muted, toggle } = useSound();
  return (
    <button
      onClick={toggle}
      aria-label={muted ? "Unmute" : "Mute"}
      className="glass flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:text-neon"
    >
      {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
    </button>
  );
}
