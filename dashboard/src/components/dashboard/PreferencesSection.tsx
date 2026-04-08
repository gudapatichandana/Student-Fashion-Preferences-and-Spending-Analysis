import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Cell, PieChart, Pie } from "recharts";
import { clothingPreferenceData, collegeWearData, shoppingMethodData, shoppingReasonData } from "@/data/dashboardData";
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

const PreferencesSection = () => (
  <div className="space-y-8 animate-in fade-in duration-700">
    <SectionHeader title="Fashion & Shopping Preferences" subtitle="What students wear, how they shop, and why" id="preferences" />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Clothing Preference */}
      <div className="dashboard-card">
        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-8">Preferred Clothing Type</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={clothingPreferenceData} margin={{ bottom: 10 }}>
            <CartesianGrid strokeDasharray="4 4" horizontal vertical={false} stroke="currentColor" className="opacity-20" />
            <XAxis dataKey="name" tick={{ fontSize: 12, fontWeight: 600, fill: "currentColor" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fontWeight: 600, fill: "currentColor" }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'currentColor', opacity: 0.05 }} />
            <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={36}>
              {clothingPreferenceData.map((entry, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Shopping Method */}
      <div className="dashboard-card">
        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-8">Shopping Method</h3>
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie data={shoppingMethodData} cx="50%" cy="50%" innerRadius={70} outerRadius={90} dataKey="value" stroke="none" paddingAngle={5}>
              {shoppingMethodData.map((entry, i) => (
                <Cell key={i} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap justify-center gap-6 mt-6">
          {shoppingMethodData.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: s.fill }} />
              <span className="text-xs font-semibold text-muted-foreground">{s.name}: <span className="text-foreground font-bold">{s.value}</span></span>
            </div>
          ))}
        </div>
      </div>

      {/* College Wear */}
      <div className="dashboard-card">
        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-8">College Wear Type</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={collegeWearData} layout="vertical" margin={{ left: 10, right: 30 }}>
            <CartesianGrid strokeDasharray="4 4" vertical={true} horizontal={false} stroke="currentColor" className="opacity-20" />
            <XAxis type="number" tick={{ fontSize: 10, fontWeight: 500, fill: "currentColor" }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fontWeight: 600, fill: "currentColor" }} width={140} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'currentColor', opacity: 0.05 }} />
            <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={20}>
              {collegeWearData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Shopping Reasons */}
      <div className="dashboard-card">
        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-8">Shopping Drivers</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={shoppingReasonData} layout="vertical" margin={{ left: 10, right: 30 }}>
            <CartesianGrid strokeDasharray="4 4" vertical={true} horizontal={false} stroke="currentColor" className="opacity-20" />
            <XAxis type="number" tick={{ fontSize: 10, fontWeight: 500, fill: "currentColor" }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fontWeight: 600, fill: "currentColor" }} width={140} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'currentColor', opacity: 0.05 }} />
            <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={20}>
              {shoppingReasonData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);

export default PreferencesSection;
