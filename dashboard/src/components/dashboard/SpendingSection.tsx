import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Cell, PieChart, Pie } from "recharts";
import { spendingDistribution, priceRangeData, purchaseFrequencyData, discountImportanceData } from "@/data/dashboardData";
import SectionHeader from "./SectionHeader";

const COLORS = ["#3b82f6", "#8b5cf6", "#f59e0b", "#ef4444", "#10b981"];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background/95 backdrop-blur-sm border rounded-lg px-3 py-2 shadow-xl border-border/50">
        <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-0.5">{payload[0].payload.name || payload[0].payload.range}</p>
        <p className="text-sm font-bold text-foreground">{payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

const SpendingSection = () => (
  <div className="space-y-8 animate-in fade-in duration-700">
    <SectionHeader title="Spending & Purchase Behavior" subtitle="Annual spending patterns and price sensitivity" id="spending" />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Spending Distribution */}
      <div className="dashboard-card">
        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-8">Annual Spending (₹)</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={spendingDistribution}>
            <CartesianGrid strokeDasharray="4 4" horizontal vertical={false} stroke="currentColor" className="opacity-20" />
            <XAxis dataKey="range" tick={{ fontSize: 12, fontWeight: 600, fill: "currentColor" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fontWeight: 600, fill: "currentColor" }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'currentColor', opacity: 0.05 }} />
            <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={36}>
              {spendingDistribution.map((_, i) => {
                // Modified opacity logic to avoid "black" bars in light mode
                const opacity = Math.max(0.4, 1 - (i * 0.1));
                return <Cell key={i} fill={`#3b82f6`} fillOpacity={opacity} />;
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Price Range */}
      <div className="dashboard-card">
        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-8">Price Range Per Item</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={priceRangeData}>
            <CartesianGrid strokeDasharray="4 4" horizontal vertical={false} stroke="currentColor" className="opacity-20" />
            <XAxis dataKey="name" tick={{ fontSize: 12, fontWeight: 600, fill: "currentColor" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fontWeight: 600, fill: "currentColor" }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'currentColor', opacity: 0.05 }} />
            <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={36}>
              {priceRangeData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Purchase Frequency */}
      <div className="dashboard-card">
        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-8">Purchase Frequency</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={purchaseFrequencyData} layout="vertical" margin={{ left: 10, right: 30 }}>
            <CartesianGrid strokeDasharray="4 4" vertical={true} horizontal={false} stroke="currentColor" className="opacity-20" />
            <XAxis type="number" tick={{ fontSize: 10, fontWeight: 500, fill: "currentColor" }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fontWeight: 600, fill: "currentColor" }} width={140} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'currentColor', opacity: 0.05 }} />
            <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={20}>
              {purchaseFrequencyData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Discount Importance */}
      <div className="dashboard-card">
        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-8">Discount Importance</h3>
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie data={discountImportanceData} cx="50%" cy="50%" innerRadius={70} outerRadius={90} dataKey="value" stroke="none" paddingAngle={5}>
              {discountImportanceData.map((entry, i) => (
                <Cell key={i} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap justify-center gap-6 mt-6">
          {discountImportanceData.map((entry, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: entry.fill }} />
              <span className="text-xs font-semibold text-muted-foreground">{entry.name}: <span className="text-foreground font-bold">{entry.value}</span></span>
            </div>
          ))}
        </div>
        <div className="mt-8 p-4 rounded-xl bg-primary/5 border border-primary/10 text-center">
            <p className="text-sm text-muted-foreground font-medium italic leading-relaxed">
              <span className="text-primary font-bold not-italic">84%</span> of students consider discounts <span className="text-foreground font-bold">important</span> or <span className="text-foreground font-bold">sometimes important</span>.
            </p>
        </div>
      </div>
    </div>
  </div>
);

export default SpendingSection;
