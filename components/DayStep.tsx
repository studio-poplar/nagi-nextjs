import type { DayStep as DayStepData } from "@/lib/content";

export default function DayStep({ step }: { step: DayStepData }) {
  return (
    <div className="day-step">
      <time>{step.time}</time>
      <h4>{step.title}</h4>
      <p>{step.description}</p>
    </div>
  );
}
