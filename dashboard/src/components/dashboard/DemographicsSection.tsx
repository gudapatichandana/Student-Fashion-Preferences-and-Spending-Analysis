import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { genderData, studyLevelData } from "@/data/dashboardData";
import SectionHeader from "./SectionHeader";

const COLORS = ["#3b82f6", "#8b5cf6", "#f59e0b", "#ef4444", "#10b981", "#6366f1", "#f43f5e"];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background/95 backdrop-blur-sm border rounded-lg px-3 py-2 shadow-xl border-border/50">
        <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-0.5">{payload[0].name || payload[0].payload.name}</p>
        <p className="text-sm font-bold text-foreground">{payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

const DemographicsSection = () => (
  <div className="space-y-8 animate-in fade-in duration-700">
    <SectionHeader title="Demographics Overview" subtitle="Gender distribution and academic background" id="demographics" />
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Gender */}
      <div className="dashboard-card">
        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-8">Gender Distribution</h3>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie data={genderData} cx="50%" cy="50%" innerRadius={70} outerRadius={90} dataKey="value" stroke="none" paddingAngle={5}>
              {genderData.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap justify-center gap-6 mt-6">
          {genderData.map((g, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: g.color }} />
              <span className="text-xs font-semibold text-muted-foreground">{g.name}: <span className="text-foreground font-bold">{g.value}</span></span>
            </div>
          ))}
        </div>
      </div>

      {/* Study Level */}
      <div className="dashboard-card lg:col-span-2">
        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-8">Level of Study</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={studyLevelData} layout="vertical" margin={{ left: 10, right: 30 }}>
            <CartesianGrid strokeDasharray="4 4" vertical={true} horizontal={false} stroke="currentColor" className="opacity-20" />
            <XAxis type="number" tick={{ fontSize: 10, fontWeight: 500, fill: "currentColor" }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fontWeight: 600, fill: "currentColor" }} width={140} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'currentColor', opacity: 0.05 }} />
            <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={20}>
              {studyLevelData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);

export default DemographicsSection;
