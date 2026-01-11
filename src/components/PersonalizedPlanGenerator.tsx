import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Dumbbell, 
  Zap, 
  Utensils, 
  Sunrise, 
  Sun, 
  Moon, 
  Apple,
  Target,
  Flame
} from "lucide-react";

type TrainingStyle = "strength" | "cardio" | "hiit";
type Frequency = "1-3" | "4-5" | "daily";

interface WorkoutDay {
  day: string;
  exercise: string;
  setsReps: string;
  rest: string;
}

interface NutritionPlan {
  dailyCalories: number;
  proteinTarget: number;
}

const generateWorkoutPlan = (style: TrainingStyle, frequency: Frequency): WorkoutDay[] => {
  const strengthExercises: WorkoutDay[] = [
    { day: "Monday", exercise: "Barbell Deadlifts", setsReps: "3 sets × 8 reps", rest: "90 sec" },
    { day: "Monday", exercise: "Dumbbell Lunges", setsReps: "3 sets × 12 each leg", rest: "60 sec" },
    { day: "Wednesday", exercise: "Bench Press", setsReps: "4 sets × 10 reps", rest: "90 sec" },
    { day: "Wednesday", exercise: "Bent-over Rows", setsReps: "3 sets × 12 reps", rest: "60 sec" },
    { day: "Friday", exercise: "Overhead Press", setsReps: "3 sets × 10 reps", rest: "75 sec" },
    { day: "Friday", exercise: "Pull-ups", setsReps: "3 sets × 8-10 reps", rest: "90 sec" },
  ];

  const cardioExercises: WorkoutDay[] = [
    { day: "Monday", exercise: "Incline Treadmill Walk", setsReps: "30 min @ 12% incline", rest: "N/A" },
    { day: "Tuesday", exercise: "Steady-State Cycling", setsReps: "40 min moderate pace", rest: "N/A" },
    { day: "Thursday", exercise: "Rowing Machine", setsReps: "25 min intervals", rest: "N/A" },
    { day: "Friday", exercise: "Sprint Intervals", setsReps: "20 min (30s on/60s off)", rest: "N/A" },
    { day: "Saturday", exercise: "Swimming Laps", setsReps: "30 min continuous", rest: "N/A" },
  ];

  const hiitExercises: WorkoutDay[] = [
    { day: "Monday", exercise: "Burpees", setsReps: "4 rounds × 30 sec", rest: "30 sec" },
    { day: "Monday", exercise: "Mountain Climbers", setsReps: "4 rounds × 30 sec", rest: "30 sec" },
    { day: "Wednesday", exercise: "Box Jumps", setsReps: "3 rounds × 45 sec", rest: "45 sec" },
    { day: "Wednesday", exercise: "Kettlebell Swings", setsReps: "3 rounds × 45 sec", rest: "45 sec" },
    { day: "Friday", exercise: "Battle Ropes", setsReps: "4 rounds × 30 sec", rest: "30 sec" },
    { day: "Friday", exercise: "Jump Squats", setsReps: "4 rounds × 30 sec", rest: "30 sec" },
  ];

  let exercises: WorkoutDay[];
  switch (style) {
    case "strength":
      exercises = strengthExercises;
      break;
    case "cardio":
      exercises = cardioExercises;
      break;
    case "hiit":
      exercises = hiitExercises;
      break;
    default:
      exercises = strengthExercises;
  }

  // Adjust based on frequency
  if (frequency === "1-3") {
    return exercises.slice(0, 4);
  } else if (frequency === "daily") {
    // Add more variety for daily training
    const extraDays: WorkoutDay[] = [
      { day: "Sunday", exercise: "Active Recovery Walk", setsReps: "30 min easy pace", rest: "N/A" },
    ];
    return [...exercises, ...extraDays];
  }
  return exercises;
};

