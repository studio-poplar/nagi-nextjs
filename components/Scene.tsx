import Image from "next/image";
import { publicImageExists } from "@/lib/images";

export type SceneMood = "dawn" | "dusk" | "overcast" | "noon";
export type SceneLandmark = "pier" | "bridge" | "church" | "none";

interface WavePaths {
  back: string;
  mid: string;
  fore: string;
}

const WAVES: Record<SceneMood, WavePaths> = {
  dawn: {
    back: "M0,120 C220,60 420,160 720,110 C1020,60 1220,150 1440,100 L1440,420 L0,420 Z",
    mid: "M0,140 C260,90 480,180 760,120 C1040,70 1260,170 1440,130 L1440,420 L0,420 Z",
    fore: "M0,160 C240,110 500,200 760,150 C1040,100 1260,190 1440,150 L1440,420 L0,420 Z",
  },
  dusk: {
    back: "M0,130 C240,80 460,170 720,120 C980,70 1200,160 1440,110 L1440,420 L0,420 Z",
    mid: "M0,150 C260,100 500,190 760,130 C1040,80 1260,180 1440,140 L1440,420 L0,420 Z",
    fore: "M0,170 C240,120 500,210 760,160 C1040,110 1260,200 1440,160 L1440,420 L0,420 Z",
  },
  overcast: {
    back: "M0,110 C220,150 460,70 720,120 C980,170 1220,90 1440,130 L1440,420 L0,420 Z",
    mid: "M0,150 C260,190 500,110 760,160 C1040,200 1260,130 1440,170 L1440,420 L0,420 Z",
    fore: "M0,170 C240,210 500,140 760,180 C1040,220 1260,150 1440,190 L1440,420 L0,420 Z",
  },
  noon: {
    back: "M0,140 C240,90 480,180 720,130 C960,80 1200,170 1440,120 L1440,420 L0,420 Z",
    mid: "M0,160 C260,110 500,200 760,140 C1040,90 1260,190 1440,150 L1440,420 L0,420 Z",
    fore: "M0,180 C240,130 500,220 760,170 C1040,120 1260,210 1440,170 L1440,420 L0,420 Z",
  },
};

const WAVE_HEIGHTS: Record<SceneMood, { back: string; mid: string; fore: string }> = {
  dawn: { back: "60%", mid: "42%", fore: "26%" },
  dusk: { back: "60%", mid: "38%", fore: "20%" },
  overcast: { back: "66%", mid: "44%", fore: "24%" },
  noon: { back: "56%", mid: "36%", fore: "18%" },
};

const SUN_DEFAULT: Record<SceneMood, { top: string; left: string; size: number }> = {
  dawn: { top: "6%", left: "62%", size: 200 },
  dusk: { top: "13%", left: "57%", size: 130 },
  overcast: { top: "9%", left: "30%", size: 120 },
  noon: { top: "8%", left: "50%", size: 110 },
};

function Landmark({ type }: { type: SceneLandmark }) {
  switch (type) {
    case "pier":
      return (
        <svg
          className="landmark"
          viewBox="0 0 60 60"
          style={{ width: "16%", bottom: "26%", left: "14%" }}
        >
          <path
            d="M6,50 L54,50 M14,50 L14,18 L46,18 L46,50 M10,24 L50,24"
            stroke="var(--paper)"
            strokeWidth="3"
            fill="none"
          />
        </svg>
      );
    case "bridge":
      return (
        <svg
          className="landmark"
          viewBox="0 0 160 60"
          style={{ width: "40%", bottom: "30%", left: "18%" }}
        >
          <path d="M4,50 C4,10 156,10 156,50" stroke="var(--paper)" strokeWidth="3" fill="none" />
          <line x1="4" y1="50" x2="4" y2="30" stroke="var(--paper)" strokeWidth="3" />
          <line x1="156" y1="50" x2="156" y2="30" stroke="var(--paper)" strokeWidth="3" />
        </svg>
      );
    case "church":
      return (
        <svg
          className="landmark"
          viewBox="0 0 40 60"
          style={{ width: "12%", bottom: "32%", left: "18%" }}
        >
          <path
            d="M20,4 L20,52 M8,52 L32,52 M20,14 L28,22"
            stroke="var(--paper)"
            strokeWidth="3"
            fill="none"
          />
        </svg>
      );
    default:
      return null;
  }
}

