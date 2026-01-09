import { useState } from "react";
import { InputForm } from "@/components/InputForm";
import { ResultsDashboard } from "@/components/ResultsDashboard";
import { UserInput, ExpertResult, analyzeUser } from "@/lib/expertSystem";
import { Activity } from "lucide-react";

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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl gradient-primary">
              <Activity className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-display font-bold">FitExpert</h1>
              <p className="text-xs text-muted-foreground">AI-Powered Fitness Advisor</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12">
        {!result ? (
          <div className="max-w-4xl mx-auto">
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

            {/* Input Form */}
            <InputForm onSubmit={handleSubmit} />
          </div>
        ) : (
          <div className="max-w-5xl mx-auto">
            <ResultsDashboard result={result} onReset={handleReset} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-auto">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>FitExpert provides general fitness guidance. Consult a healthcare professional before starting any new exercise or diet program.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
