import Link from "next/link";
import Scene from "./Scene";
import { getImageBrightness, type Location } from "@/lib/content";

export default function LocationCard({ location }: { location: Location }) {
  const photo = `/images/location-${location.id}.jpg`;
  return (
    <article className="loc-card">
      <Scene
        mood={location.mood}
        landmark={location.landmark}
        showBoat={location.showBoat}
        sunPosition={location.sunPosition}
        aspect="4 / 3"
        photo={photo}
        brightness={getImageBrightness(`location-${location.id}.jpg`)}
      />
      <div className="loc-card-body">
        <span className="region">{location.region}</span>
        <h3>{location.name}</h3>
        <p>{location.description}</p>
        <div className="tags">
          {location.tags.map((tag) => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
        <Link href={`/locations#${location.id}`} className="more">
          拠点の詳細 <span className="arrow">→</span>
        </Link>
      </div>
    </article>
  );
}
