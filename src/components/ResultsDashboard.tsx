import { ExpertResult } from "@/lib/expertSystem";
import { BMIGauge } from "./BMIGauge";
import { ResultCard } from "./ResultCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dumbbell, Utensils, CalendarDays, Target, Flame, Beef, ArrowLeft } from "lucide-react";

interface ResultsDashboardProps {
  result: ExpertResult;
  onReset: () => void;
}

export function ResultsDashboard({ result, onReset }: ResultsDashboardProps) {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header with back button */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onReset} className="shrink-0">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h2 className="text-2xl font-display font-bold">Your Personalized Plan</h2>
          <p className="text-muted-foreground">Based on your health profile and goals</p>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* BMI Card */}
        <Card className="shadow-card border-0 md:col-span-1">
          <CardContent className="pt-6">
            <BMIGauge 
              bmi={result.bmi} 
              category={result.bmiCategory} 
              colorClass={result.bmiColor}
            />
          </CardContent>
        </Card>

        {/* Calorie & Protein Targets */}
        <Card className="shadow-card border-0 md:col-span-2">
          <CardHeader className="pb-4">
            <CardTitle className="font-display">Daily Targets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-primary/5">
                <div className="p-3 rounded-full bg-primary/10">
                  <Flame className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Calorie Target</p>
                  <p className="text-2xl font-display font-bold">{result.calorieTarget.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">kcal / day</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/5">
                <div className="p-3 rounded-full bg-secondary/10">
                  <Beef className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Protein Target</p>
                  <p className="text-2xl font-display font-bold">{result.proteinTarget}</p>
                  <p className="text-xs text-muted-foreground">grams / day</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* End Goal */}
      <Card className="shadow-card border-0 gradient-primary text-primary-foreground overflow-hidden">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-primary-foreground/20">
              <Target className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg mb-2">Your End Goal</h3>
              <p className="opacity-90 leading-relaxed">{result.endGoal}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendation Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        <ResultCard 
          title="Exercise Suggestions" 
          icon={Dumbbell}
          items={result.exerciseSuggestions}
          variant="primary"
          delay={100}
        />
        
        <ResultCard 
          title="Diet Recommendations" 
          icon={Utensils}
          items={result.dietRecommendations}
          variant="secondary"
          delay={200}
        />
      </div>

      {/* Weekly Plan */}
      <Card className="shadow-card border-0 animate-slide-up" style={{ animationDelay: "300ms" }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-3 font-display">
            <div className="p-2 rounded-lg bg-muted">
              <CalendarDays className="h-5 w-5" />
            </div>
            Your Weekly Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-7">
            {result.weeklyPlan.map((day, index) => {
              const [dayName, ...activity] = day.split(": ");
              return (
                <div 
                  key={index} 
                  className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                >
                  <p className="font-medium text-sm text-primary mb-1">{dayName}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {activity.join(": ")}
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Reset Button */}
      <div className="flex justify-center pt-4">
        <Button variant="outline" size="lg" onClick={onReset}>
          Start Over with New Data
        </Button>
      </div>
    </div>
  );
}
