import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDown, Scale } from "lucide-react";

interface ProgressRingProps {
  currentWeight: number;
  goalWeight: number;
  totalToLose: number;
}

export function ProgressRing({ currentWeight, goalWeight, totalToLose }: ProgressRingProps) {
  // For now, showing the goal visualization (0% progress at start)
  const progressPercent = 0; // This would update as user logs progress
  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <Card className="rounded-3xl shadow-card border-border/50">
      <CardHeader className="border-b border-border/30">
        <CardTitle className="flex items-center gap-3 text-xl">
          <div className="p-2 rounded-xl bg-accent/20">
            <TrendingDown className="h-5 w-5 text-accent" />
          </div>
          Weight Goal Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Progress Ring */}
          <div className="relative">
            <svg className="w-40 h-40 transform -rotate-90">
              {/* Background circle */}
              <circle
                cx="80"
                cy="80"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="10"
                className="text-muted/30"
              />
              {/* Progress circle */}
              <circle
                cx="80"
                cy="80"
                r="45"
                fill="none"
                stroke="url(#progressGradient)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="100%" stopColor="hsl(var(--secondary))" />
                </linearGradient>
              </defs>
            </svg>
            {/* Center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-foreground">{progressPercent}%</span>
              <span className="text-xs text-muted-foreground">Complete</span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/30">
              <Scale className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Starting Weight</p>
                <p className="text-lg font-semibold text-foreground">{currentWeight} kg</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-primary/10 border border-primary/20">
              <TrendingDown className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Goal Weight</p>
                <p className="text-lg font-semibold text-primary">{goalWeight} kg</p>
              </div>
            </div>
            <div className="h-2 rounded-full bg-muted/30 overflow-hidden">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-center text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{totalToLose.toFixed(1)} kg</span> left to reach your goal
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
