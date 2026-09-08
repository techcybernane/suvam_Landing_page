import { ArrowRight } from "lucide-react";

export default function FlowSteps({ steps }) {
  if (!steps?.length) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {steps.map((step, i) => (
        <span key={i} className="flex items-center gap-2">
          <span className="rounded-pill bg-forest px-4 py-2 text-xs font-bold uppercase tracking-wide text-lime-glow">
            {step}
          </span>
          {i < steps.length - 1 && <ArrowRight className="h-4 w-4 shrink-0 text-ink-soft" />}
        </span>
      ))}
    </div>
  );
}
