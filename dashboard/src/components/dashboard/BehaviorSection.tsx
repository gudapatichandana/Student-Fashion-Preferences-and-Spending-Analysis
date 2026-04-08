import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Cell } from "recharts";
import { confidenceData, regretReasonsData, opinionSourceData, brandTrustData, brandLoyaltyData } from "@/data/dashboardData";
import SectionHeader from "./SectionHeader";

const COLORS = ["#3b82f6", "#8b5cf6", "#f59e0b", "#ef4444", "#10b981"];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background/95 backdrop-blur-sm border rounded-lg px-3 py-2 shadow-xl border-border/50">
        <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-0.5">{payload[0].payload.name}</p>
        <p className="text-sm font-bold text-foreground">{payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

const BehaviorSection = () => (
  <div className="space-y-8 animate-in fade-in duration-700">
    <SectionHeader title="Consumer Psychology & Trust" subtitle="Confidence, regret, and brand trust factors" id="behavior" />
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Confidence */}
      <div className="dashboard-card">
        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-8">Shopping Confidence</h3>
        <div className="space-y-6 mt-4">
          {confidenceData.map((item, i) => {
            const pct = (item.value / 5006) * 100;
            return (
              <div key={i}>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-muted-foreground">{item.name}</span>
                  <span className="text-foreground">{pct.toFixed(0)}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-accent/50 overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-1000 shadow-sm" style={{ width: `${pct}%`, background: COLORS[i % COLORS.length] }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Regret Reasons */}
      <div className="dashboard-card">
        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-8">Regret Drivers</h3>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={regretReasonsData} layout="vertical" margin={{ left: 10, right: 30 }}>
            <CartesianGrid strokeDasharray="4 4" vertical={true} horizontal={false} stroke="currentColor" className="opacity-20" />
            <XAxis type="number" tick={{ fontSize: 10, fontWeight: 500, fill: "currentColor" }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fontWeight: 600, fill: "currentColor" }} width={140} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'currentColor', opacity: 0.05 }} />
            <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={18}>
              {regretReasonsData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Opinion Source */}
      <div className="dashboard-card">
        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-8">Influence Sources</h3>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={opinionSourceData} layout="vertical" margin={{ left: 10, right: 30 }}>
            <CartesianGrid strokeDasharray="4 4" vertical={true} horizontal={false} stroke="currentColor" className="opacity-20" />
            <XAxis type="number" tick={{ fontSize: 10, fontWeight: 500, fill: "currentColor" }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fontWeight: 600, fill: "currentColor" }} width={140} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'currentColor', opacity: 0.05 }} />
            <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={18}>
              {opinionSourceData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Brand Trust */}
      <div className="dashboard-card">
        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-8">Trust Factors</h3>
        <div className="space-y-6 mt-4">
          {brandTrustData.map((item, i) => {
            const pct = (item.value / 5006) * 100;
            return (
              <div key={i}>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-muted-foreground">{item.name}</span>
                  <span className="text-foreground">{item.value.toLocaleString()}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-accent/50 overflow-hidden">
                  <div className="h-full rounded-full shadow-sm" style={{ width: `${pct}%`, background: COLORS[i % COLORS.length] }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Brand Loyalty */}
      <div className="dashboard-card lg:col-span-2">
        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-8">Loyalty Drivers</h3>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={brandLoyaltyData} margin={{ bottom: 10 }}>
            <CartesianGrid strokeDasharray="4 4" horizontal vertical={false} stroke="currentColor" className="opacity-20" />
            <XAxis dataKey="name" tick={{ fontSize: 12, fontWeight: 600, fill: "currentColor" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fontWeight: 600, fill: "currentColor" }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'currentColor', opacity: 0.05 }} />
            <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={36}>
              {brandLoyaltyData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);

export default BehaviorSection;
