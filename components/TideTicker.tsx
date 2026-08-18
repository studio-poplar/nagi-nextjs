import type { TideDatum } from "@/lib/content";

export default function TideTicker({ tideData }: { tideData: TideDatum[] }) {
  const items = [...tideData, ...tideData];

  return (
    <div className="tide-ticker" aria-hidden="true">
      <div className="track">
        {items.map((d, i) => (
          <span className="item" key={i}>
            <span className="loc">{d.loc}</span>
            <span className={`status ${d.cls}`}>{d.status}</span>
            <span>{d.time}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
