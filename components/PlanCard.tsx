import Button from "./Button";
import type { Plan } from "@/lib/content";

interface PlanCardProps {
  plan: Plan;
  /** show the extended feature list + CTA button (pricing page) vs the short preview (top page) */
  detailed?: boolean;
}

export default function PlanCard({ plan, detailed = false }: PlanCardProps) {
  const features = detailed ? plan.featuresDetail : plan.features;

  return (
    <div className={`plan-card${plan.featured ? " featured" : ""}`}>
      <p className="p-name">{plan.name}</p>
      <p className="p-kana">{plan.kana}</p>
      <p className="p-price">
        {plan.price}
        <span> /月</span>
      </p>
      <p className="p-desc">{plan.desc}</p>
      <ul>
        {features.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
      {detailed && (
        <Button href="/apply" variant={plan.featured ? "on-dark" : "outline"}>
          このプランで申し込む
        </Button>
      )}
    </div>
  );
}
