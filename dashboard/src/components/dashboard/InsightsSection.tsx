import { businessInsights } from "@/data/dashboardData";
import SectionHeader from "./SectionHeader";

// Color palette cycling - using the orange/indigo theme
const CARD_ACCENTS = [
  { bg: "bg-orange-50", border: "border-orange-300", metric: "text-orange-500", label: "text-orange-400", bar: "bg-orange-400" },
  { bg: "bg-indigo-50", border: "border-indigo-300", metric: "text-indigo-600", label: "text-indigo-400", bar: "bg-indigo-400" },
  { bg: "bg-emerald-50", border: "border-emerald-300", metric: "text-emerald-600", label: "text-emerald-400", bar: "bg-emerald-400" },
  { bg: "bg-rose-50", border: "border-rose-300", metric: "text-rose-600", label: "text-rose-400", bar: "bg-rose-400" },
  { bg: "bg-amber-50", border: "border-amber-300", metric: "text-amber-600", label: "text-amber-400", bar: "bg-amber-400" },
  { bg: "bg-sky-50", border: "border-sky-300", metric: "text-sky-600", label: "text-sky-400", bar: "bg-sky-400" },
];

const InsightsSection = () => (
  <div className="space-y-8 animate-in fade-in duration-700">
    <SectionHeader title="Business Intelligence" subtitle="Key findings and recommendations derived from analysis" id="insights" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {businessInsights.map((insight, i) => {
        const accent = CARD_ACCENTS[i % CARD_ACCENTS.length];
        return (
          <div
            key={i}
            className={`rounded-2xl border-2 ${accent.border} ${accent.bg} p-7 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-4`}
          >
            {/* Colored top bar */}
            <div className={`w-10 h-1.5 rounded-full ${accent.bar}`} />

            {/* Title */}
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{insight.title}</h3>

            {/* Metric */}
            <div className="flex items-baseline gap-2">
              <span className={`text-5xl font-extrabold tracking-tighter ${accent.metric}`}>{insight.metric}</span>
              <span className={`text-xs font-bold uppercase tracking-widest ${accent.label}`}>{insight.metricLabel}</span>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed font-medium flex-1">{insight.description}</p>
          </div>
        );
      })}
    </div>
  </div>
);

export default InsightsSection;