const calculateNutrition = (weight: number, age: number): NutritionPlan => {
  // Harris-Benedict approximation for BMR (assuming moderate activity)
  const bmr = 10 * weight + 6.25 * 170 - 5 * age + 5; // Assuming average height
  const tdee = bmr * 1.55; // Moderate activity multiplier
  const dailyCalories = Math.round(tdee - 500); // Deficit for weight loss
  const proteinTarget = Math.round(weight * 1.8); // 1.8g per kg for active individuals
  
  return { dailyCalories, proteinTarget };
};

interface PersonalizedPlanGeneratorProps {
  goalWeight?: number;
  months?: number;
}

export function PersonalizedPlanGenerator({ goalWeight, months }: PersonalizedPlanGeneratorProps) {
  const [age, setAge] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [trainingStyle, setTrainingStyle] = useState<TrainingStyle | "">("");
  const [frequency, setFrequency] = useState<Frequency | "">("");
  const [showPlan, setShowPlan] = useState(false);

  const canGenerate = age && weight && trainingStyle && frequency;

  const handleGenerate = () => {
    if (canGenerate) {
      setShowPlan(true);
    }
  };

  const workoutPlan = trainingStyle && frequency 
    ? generateWorkoutPlan(trainingStyle as TrainingStyle, frequency as Frequency) 
    : [];
  
  const nutrition = weight && age 
    ? calculateNutrition(parseFloat(weight), parseInt(age)) 
    : { dailyCalories: 0, proteinTarget: 0 };

  const getStyleIcon = () => {
    switch (trainingStyle) {
      case "strength": return <Dumbbell className="h-5 w-5" />;
      case "cardio": return <Flame className="h-5 w-5" />;
      case "hiit": return <Zap className="h-5 w-5" />;
      default: return <Dumbbell className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card className="rounded-3xl shadow-card border-border/50 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-secondary/10 to-secondary/5 border-b border-border/30">
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="p-2 rounded-xl bg-secondary/20">
              <Dumbbell className="h-5 w-5 text-secondary" />
            </div>
            Personalized Training & Nutrition Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">Age</Label>
              <Input
                type="number"
                placeholder="e.g., 30"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="rounded-xl h-12 text-lg border-border/50 focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">Current Weight (kg)</Label>
              <Input
                type="number"
                placeholder="e.g., 85"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="rounded-xl h-12 text-lg border-border/50 focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">Training Style</Label>
              <Select value={trainingStyle} onValueChange={(v) => setTrainingStyle(v as TrainingStyle)}>
                <SelectTrigger className="rounded-xl h-12 text-base border-border/50">
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent className="bg-background border-border z-50">
                  <SelectItem value="strength">Strength & Muscle</SelectItem>
                  <SelectItem value="cardio">Pure Cardio</SelectItem>
                  <SelectItem value="hiit">Hybrid HIIT</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">Workout Frequency</Label>
              <Select value={frequency} onValueChange={(v) => setFrequency(v as Frequency)}>
                <SelectTrigger className="rounded-xl h-12 text-base border-border/50">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent className="bg-background border-border z-50">
                  <SelectItem value="1-3">1-3 days/week</SelectItem>
                  <SelectItem value="4-5">4-5 days/week</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            variant="gradient" 
            size="lg" 
            onClick={handleGenerate}
            disabled={!canGenerate}
            className="w-full md:w-auto"
          >
            <Zap className="h-5 w-5 mr-2" />
            Generate My Personalized Plan
          </Button>
        </CardContent>
      </Card>

      {/* Generated Plan */}
      {showPlan && (
        <div className="space-y-6 animate-fade-in">
          {/* Summary Card */}
          {goalWeight && months && (
            <Card className="rounded-3xl shadow-card border-primary/30 bg-gradient-to-r from-primary/5 to-primary/10 overflow-hidden">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-primary/20">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <p className="text-lg">
                  <span className="text-muted-foreground">To reach your goal of </span>
                  <span className="font-bold text-foreground">{goalWeight} kg</span>
                  <span className="text-muted-foreground"> in </span>
                  <span className="font-bold text-foreground">{months} months</span>
                  <span className="text-muted-foreground">, follow this plan consistently.</span>
                </p>
              </CardContent>
            </Card>
          )}

          {/* Weekly Workout Routine */}
          <Card className="rounded-3xl shadow-card border-border/50 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 border-b border-border/30">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 rounded-xl bg-primary/20 text-primary">
                  {getStyleIcon()}
                </div>
                Your Weekly Workout Routine
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">Day</TableHead>
                      <TableHead className="font-semibold">Exercise Name</TableHead>
                      <TableHead className="font-semibold">Sets & Reps</TableHead>
                      <TableHead className="font-semibold">Rest Period</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {workoutPlan.map((exercise, index) => (
                      <TableRow key={index} className="hover:bg-muted/30 transition-colors">
                        <TableCell className="font-medium">{exercise.day}</TableCell>
                        <TableCell>{exercise.exercise}</TableCell>
                        <TableCell className="text-primary font-medium">{exercise.setsReps}</TableCell>
                        <TableCell className="text-muted-foreground">{exercise.rest}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Nutritional Blueprint */}
          <Card className="rounded-3xl shadow-card border-border/50 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-secondary/10 to-secondary/5 border-b border-border/30">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 rounded-xl bg-secondary/20">
                  <Utensils className="h-5 w-5 text-secondary" />
                </div>
                Nutritional & Calorie Blueprint
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Daily Targets */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 text-center">
                  <Flame className="h-8 w-8 text-primary mx-auto mb-3" />
                  <p className="text-sm font-medium text-muted-foreground mb-1">Daily Calorie Target</p>
                  <p className="text-4xl font-bold text-foreground">{nutrition.dailyCalories}</p>
                  <p className="text-muted-foreground">calories/day</p>
                </div>
                <div className="p-6 rounded-2xl bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20 text-center">
                  <Dumbbell className="h-8 w-8 text-secondary mx-auto mb-3" />
                  <p className="text-sm font-medium text-muted-foreground mb-1">Daily Protein Target</p>
                  <p className="text-4xl font-bold text-foreground">{nutrition.proteinTarget}</p>
                  <p className="text-muted-foreground">grams/day</p>
                </div>
              </div>

              {/* Food Recommendations */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Apple className="h-5 w-5 text-primary" />
                  Recommended Meals
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Breakfast */}
                  <Card className="rounded-2xl border-border/50 bg-gradient-to-br from-amber-500/5 to-amber-500/10">
                    <CardContent className="p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-xl bg-amber-500/20">
                          <Sunrise className="h-5 w-5 text-amber-600" />
                        </div>
                        <h4 className="font-semibold text-foreground">Breakfast</h4>
                      </div>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          High-protein oats with berries
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          Egg white omelet with spinach
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          Greek yogurt parfait
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Lunch/Dinner */}
                  <Card className="rounded-2xl border-border/50 bg-gradient-to-br from-primary/5 to-primary/10">
                    <CardContent className="p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-xl bg-primary/20">
                          <Sun className="h-5 w-5 text-primary" />
                        </div>
                        <h4 className="font-semibold text-foreground">Lunch/Dinner</h4>
                      </div>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          Grilled chicken with quinoa
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          Baked salmon with greens
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          Lean turkey stir-fry
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Snacks */}
                  <Card className="rounded-2xl border-border/50 bg-gradient-to-br from-secondary/5 to-secondary/10">
                    <CardContent className="p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-xl bg-secondary/20">
                          <Moon className="h-5 w-5 text-secondary" />
                        </div>
                        <h4 className="font-semibold text-foreground">Snacks</h4>
                      </div>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="text-secondary">•</span>
                          Almonds (handful)
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-secondary">•</span>
                          Greek yogurt cup
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-secondary">•</span>
                          Fresh fruit or protein shake
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
