import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Cell } from "recharts";
import { modelPerformanceData, textMiningKeywords } from "@/data/dashboardData";
import SectionHeader from "./SectionHeader";

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background/95 backdrop-blur-sm border rounded-lg px-3 py-2 shadow-xl border-border/50">
        <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-1">{payload[0].payload.name}</p>
        <div className="space-y-1">
          <p className="text-xs font-medium text-foreground">Accuracy: <span className="font-bold">{payload[0].payload.accuracy}%</span></p>
          <p className="text-xs font-medium text-foreground">F1 Score: <span className="font-bold">{payload[0].payload.f1}%</span></p>
        </div>
      </div>
    );
  }
  return null;
};

const MLSection = () => (
  <div className="space-y-8 animate-in fade-in duration-700">
    <SectionHeader title="Machine Learning Layer" subtitle="Model performance and advanced student segmentation" id="ml" />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Model Performance */}
      <div className="dashboard-card">
        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-8">Model Accuracy Comparison</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={modelPerformanceData} layout="vertical" margin={{ left: 10, right: 30 }}>
            <CartesianGrid strokeDasharray="4 4" vertical={true} horizontal={false} stroke="currentColor" className="opacity-20" />
            <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10, fontWeight: 500, fill: "currentColor" }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fontWeight: 600, fill: "currentColor" }} width={140} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'currentColor', opacity: 0.05 }} />
            <Bar dataKey="accuracy" radius={[0, 6, 6, 0]} barSize={20}>
              {modelPerformanceData.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-8 p-5 rounded-2xl bg-primary/5 border border-primary/10 shadow-sm">
          <p className="text-sm text-muted-foreground leading-relaxed font-medium">
            <span className="text-primary font-bold">SVM (Linear)</span> achieved the best accuracy at <span className="font-extrabold text-foreground">86.51%</span> for predicting shopping method preference.
          </p>
        </div>
      </div>

      {/* Text Mining Keywords */}
      <div className="dashboard-card">
        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-8">TF-IDF Weighted Keywords</h3>
        <div className="flex flex-wrap gap-3 mt-2">
          {textMiningKeywords.map((word, i) => {
            const colors = [
              "bg-blue-500/10 text-blue-500 border-blue-500/20",
              "bg-purple-500/10 text-purple-500 border-purple-500/20",
              "bg-amber-500/10 text-amber-500 border-amber-500/20",
              "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
            ];
            return (
              <span key={word} className={`text-xs ${colors[i % colors.length]} px-4 py-1.5 rounded-lg border font-bold uppercase tracking-wider transition-all hover:bg-current hover:text-white cursor-default`}>
                {word}
              </span>
            );
          })}
        </div>
        <div className="mt-10 p-5 rounded-2xl bg-orange-500/5 border border-orange-500/10 shadow-sm">
          <p className="text-sm text-muted-foreground leading-relaxed font-medium">
            Keywords extracted using <span className="text-orange-500 font-bold">TF-IDF vectorization</span> from open-ended student feedback. Top concerns: <span className="text-foreground font-bold italic">fit, quality, price</span>.
          </p>
        </div>
      </div>

      {/* PCA & Clustering Info */}
      <div className="dashboard-card">
        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-8">Dimensionality Reduction (PCA)</h3>
        <div className="flex flex-col items-center justify-center py-10">
          <div className="relative w-40 h-40 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-[pulse_3s_infinite]" />
            <div className="absolute inset-4 rounded-full border-2 border-primary/40 animate-[pulse_4s_infinite]" />
            <div className="absolute inset-8 rounded-full border-2 border-primary/60" />
            <div className="z-10 flex flex-col items-center">
              <span className="text-4xl font-extrabold tracking-tighter text-primary">2D</span>
              <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Projection</span>
            </div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground text-center leading-relaxed px-6 font-medium">PCA reduced high-dimensional features into 2 principal components, capturing the variance in shopping preferences across Online, Offline, and Both segments.</p>
      </div>

      {/* K-Means Clustering */}
      <div className="dashboard-card border-border/60">
        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-8">Student Segmentation (K-Means)</h3>
        <div className="grid grid-cols-2 gap-4">
          {[
            { id: 0, label: "Budget Shoppers", desc: "Low spending, price-focused", color: "#3b82f6" },
            { id: 1, label: "Moderate Spenders", desc: "Mid-range, quality conscious", color: "#8b5cf6" },
            { id: 2, label: "Premium Buyers", desc: "High spending, brand-loyal", color: "#f59e0b" },
            { id: 3, label: "Trend Followers", desc: "Festival shoppers, variety seekers", color: "#ef4444" },
          ].map((cluster) => (
            <div key={cluster.id} className="p-4 rounded-2xl bg-accent/20 border border-border/30 hover:border-primary/20 transition-all group shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full" style={{ background: cluster.color }} />
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest group-hover:text-primary transition-colors">Cluster {cluster.id}</span>
              </div>
              <p className="text-sm font-extrabold text-foreground mb-1">{cluster.label}</p>
              <p className="text-xs text-muted-foreground leading-tight font-medium">{cluster.desc}</p>
            </div>
          ))}
        </div>
        <p className="text-[11px] font-bold text-muted-foreground text-center mt-8 uppercase tracking-widest opacity-70">4 distinct student segments identified using K-Means clustering in PCA space</p>
      </div>
    </div>
  </div>
);

export default MLSection;
