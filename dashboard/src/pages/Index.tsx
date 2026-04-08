import { useState } from "react";
import StatCard from "@/components/dashboard/StatCard";
import Sidebar, { ViewId } from "@/components/dashboard/Sidebar";
import DemographicsSection from "@/components/dashboard/DemographicsSection";
import PreferencesSection from "@/components/dashboard/PreferencesSection";
import SpendingSection from "@/components/dashboard/SpendingSection";
import BehaviorSection from "@/components/dashboard/BehaviorSection";
import MLSection from "@/components/dashboard/MLSection";
import InsightsSection from "@/components/dashboard/InsightsSection";
import { Sparkles, Target, Zap } from "lucide-react";

const Index = () => {
  const [activeView, setActiveView] = useState<ViewId>("overview");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const renderContent = () => {
    switch (activeView) {
      case "overview":
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-12 pb-20">
            {/* Professional Narrative Hero */}
            <div className="p-12 md:p-20 bg-primary/5 border border-primary/10 rounded-[2rem] relative overflow-hidden text-center">
                <div className="max-w-4xl mx-auto relative z-10">
                    <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-foreground whitespace-nowrap">Student Fashion Analytics</h1>
                    <p className="text-xl text-muted-foreground font-medium leading-relaxed mb-10">
                        Business Intelligence Dashboard — Analyzing 5,006 survey responses with advanced ML classification models.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <button onClick={() => setActiveView("insights")} className="px-8 py-3 bg-primary text-primary-foreground rounded-xl font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-all">Explore Findings</button>
                    </div>
                </div>
            </div>

            {/* About Section */}
            <div className="w-full text-center py-4">
                <p className="text-xl font-bold text-foreground leading-relaxed max-w-4xl mx-auto">
                    This project explores the intersection of student demographics, academic backgrounds, and fashion consumer behavior. 
                    By leveraging PCA for dimensionality reduction and K-Means Clustering for segmentation, we identify distinct shopper profiles 
                    ranging from budget-conscious learners to premium trend followers.
                </p>
            </div>

            {/* Original KPI Cluster Content */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 border-t pt-12">
              <StatCard title="Total Responses" value="5,006" subtitle="Student survey data" large />
              <StatCard title="Gender Split" value="65/35" subtitle="Female vs Male" large />
              <StatCard title="Top Method" value="Both" subtitle="Hybrid shopping trend" large />
              <StatCard title="Major Spend" value="15K-30K" subtitle="Massive segment (79%)" large />
              <StatCard title="Best Model" value="86.5%" subtitle="SVM (Linear)" large />
            </div>
          </div>
        );
      case "demographics":
        return <DemographicsSection />;
      case "preferences":
        return <PreferencesSection />;
      case "spending":
        return <SpendingSection />;
      case "behavior":
        return <BehaviorSection />;
      case "ml":
        return <MLSection />;
      case "insights":
        return <InsightsSection />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-[hsl(0,0%,99%)] text-[hsl(222,47%,12%)]">
      <Sidebar 
        activeView={activeView} 
        onViewChange={setActiveView} 
        collapsed={isCollapsed}
        onToggle={() => setIsCollapsed(!isCollapsed)}
        theme="light"
        onThemeToggle={() => {}}
      />

      <main className={`flex-1 overflow-y-auto bg-[hsl(220,14%,97%)] ${isCollapsed ? "ml-20" : "ml-64"}`}>
        <header className="p-6 lg:px-10 pb-0 flex items-center bg-white border-b border-[hsl(220,13%,91%)] sticky top-0 z-30">
            <h2 className="text-xl font-bold tracking-tight text-[hsl(222,47%,12%)] capitalize">{activeView === "ml" ? "Machine Learning" : activeView}</h2>
        </header>
        <div className="p-8 lg:p-10 max-w-[1400px] mx-auto">
            {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Index;
