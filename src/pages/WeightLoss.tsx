import { useState, useCallback } from "react";
import { AppLayout } from "@/components/AppLayout";
import { GoalCalculator } from "@/components/GoalCalculator";
import { WeightRoadmap } from "@/components/WeightRoadmap";
import { ProgressRing } from "@/components/ProgressRing";
import { TrendingDown, Lightbulb } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface CalculatorResults {
  totalToLose: number;
  monthlyTarget: number;
  dailyDeficit: number;
  isAggressive: boolean;
}

const WeightLoss = () => {
  const [results, setResults] = useState<CalculatorResults | null>(null);
  const [months, setMonths] = useState<number>(0);
  const [currentWeight, setCurrentWeight] = useState<number>(0);
  const [goalWeight, setGoalWeight] = useState<number>(0);

  const handleResultsChange = useCallback((newResults: CalculatorResults | null, newMonths: number) => {
    setResults(newResults);
    setMonths(newMonths);
    if (newResults) {
      // Get the input values from the DOM
      const currentWeightInput = document.getElementById('currentWeight') as HTMLInputElement | null;
      const goalWeightInput = document.getElementById('goalWeight') as HTMLInputElement | null;
      if (currentWeightInput && goalWeightInput) {
        setCurrentWeight(parseFloat(currentWeightInput.value) || 0);
        setGoalWeight(parseFloat(goalWeightInput.value) || 0);
      }
    }
  }, []);

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl gradient-primary">
            <TrendingDown className="h-8 w-8 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              Weight Loss Journey
            </h1>
            <p className="text-muted-foreground mt-1">
              Plan your transformation with personalized goals and milestones
            </p>
          </div>
        </div>

        {/* Tip Card */}
        <Card className="rounded-3xl border-secondary/30 bg-secondary/5">
          <CardContent className="p-4 flex items-start gap-3">
            <Lightbulb className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              <strong className="text-secondary">Pro Tip:</strong> Sustainable weight loss is typically 0.5-1kg per week. 
              Crash diets often lead to regaining weight. Focus on building habits you can maintain long-term!
            </p>
          </CardContent>
        </Card>

        {/* Goal Calculator */}
        <GoalCalculator onResultsChange={handleResultsChange} />

        {/* Progress Ring - only show when results are available */}
        {results && (
          <ProgressRing 
            currentWeight={currentWeight}
            goalWeight={goalWeight}
            totalToLose={results.totalToLose}
          />
        )}

        {/* Dynamic Roadmap */}
        <WeightRoadmap months={months} hasResults={!!results} />
      </div>
    </AppLayout>
  );
};

export default WeightLoss;
