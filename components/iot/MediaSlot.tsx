"use client";

import { useState } from "react";
import { Image as ImageIcon, Video as VideoIcon } from "lucide-react";

interface MediaSlotProps {
  type?: "image" | "video";
  src: string;
  alt: string;
  label: string;
  aspectRatio?: "4/3" | "16/9" | "square" | "auto";
  className?: string;
}

export default function MediaSlot({
  type = "image",
  src,
  alt,
  label,
  aspectRatio = "4/3",
  className = "",
}: MediaSlotProps) {
  const [hasError, setHasError] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const aspectClass =
    aspectRatio === "16/9"
      ? "aspect-video"
      : aspectRatio === "4/3"
      ? "aspect-[4/3]"
      : aspectRatio === "square"
      ? "aspect-square"
      : "";

  if (hasError) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center gap-2 rounded-xl border border-base-border bg-base-surface/80 p-5 text-center ${aspectClass} ${className}`}
      >
        {type === "video" ? (
          <VideoIcon size={22} className="text-ink-faint opacity-60" />
        ) : (
          <ImageIcon size={22} className="text-ink-faint opacity-60" />
        )}
        <p className="text-xs font-medium text-ink-muted">{label}</p>
        <span className="text-[10px] text-ink-faint font-mono">{src}</span>
      </div>
    );
  }

  return (
    <div className={`group relative flex flex-col overflow-hidden rounded-xl border border-base-border bg-base-surface ${className}`}>
      <div className={`relative w-full overflow-hidden bg-base-raised ${aspectClass}`}>
        {type === "video" ? (
          <video
            controls
            preload="metadata"
            className="h-full w-full object-cover"
            onError={() => setHasError(true)}
          >
            <source src={src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <>
            {!hasLoaded && (
              <div className="absolute inset-0 pointer-events-none animate-pulse bg-base-surface/80 flex items-center justify-center">
                <ImageIcon size={20} className="text-ink-faint opacity-40" />
              </div>
            )}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              loading="lazy"
              decoding="async"
              className={`h-full w-full object-cover transition-opacity duration-300 ${
                hasLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setHasLoaded(true)}
              onError={() => setHasError(true)}
            />
          </>
        )}
      </div>

      {label && (
        <div className="border-t border-base-border/50 bg-base-surface px-3 py-2 text-center">
          <p className="text-xs font-medium text-ink-muted line-clamp-1">{label}</p>
        </div>
      )}
    </div>
  );
}


