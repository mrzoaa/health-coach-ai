import { useState } from "react";
import { InputForm } from "@/components/InputForm";
import { ResultsDashboard } from "@/components/ResultsDashboard";
import { UserInput, ExpertResult, analyzeUser } from "@/lib/expertSystem";
import { AppLayout } from "@/components/AppLayout";
import { CommunityChart } from "@/components/CommunityChart";
import { WorkoutCards } from "@/components/WorkoutCards";

const Index = () => {
  const [result, setResult] = useState<ExpertResult | null>(null);

  const handleSubmit = (data: UserInput) => {
    const analysisResult = analyzeUser(data);
    setResult(analysisResult);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <AppLayout>
      <div className="p-6 md:p-8 lg:p-12">
        {!result ? (
          <div className="max-w-5xl mx-auto space-y-10">
            {/* Hero Section */}
            <div className="text-center mb-10 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Get Your Personalized
                <span className="block gradient-primary bg-clip-text text-transparent">
                  Fitness & Diet Plan
                </span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Answer a few questions about your body and goals, and our expert system 
                will create a customized workout and nutrition plan just for you.
              </p>
            </div>

            {/* Community Progress Chart */}
            <div className="animate-fade-in" style={{ animationDelay: "100ms" }}>
              <CommunityChart />
            </div>

            {/* Training Routines */}
            <div className="space-y-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
              <div className="text-center">
                <h3 className="text-2xl font-display font-bold mb-2">Featured Training Routines</h3>
                <p className="text-muted-foreground">Get started with these proven workout programs</p>
              </div>
              <WorkoutCards />
            </div>

            {/* Input Form */}
            <div className="animate-fade-in" style={{ animationDelay: "300ms" }}>
              <InputForm onSubmit={handleSubmit} />
            </div>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto">
            <ResultsDashboard result={result} onReset={handleReset} />
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-border/50 text-center text-sm text-muted-foreground">
          <p>FitExpert provides general fitness guidance. Consult a healthcare professional before starting any new exercise or diet program.</p>
        </footer>
      </div>
    </AppLayout>
  );
};

export default Index;
