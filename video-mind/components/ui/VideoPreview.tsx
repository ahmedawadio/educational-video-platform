import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface VideoPreviewProps {
  src: string;
  poster?: string;
  className?: string;
  controls?: boolean;
  muted?: boolean;
  loop?: boolean;
  startTime?: number;
}

export function VideoPreview({
  src,
  poster,
  className,
  controls = false,
  muted = true,
  loop = true,
  startTime = 1,
}: VideoPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Play video as soon as it's loaded
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    
    const handleCanPlay = () => {
      // Set current time and play
      videoElement.currentTime = startTime;
      videoElement.play().catch(e => console.log("Could not autoplay", e));
    };
    
    videoElement.addEventListener('canplay', handleCanPlay);
    
    // Try to play immediately if it's already loaded
    if (videoElement.readyState >= 3) {
      videoElement.currentTime = startTime;
      videoElement.play().catch(e => console.log("Could not autoplay", e));
    }
    
    return () => {
      videoElement.removeEventListener('canplay', handleCanPlay);
    };
  }, [startTime]);
  
  return (
    <div className={className}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        controls={controls}
        muted={muted}
        loop={loop}
        playsInline
        autoPlay
        preload="auto"
        className="w-full h-full object-cover"
      />
    </div>
  );
}