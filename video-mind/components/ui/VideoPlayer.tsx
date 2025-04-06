import Player from "next-video/player";
import { cn } from "@/lib/utils";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  controls?: boolean;
  muted?: boolean;
  loop?: boolean;
}

export function VideoPlayer({
  src,
  poster, 
  className,
  autoPlay = false,
  controls = true,
  muted = false,
  loop = false,
}: VideoPlayerProps) {
  return (
    <div className={className}>
      <Player
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        controls={controls}
        muted={muted}
        loop={loop}
      />
    </div>
  );
}
