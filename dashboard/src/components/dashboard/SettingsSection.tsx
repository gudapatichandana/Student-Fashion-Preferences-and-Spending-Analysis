import { Settings, Filter, ShieldCheck, Database } from "lucide-react";

interface SettingsSectionProps {
  onFilterChange?: (filter: string) => void;
}

const SettingsSection = ({ onFilterChange }: SettingsSectionProps) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="dashboard-card shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Filter size={18} />
            </div>
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Data Filtering</h3>
          </div>
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-accent/30 border border-transparent hover:border-primary/20 transition-all cursor-pointer group">
              <p className="text-xs font-bold text-foreground uppercase tracking-widest group-hover:text-primary transition-colors">Gender Filter</p>
              <p className="text-[11px] text-muted-foreground mt-1.5 font-medium leading-relaxed">Show data only for Female or Male respondents across all charts.</p>
            </div>
            <div className="p-4 rounded-xl bg-accent/30 border border-transparent hover:border-primary/20 transition-all cursor-pointer group">
              <p className="text-xs font-bold text-foreground uppercase tracking-widest group-hover:text-primary transition-colors">Shopping Method</p>
              <p className="text-[11px] text-muted-foreground mt-1.5 font-medium leading-relaxed">Filter analysis based on 'Online', 'Offline', or 'Both'.</p>
            </div>
          </div>
        </div>

        <div className="dashboard-card shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <ShieldCheck size={18} />
            </div>
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">System Preferences</h3>
          </div>
          <div className="space-y-6 px-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-foreground uppercase tracking-widest">Real-time Analytics</p>
                <p className="text-[11px] text-muted-foreground mt-1 font-medium">Simulate live data ingestion.</p>
              </div>
              <div className="w-10 h-5 rounded-full bg-primary/10 border border-primary/20 relative flex items-center px-1">
                <div className="w-3 h-3 rounded-full bg-primary ml-auto shadow-sm" />
              </div>
            </div>
            <div className="flex items-center justify-between opacity-50">
              <div>
                <p className="text-xs font-bold text-foreground uppercase tracking-widest">Advanced ML Tuning</p>
                <p className="text-[11px] text-muted-foreground mt-1 font-medium">Auto-optimize hyperparameters.</p>
              </div>
              <div className="w-10 h-5 rounded-full bg-muted border border-border relative flex items-center px-1">
                <div className="w-3 h-3 rounded-full bg-muted-foreground/30" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-card border-dashed border-primary/30 bg-primary/5">
        <div className="flex items-center gap-3 mb-4 text-primary">
          <Database size={18} />
          <h3 className="text-sm font-bold uppercase tracking-wider">Data Source</h3>
        </div>
        <p className="text-xs text-muted-foreground mb-6 font-medium leading-relaxed">
          Currently analyzing <span className="text-foreground font-bold italic">5,006</span> response records from static CSV storage. 
          Dynamic SQL integration is locked in this environment.
        </p>
        <button className="px-5 py-2 rounded-lg bg-primary text-primary-foreground text-[11px] font-bold uppercase tracking-widest hover:opacity-90 transition-opacity transform active:scale-95">
          Re-initialize Pipeline
        </button>
      </div>
    </div>
  );
};

export default SettingsSection;
