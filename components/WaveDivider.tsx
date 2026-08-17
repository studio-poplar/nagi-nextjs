interface WaveDividerProps {
  fill?: string;
  height?: number;
}

export default function WaveDivider({ fill = "var(--ink)", height = 60 }: WaveDividerProps) {
  return (
    <div className="wave-divider" aria-hidden="true">
      <svg viewBox={`0 0 1440 ${height}`} preserveAspectRatio="none">
        <path
          d={`M0,${height / 2} C240,0 480,${height} 720,${height / 2} C960,0 1200,${height} 1440,${height / 2} L1440,${height} L0,${height} Z`}
          fill={fill}
        />
      </svg>
    </div>
  );
}
