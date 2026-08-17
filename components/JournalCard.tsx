import Link from "next/link";
import Scene from "./Scene";
import type { JournalEntry } from "@/lib/content";

export default function JournalCard({ entry }: { entry: JournalEntry }) {
  return (
    <Link className="j-card" href={`/journal#${entry.slug}`}>
      <Scene mood={entry.mood} aspect="5 / 4" />
      <p className="j-date">{entry.date}</p>
      <h3>{entry.title}</h3>
      <p className="j-loc">{entry.location}</p>
    </Link>
  );
}
