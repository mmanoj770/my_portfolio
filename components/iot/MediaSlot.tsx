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
        className={`relative flex flex-col items-center justify-center gap-2.5 rounded-xl border border-base-border bg-base-surface/80 p-5 text-center ${aspectClass} ${className}`}
      >
        {type === "video" ? (
          <VideoIcon size={24} className="text-ink-faint opacity-60" />
        ) : (
          <ImageIcon size={24} className="text-ink-faint opacity-60" />
        )}
        <p className="text-xs font-medium text-ink-muted">{label}</p>
        <code className="font-mono text-[10px] text-ink-faint break-all bg-base-raised/80 px-2 py-0.5 rounded border border-base-border/40">
          {src}
        </code>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-base-border bg-base-surface ${aspectClass} ${className}`}
    >
      {type === "video" ? (
        <video
          controls
          className="h-full w-full object-cover"
          onLoadedData={() => setHasLoaded(true)}
          onError={() => setHasError(true)}
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={src}
          alt={alt}
          className={`h-full w-full object-cover transition-opacity duration-300 ${
            hasLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setHasLoaded(true)}
          onError={() => setHasError(true)}
        />
      )}
      {!hasLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 bg-base-surface p-5 text-center">
          {type === "video" ? (
            <VideoIcon size={24} className="text-ink-faint opacity-60" />
          ) : (
            <ImageIcon size={24} className="text-ink-faint opacity-60" />
          )}
          <p className="text-xs font-medium text-ink-muted">{label}</p>
          <code className="font-mono text-[10px] text-ink-faint break-all bg-base-raised/80 px-2 py-0.5 rounded border border-base-border/40">
            {src}
          </code>
        </div>
      )}
    </div>
  );
}
