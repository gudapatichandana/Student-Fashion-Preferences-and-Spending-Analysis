import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  large?: boolean;
  trend?: {
    value: string;
    isUp: boolean;
  };
}

const StatCard = ({ title, value, subtitle, trend, large }: StatCardProps) => (
  <div className={`stat-card ${large ? "py-10 px-6 min-h-[180px]" : "p-6"}`}>
    <div className="flex flex-col h-full justify-between">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
            <span className={`font-bold text-muted-foreground/70 tracking-widest uppercase ${large ? "text-[11px]" : "text-[10px]"}`}>{title}</span>
            {trend && (
                <div className={`flex items-center gap-0.5 text-[10px] font-bold ${trend.isUp ? "text-emerald-500" : "text-rose-500"}`}>
                    {trend.isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    {trend.value}
                </div>
            )}
        </div>
        <div className={`font-bold tracking-tight text-primary leading-none ${large ? "text-5xl" : "text-3xl"}`}>{value}</div>
      </div>
      
      {subtitle && (
        <div className="mt-6 pt-3 border-t border-border/50">
            <span className={`font-medium text-muted-foreground ${large ? "text-sm" : "text-[11px]"}`}>
                {subtitle}
            </span>
        </div>
      )}
    </div>
  </div>
);

export default StatCard;
