import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Map, CheckCircle2, Circle, Zap, Flame, Trophy, Target, Sparkles, TrendingUp } from "lucide-react";

const milestoneIcons = [Target, Zap, Flame, TrendingUp, Sparkles, Trophy];
const milestoneNames = [
  "Foundation",
  "Building Momentum", 
  "Intensity Phase",
  "Consistency Check",
  "Breakthrough",
  "Transformation",
  "Mastery",
  "Victory Lap"
];

const milestoneDescriptions = [
  "Establish healthy habits and baseline routines",
  "Build exercise consistency and meal planning",
  "Increase workout intensity and refine diet",
  "Review progress and adjust strategies",
  "Push through plateaus with renewed focus",
  "See visible changes and celebrate wins",
  "Perfect your sustainable lifestyle",
  "Reach your goal and plan maintenance"
];

interface WeightRoadmapProps {
  months: number;
  hasResults: boolean;
}

export function WeightRoadmap({ months, hasResults }: WeightRoadmapProps) {
  if (!hasResults || months <= 0) {
    return (
      <Card className="rounded-3xl shadow-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="p-2 rounded-xl bg-secondary/20">
              <Map className="h-5 w-5 text-secondary" />
            </div>
            Your Personal Roadmap
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-12 text-muted-foreground">
          <Map className="h-12 w-12 mx-auto mb-3 opacity-30" />
          <p>Complete the calculator above to generate your roadmap</p>
        </CardContent>
      </Card>
    );
  }

  const roadmapMonths = Array.from({ length: Math.min(months, 8) }, (_, i) => ({
    month: i + 1,
    name: milestoneNames[i] || `Month ${i + 1}`,
    description: milestoneDescriptions[i] || "Continue your journey",
    Icon: milestoneIcons[i % milestoneIcons.length]
  }));

  return (
    <Card className="rounded-3xl shadow-card border-border/50">
      <CardHeader className="border-b border-border/30">
        <CardTitle className="flex items-center gap-3 text-xl">
          <div className="p-2 rounded-xl bg-secondary/20">
            <Map className="h-5 w-5 text-secondary" />
          </div>
          Your Personal Roadmap
          <span className="ml-auto text-sm font-normal text-muted-foreground">{months} month journey</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent" />

          {/* Milestones */}
          <div className="space-y-6">
            {roadmapMonths.map((milestone, index) => (
              <div key={milestone.month} className="relative flex items-start gap-4 pl-2">
                {/* Timeline dot */}
                <div className={`relative z-10 flex items-center justify-center w-9 h-9 rounded-full border-2 ${
                  index === 0 
                    ? 'bg-primary border-primary text-primary-foreground' 
                    : 'bg-card border-border'
                }`}>
                  {index === 0 ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <Circle className="h-3 w-3 text-muted-foreground" />
                  )}
                </div>

                {/* Content */}
                <div className={`flex-1 p-4 rounded-2xl border transition-all ${
                  index === 0 
                    ? 'bg-primary/5 border-primary/30 shadow-sm' 
                    : 'bg-muted/30 border-border/30 hover:bg-muted/50'
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    <milestone.Icon className={`h-4 w-4 ${index === 0 ? 'text-primary' : 'text-muted-foreground'}`} />
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Month {milestone.month}
                    </span>
                  </div>
                  <h4 className="font-semibold text-foreground mb-1">{milestone.name}</h4>
                  <p className="text-sm text-muted-foreground">{milestone.description}</p>
                </div>
              </div>
            ))}

            {/* Final goal */}
            <div className="relative flex items-start gap-4 pl-2">
              <div className="relative z-10 flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-glow">
                <Trophy className="h-4 w-4" />
              </div>
              <div className="flex-1 p-4 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
                <span className="text-xs font-medium text-primary uppercase tracking-wide">Goal Achieved</span>
                <h4 className="font-semibold text-foreground">You Did It! 🎉</h4>
                <p className="text-sm text-muted-foreground">Celebrate your transformation and maintain your new lifestyle</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
