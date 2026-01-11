import { AppLayout } from "@/components/AppLayout";
import { CommunityChart } from "@/components/CommunityChart";
import { DashboardCoachHub } from "@/components/DashboardCoachHub";

const Index = () => {
  return (
    <AppLayout>
      <div className="p-6 md:p-8 lg:p-12">
        <div className="max-w-6xl mx-auto space-y-10">
          {/* Hero Section */}
          <div className="text-center mb-10 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Your Personal
              <span className="block gradient-primary bg-clip-text text-transparent">
                Fitness Coach Hub
              </span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Select your training goal, enter your stats, and get a fully personalized 
              workout and nutrition plan tailored just for you.
            </p>
          </div>

          {/* Dashboard Coach Hub */}
          <div className="animate-fade-in" style={{ animationDelay: "100ms" }}>
            <DashboardCoachHub />
          </div>

          {/* Community Progress Chart */}
          <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
            <CommunityChart />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-border/50 text-center text-sm text-muted-foreground">
          <p>FitExpert provides general fitness guidance. Consult a healthcare professional before starting any new exercise or diet program.</p>
        </footer>
      </div>
    </AppLayout>
  );
};

export default Index;
