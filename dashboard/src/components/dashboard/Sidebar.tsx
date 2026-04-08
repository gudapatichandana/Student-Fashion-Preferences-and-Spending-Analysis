import { 
  LayoutDashboard, 
  Users, 
  Heart, 
  BadgeDollarSign, 
  Zap, 
  BrainCircuit, 
  Lightbulb,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export type ViewId = "overview" | "demographics" | "preferences" | "spending" | "behavior" | "ml" | "insights" | "settings";

interface SidebarProps {
  activeView: ViewId;
  onViewChange: (view: ViewId) => void;
  collapsed: boolean;
  onToggle: () => void;
  theme?: "dark" | "light";
  onThemeToggle?: () => void;
}

const navItems: { id: ViewId; label: string; icon: any }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "demographics", label: "Demographics", icon: Users },
  { id: "preferences", label: "Preferences", icon: Heart },
  { id: "spending", label: "Spending", icon: BadgeDollarSign },
  { id: "behavior", label: "Behavior", icon: Zap },
  { id: "ml", label: "ML Models", icon: BrainCircuit },
  { id: "insights", label: "Insights", icon: Lightbulb },
];

const Sidebar = ({ activeView, onViewChange, collapsed, onToggle }: SidebarProps) => {
  return (
    <aside className={`sidebar transition-all duration-300 ${collapsed ? "w-20" : "w-64"}`}>
      <div className={`p-6 flex items-center ${collapsed ? "justify-center" : "gap-3"} mb-4 relative`}>
        <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center shrink-0 shadow-sm">
          <span className="text-primary-foreground font-bold text-lg">SF</span>
        </div>
        {!collapsed && (
          <div className="flex flex-col animate-in fade-in duration-500">
            <span className="font-bold text-sm leading-none">Student Fashion</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Analytics</span>
          </div>
        )}
        
        <button 
          onClick={onToggle}
          className="absolute -right-3 top-8 w-6 h-6 rounded-full bg-white border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors shadow-sm"
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      <nav className="flex-1 px-3 space-y-1 overflow-hidden">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={() => onViewChange(item.id)}
              title={collapsed ? item.label : ""}
              className={`nav-item ${activeView === item.id ? "active" : ""} ${collapsed ? "justify-center px-0" : ""}`}
            >
              <Icon size={18} strokeWidth={2} className="shrink-0" />
              {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
