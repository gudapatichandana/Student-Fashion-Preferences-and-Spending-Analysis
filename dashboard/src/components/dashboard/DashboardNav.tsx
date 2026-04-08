const sections = [
  { id: "overview", label: "Overview" },
  { id: "demographics", label: "Demographics" },
  { id: "preferences", label: "Preferences" },
  { id: "spending", label: "Spending" },
  { id: "behavior", label: "Behavior" },
  { id: "ml", label: "ML Models" },
  { id: "insights", label: "Insights" },
];

const DashboardNav = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border py-3">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <span className="text-primary font-bold text-sm">SF</span>
          </div>
          <span className="font-bold text-foreground text-base hidden sm:block">Student Fashion Dashboard</span>
        </div>
        <div className="flex items-center gap-1 overflow-x-auto">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className="text-sm px-4 py-2 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all whitespace-nowrap font-medium"
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default DashboardNav;
