import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dumbbell, Zap, Clock, Repeat } from "lucide-react";

interface Exercise {
  name: string;
  detail: string;
}

interface WorkoutCardProps {
  title: string;
  description: string;
  exercises: Exercise[];
  variant: "strength" | "hiit";
  icon: React.ElementType;
}

function WorkoutCard({ title, description, exercises, variant, icon: Icon }: WorkoutCardProps) {
  const isStrength = variant === "strength";
  
  return (
    <Card className="shadow-card border-0 rounded-3xl overflow-hidden hover:shadow-glow transition-shadow duration-300">
      <CardHeader className={`pb-3 ${isStrength ? "bg-primary/5" : "bg-secondary/5"}`}>
        <CardTitle className="flex items-center gap-3 font-display">
          <div className={`p-2 rounded-xl ${isStrength ? "bg-primary/10" : "bg-secondary/10"}`}>
            <Icon className={`h-5 w-5 ${isStrength ? "text-primary" : "text-secondary"}`} />
          </div>
          {title}
        </CardTitle>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-3">
          {exercises.map((exercise, index) => (
            <div 
              key={index}
              className="flex items-center gap-3 p-3 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className={`p-1.5 rounded-lg ${isStrength ? "bg-primary/10" : "bg-secondary/10"}`}>
                {isStrength ? (
                  <Repeat className={`h-4 w-4 text-primary`} />
                ) : (
                  <Clock className={`h-4 w-4 text-secondary`} />
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">{exercise.name}</p>
                <p className="text-xs text-muted-foreground">{exercise.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

const strengthExercises: Exercise[] = [
  { name: "Bench Press", detail: "3 sets × 10 reps" },
  { name: "Overhead Press", detail: "3 sets × 12 reps" },
  { name: "Barbell Rows", detail: "3 sets × 10 reps" },
];

const hiitExercises: Exercise[] = [
  { name: "Burpees", detail: "30 seconds on, 15 seconds rest" },
  { name: "Mountain Climbers", detail: "30 seconds on, 15 seconds rest" },
  { name: "Jump Squats", detail: "30 seconds on, 15 seconds rest" },
];

export function WorkoutCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <WorkoutCard
        title="Strength Foundation"
        description="Build muscle with compound movements"
        exercises={strengthExercises}
        variant="strength"
        icon={Dumbbell}
      />
      <WorkoutCard
        title="HIIT Blast"
        description="Burn calories with high-intensity intervals"
        exercises={hiitExercises}
        variant="hiit"
        icon={Zap}
      />
    </div>
  );
}