export interface SceneProps {
  mood?: SceneMood;
  landmark?: SceneLandmark;
  showBoat?: boolean;
  /** fills the parent (position:absolute inset:0) — for hero / subhero bands */
  fill?: boolean;
  /** css aspect-ratio, ignored when fill is true */
  aspect?: string;
  sunPosition?: { top: string; left: string; size: number };
  className?: string;
  /** public/ path to a real photo (e.g. "/images/hero-uchibo-dawn.jpg"). When the
   * file exists it replaces the illustrated SVG scene entirely; until then this
   * prop is a no-op and the illustration keeps rendering. */
  photo?: string;
  /** 0–1 darkening applied over the photo, for text legibility when copy is
   * overlaid on top (hero / subhero). Ignored in illustration mode, where the
   * hand-tuned vignette already handles contrast. Defaults to 0.35. */
  photoOverlay?: number;
}

export default function Scene({
  mood = "dawn",
  landmark = "none",
  showBoat = false,
  fill = false,
  aspect,
  sunPosition,
  className = "",
  photo,
  photoOverlay,
}: SceneProps) {
  const waves = WAVES[mood];
  const heights = WAVE_HEIGHTS[mood];
  const sun = sunPosition ?? SUN_DEFAULT[mood];
  const moodClass = mood === "dawn" ? "" : ` scene--${mood}`;
  const wrapperClassName = `scene${moodClass}${className ? ` ${className}` : ""}`;
  const wrapperStyle = fill ? undefined : { aspectRatio: aspect ?? "4 / 3" };

  if (photo && publicImageExists(photo)) {
    return (
      <div className={wrapperClassName} style={wrapperStyle} aria-hidden="true">
        <Image
          src={photo}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: "cover" }}
        />
        <div className="photo-overlay" style={{ opacity: photoOverlay ?? 0.35 }} />
        <div className="grain" />
        <div className="vignette" />
      </div>
    );
  }

  return (
    <div className={wrapperClassName} style={wrapperStyle} aria-hidden="true">
      <div className="sky" />
      <div
        className="sun"
        style={{ width: sun.size, height: sun.size, top: sun.top, left: sun.left }}
      />
      <Landmark type={landmark} />
      <svg
        className="layer back"
        viewBox="0 0 1440 420"
        preserveAspectRatio="none"
        style={{ bottom: 0, height: heights.back }}
      >
        <path d={waves.back} />
      </svg>
      {showBoat && (
        <svg className="boat" viewBox="0 0 100 60" style={{ left: "20%", bottom: "24%", width: "12%" }}>
          <path d="M8,42 L92,42 L78,54 L22,54 Z" fill="var(--paper)" />
          <line x1="50" y1="42" x2="50" y2="12" stroke="var(--paper)" strokeWidth="2" />
          <path d="M50,14 L74,36 L50,36 Z" fill="var(--paper)" />
        </svg>
      )}
      <svg
        className="layer mid"
        viewBox="0 0 1440 420"
        preserveAspectRatio="none"
        style={{ bottom: 0, height: heights.mid }}
      >
        <path d={waves.mid} />
      </svg>
      <svg
        className="layer fore"
        viewBox="0 0 1440 420"
        preserveAspectRatio="none"
        style={{ bottom: 0, height: heights.fore }}
      >
        <path d={waves.fore} />
      </svg>
      <div className="grain" />
      <div className="vignette" />
    </div>
  );
}
