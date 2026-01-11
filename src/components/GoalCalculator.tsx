import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, AlertTriangle, Flame, Target, Calendar } from "lucide-react";

interface CalculatorResults {
  totalToLose: number;
  monthlyTarget: number;
  dailyDeficit: number;
  isAggressive: boolean;
}

export function GoalCalculator({ onResultsChange }: { onResultsChange?: (results: CalculatorResults | null, months: number) => void }) {
  const [currentWeight, setCurrentWeight] = useState<string>("");
  const [goalWeight, setGoalWeight] = useState<string>("");
  const [timeframe, setTimeframe] = useState<string>("");

  const results = useMemo(() => {
    const current = parseFloat(currentWeight);
    const goal = parseFloat(goalWeight);
    const months = parseInt(timeframe);

    if (!current || !goal || !months || current <= goal || months <= 0) {
      onResultsChange?.(null, months || 0);
      return null;
    }

    const totalToLose = current - goal;
    const monthlyTarget = totalToLose / months;
    // 7,700 calories per 1kg of fat, spread over ~30 days
    const dailyDeficit = Math.round((monthlyTarget * 7700) / 30);
    const isAggressive = monthlyTarget > 4;

    const calculatedResults = { totalToLose, monthlyTarget, dailyDeficit, isAggressive };
    onResultsChange?.(calculatedResults, months);
    return calculatedResults;
  }, [currentWeight, goalWeight, timeframe, onResultsChange]);

  return (
    <Card className="rounded-3xl shadow-card border-border/50 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 border-b border-border/30">
        <CardTitle className="flex items-center gap-3 text-xl">
          <div className="p-2 rounded-xl bg-primary/20">
            <Calculator className="h-5 w-5 text-primary" />
          </div>
          Set Your Weight Loss Goal
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="currentWeight" className="text-sm font-medium text-muted-foreground">
              Current Weight (kg)
            </Label>
            <Input
              id="currentWeight"
              type="number"
              placeholder="e.g., 85"
              value={currentWeight}
              onChange={(e) => setCurrentWeight(e.target.value)}
              className="rounded-xl h-12 text-lg border-border/50 focus:border-primary"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="goalWeight" className="text-sm font-medium text-muted-foreground">
              Desired Goal Weight (kg)
            </Label>
            <Input
              id="goalWeight"
              type="number"
              placeholder="e.g., 70"
              value={goalWeight}
              onChange={(e) => setGoalWeight(e.target.value)}
              className="rounded-xl h-12 text-lg border-border/50 focus:border-primary"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="timeframe" className="text-sm font-medium text-muted-foreground">
              Timeframe (Months)
            </Label>
            <Input
              id="timeframe"
              type="number"
              placeholder="e.g., 6"
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="rounded-xl h-12 text-lg border-border/50 focus:border-primary"
            />
          </div>
        </div>

        {/* Results */}
        {results && (
          <div className="space-y-4 pt-4 border-t border-border/30">
            {/* Warning for aggressive goals */}
            {results.isAggressive && (
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30">
                <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  <strong>Heads up!</strong> Aiming for more than 1kg/week is aggressive. Consider a longer timeframe for sustainable results.
                </p>
              </div>
            )}

            {/* Calculated Results */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-muted/50 border border-border/30 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Target className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">Total to Lose</span>
                </div>
                <p className="text-3xl font-bold text-foreground">{results.totalToLose.toFixed(1)} <span className="text-lg font-normal text-muted-foreground">kg</span></p>
              </div>
              <div className="p-4 rounded-2xl bg-muted/50 border border-border/30 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-secondary" />
                  <span className="text-sm font-medium text-muted-foreground">Monthly Target</span>
                </div>
                <p className="text-3xl font-bold text-foreground">{results.monthlyTarget.toFixed(1)} <span className="text-lg font-normal text-muted-foreground">kg/mo</span></p>
              </div>
              <div className="p-4 rounded-2xl bg-muted/50 border border-border/30 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Flame className="h-4 w-4 text-destructive" />
                  <span className="text-sm font-medium text-muted-foreground">Daily Deficit</span>
                </div>
                <p className="text-3xl font-bold text-foreground">{results.dailyDeficit} <span className="text-lg font-normal text-muted-foreground">cal</span></p>
              </div>
            </div>
          </div>
        )}

        {/* Placeholder when no results */}
        {!results && (
          <div className="text-center py-8 text-muted-foreground">
            <Calculator className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p>Enter your details above to see your personalized plan</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
