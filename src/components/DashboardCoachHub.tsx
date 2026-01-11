import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Flame, 
  Dumbbell, 
  Zap, 
  Target,
  Heart,
  TrendingUp,
  Utensils,
  Sunrise,
  Sun,
  Moon,
  Apple,
  Scale,
  Sparkles,
  Shield,
  Trophy
} from "lucide-react";
import { calculateBMI, getBMICategory } from "@/lib/expertSystem";

type GoalType = "shred" | "lean" | "power" | null;

interface WorkoutDay {
  day: string;
  exercise: string;
  setsReps: string;
  rest: string;
}

const goalCards = [
  {
    id: "shred" as GoalType,
    title: "The Shred",
    description: "High-intensity fat burning with HIIT & cardio circuits",
    icon: Flame,
    color: "from-red-500/20 to-orange-500/20",
    borderColor: "border-red-500/30",
    iconColor: "text-red-500",
    features: ["HIIT Workouts", "15-20 Reps", "Short Rest"]
  },
  {
    id: "lean" as GoalType,
    title: "The Lean Build",
    description: "Balanced hybrid training for muscle tone & definition",
    icon: TrendingUp,
    color: "from-primary/20 to-amber-500/20",
    borderColor: "border-primary/30",
    iconColor: "text-primary",
    features: ["Weights + Cardio", "8-12 Reps", "Moderate Rest"]
  },
  {
    id: "power" as GoalType,
    title: "The Power Plan",
    description: "Heavy strength training for maximum muscle & power",
    icon: Dumbbell,
    color: "from-secondary/20 to-emerald-500/20",
    borderColor: "border-secondary/30",
    iconColor: "text-secondary",
    features: ["Heavy Lifts", "3-5 Reps", "Long Rest"]
  }
];

const generateWorkoutByGoal = (goal: GoalType, daysPerWeek: number): WorkoutDay[] => {
  const isFullBody = daysPerWeek <= 3;
  
  const shredWorkouts: WorkoutDay[] = isFullBody ? [
    { day: "Monday", exercise: "Burpee Blasts", setsReps: "4 sets × 20 reps", rest: "30 sec" },
    { day: "Monday", exercise: "Mountain Climbers", setsReps: "4 sets × 30 sec", rest: "20 sec" },
    { day: "Monday", exercise: "Jump Squats", setsReps: "4 sets × 15 reps", rest: "30 sec" },
    { day: "Wednesday", exercise: "High Knees Sprint", setsReps: "5 sets × 30 sec", rest: "20 sec" },
    { day: "Wednesday", exercise: "Box Jumps", setsReps: "4 sets × 15 reps", rest: "30 sec" },
    { day: "Wednesday", exercise: "Battle Ropes", setsReps: "4 sets × 30 sec", rest: "20 sec" },
    { day: "Friday", exercise: "Kettlebell Swings", setsReps: "4 sets × 20 reps", rest: "30 sec" },
    { day: "Friday", exercise: "Treadmill Sprints", setsReps: "10 rounds × 30s/60s", rest: "Walk" },
  ] : [
    { day: "Monday", exercise: "Burpee Blasts", setsReps: "5 sets × 20 reps", rest: "20 sec" },
    { day: "Monday", exercise: "Mountain Climbers", setsReps: "5 sets × 30 sec", rest: "15 sec" },
    { day: "Tuesday", exercise: "High Knees Sprint", setsReps: "6 sets × 30 sec", rest: "15 sec" },
    { day: "Tuesday", exercise: "Jump Lunges", setsReps: "4 sets × 20 reps", rest: "20 sec" },
    { day: "Wednesday", exercise: "Active Recovery Walk", setsReps: "30 min steady", rest: "N/A" },
    { day: "Thursday", exercise: "Box Jumps", setsReps: "5 sets × 15 reps", rest: "30 sec" },
    { day: "Thursday", exercise: "Battle Ropes", setsReps: "5 sets × 30 sec", rest: "20 sec" },
    { day: "Friday", exercise: "Kettlebell Swings", setsReps: "5 sets × 20 reps", rest: "25 sec" },
    { day: "Friday", exercise: "Rowing Sprints", setsReps: "8 rounds × 30s/30s", rest: "Active" },
    { day: "Saturday", exercise: "HIIT Circuit", setsReps: "20 min AMRAP", rest: "Minimal" },
  ];

  const leanWorkouts: WorkoutDay[] = isFullBody ? [
    { day: "Monday", exercise: "Goblet Squats", setsReps: "3 sets × 12 reps", rest: "60 sec" },
    { day: "Monday", exercise: "Dumbbell Bench Press", setsReps: "3 sets × 10 reps", rest: "60 sec" },
    { day: "Monday", exercise: "Lat Pulldowns", setsReps: "3 sets × 12 reps", rest: "60 sec" },
    { day: "Wednesday", exercise: "Romanian Deadlifts", setsReps: "3 sets × 10 reps", rest: "60 sec" },
    { day: "Wednesday", exercise: "Shoulder Press", setsReps: "3 sets × 12 reps", rest: "60 sec" },
    { day: "Wednesday", exercise: "Plank Holds", setsReps: "3 sets × 45 sec", rest: "45 sec" },
    { day: "Friday", exercise: "Leg Press", setsReps: "3 sets × 12 reps", rest: "60 sec" },
    { day: "Friday", exercise: "Cable Rows", setsReps: "3 sets × 12 reps", rest: "60 sec" },
    { day: "Friday", exercise: "Treadmill Incline", setsReps: "20 min moderate", rest: "N/A" },
  ] : [
    { day: "Monday", exercise: "Barbell Squats", setsReps: "4 sets × 10 reps", rest: "60 sec" },
    { day: "Monday", exercise: "Leg Curls", setsReps: "3 sets × 12 reps", rest: "45 sec" },
    { day: "Tuesday", exercise: "Bench Press", setsReps: "4 sets × 10 reps", rest: "60 sec" },
    { day: "Tuesday", exercise: "Incline DB Flyes", setsReps: "3 sets × 12 reps", rest: "45 sec" },
    { day: "Wednesday", exercise: "LISS Cardio", setsReps: "30 min cycling", rest: "N/A" },
    { day: "Thursday", exercise: "Bent-over Rows", setsReps: "4 sets × 10 reps", rest: "60 sec" },
    { day: "Thursday", exercise: "Lat Pulldowns", setsReps: "3 sets × 12 reps", rest: "45 sec" },
    { day: "Friday", exercise: "Shoulder Press", setsReps: "4 sets × 10 reps", rest: "60 sec" },
    { day: "Friday", exercise: "Lateral Raises", setsReps: "3 sets × 15 reps", rest: "30 sec" },
    { day: "Saturday", exercise: "HIIT Finisher", setsReps: "15 min circuits", rest: "Active" },
  ];

  const powerWorkouts: WorkoutDay[] = isFullBody ? [
    { day: "Monday", exercise: "Barbell Squats", setsReps: "5 sets × 5 reps", rest: "3 min" },
    { day: "Monday", exercise: "Bench Press", setsReps: "5 sets × 5 reps", rest: "3 min" },
    { day: "Monday", exercise: "Barbell Rows", setsReps: "5 sets × 5 reps", rest: "2 min" },
    { day: "Wednesday", exercise: "Deadlifts", setsReps: "5 sets × 3 reps", rest: "4 min" },
    { day: "Wednesday", exercise: "Overhead Press", setsReps: "5 sets × 5 reps", rest: "3 min" },
    { day: "Wednesday", exercise: "Pull-ups (Weighted)", setsReps: "4 sets × 5 reps", rest: "2 min" },
    { day: "Friday", exercise: "Front Squats", setsReps: "4 sets × 5 reps", rest: "3 min" },
    { day: "Friday", exercise: "Close-Grip Bench", setsReps: "4 sets × 5 reps", rest: "2 min" },
  ] : [
    { day: "Monday", exercise: "Barbell Squats", setsReps: "5 sets × 5 reps", rest: "3 min" },
    { day: "Monday", exercise: "Leg Press", setsReps: "4 sets × 5 reps", rest: "2 min" },
    { day: "Tuesday", exercise: "Bench Press", setsReps: "5 sets × 5 reps", rest: "3 min" },
    { day: "Tuesday", exercise: "Incline Press", setsReps: "4 sets × 5 reps", rest: "2 min" },
    { day: "Wednesday", exercise: "Light Mobility Work", setsReps: "20 min", rest: "N/A" },
    { day: "Thursday", exercise: "Deadlifts", setsReps: "5 sets × 3 reps", rest: "4 min" },
    { day: "Thursday", exercise: "Barbell Rows", setsReps: "4 sets × 5 reps", rest: "2 min" },
    { day: "Friday", exercise: "Overhead Press", setsReps: "5 sets × 5 reps", rest: "3 min" },
    { day: "Friday", exercise: "Weighted Dips", setsReps: "4 sets × 5 reps", rest: "2 min" },
    { day: "Saturday", exercise: "Accessory Work", setsReps: "Weak points", rest: "As needed" },
  ];

  switch (goal) {
    case "shred": return shredWorkouts;
    case "lean": return leanWorkouts;
    case "power": return powerWorkouts;
    default: return [];
  }
};

const calculateNutrition = (weight: number, age: number, goal: GoalType) => {
  const bmr = 10 * weight + 6.25 * 170 - 5 * age + 5;
  const tdee = Math.round(bmr * 1.55);
  
  let calorieTarget = tdee;
  let proteinMultiplier = 1.8;
  
  switch (goal) {
    case "shred":
      calorieTarget = tdee - 500;
      proteinMultiplier = 2.0;
      break;
    case "lean":
      calorieTarget = tdee - 250;
      proteinMultiplier = 1.8;
      break;
    case "power":
      calorieTarget = tdee;
      proteinMultiplier = 2.2;
      break;
  }
  
  return {
    calories: Math.round(calorieTarget),
    protein: Math.round(weight * proteinMultiplier),
    tdee
  };
};

export function DashboardCoachHub() {
  const [selectedGoal, setSelectedGoal] = useState<GoalType>(null);
  const [age, setAge] = useState<number>(28);
  const [weight, setWeight] = useState<number>(75);
  const [height, setHeight] = useState<number>(175);
  const [exercisePerWeek, setExercisePerWeek] = useState<number>(4);
  const [showResults, setShowResults] = useState(false);
  const [bmiCalculated, setBmiCalculated] = useState(false);

  const bmi = useMemo(() => calculateBMI(weight, height), [weight, height]);
  const bmiInfo = useMemo(() => getBMICategory(bmi), [bmi]);
  
  const workoutPlan = useMemo(() => 
    selectedGoal ? generateWorkoutByGoal(selectedGoal, exercisePerWeek) : [], 
    [selectedGoal, exercisePerWeek]
  );
  
  const nutrition = useMemo(() => 
    selectedGoal ? calculateNutrition(weight, age, selectedGoal) : null, 
    [weight, age, selectedGoal]
  );

  const handleCalculateBMI = () => {
    setBmiCalculated(true);
  };

  const handleGeneratePlan = () => {
    if (selectedGoal) {
      setShowResults(true);
    }
  };

  const getMotivationCard = () => {
    switch (bmiInfo.category) {
      case "Underweight":
        return {
          color: "from-accent/20 to-blue-500/20",
          border: "border-accent/50",
          icon: Shield,
          iconColor: "text-accent",
          title: "Building Foundation",
          message: "Focus on building a strong foundation. Every brick you add makes you stronger. Your journey to a healthier weight starts with consistent, quality nutrition and progressive training."
        };
      case "Normal":
        return {
          color: "from-secondary/20 to-emerald-500/20",
          border: "border-secondary/50",
          icon: Trophy,
          iconColor: "text-secondary",
          title: "Status: Balanced",
          message: "Excellent balance! You have achieved a fantastic equilibrium. Focus on tone and stamina to take your fitness to the next level. Your dedication to maintenance is inspiring—keep leading the way!"
        };
      case "Overweight":
      case "Obese":
        return {
          color: "from-primary/20 to-orange-500/20",
          border: "border-primary/50",
          icon: Flame,
          iconColor: "text-primary",
          title: "The Warrior's Path",
          message: "The marathon of health is won with consistency. Every workout is a victory, every healthy meal is progress. Focus on sustainable habits and watch your transformation unfold."
        };
      default:
        return null;
    }
  };

  const motivation = getMotivationCard();

  return (
    <div className="space-y-8">
      {/* Goal Selection Section */}
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-2xl font-display font-bold mb-2">Choose Your Path</h3>
          <p className="text-muted-foreground">Select a training goal to unlock your personalized program</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {goalCards.map((goal) => (
            <Card 
              key={goal.id}
              onClick={() => setSelectedGoal(goal.id)}
              className={`rounded-3xl cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                selectedGoal === goal.id 
                  ? `${goal.borderColor} border-2 shadow-glow bg-gradient-to-br ${goal.color}` 
                  : "border-border/50 hover:border-border"
              }`}
            >
              <CardContent className="p-6 text-center space-y-4">
                <div className={`mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br ${goal.color} flex items-center justify-center`}>
                  <goal.icon className={`h-8 w-8 ${goal.iconColor}`} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-xl mb-1">{goal.title}</h4>
                  <p className="text-muted-foreground text-sm">{goal.description}</p>
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {goal.features.map((feature, idx) => (
                    <span 
                      key={idx} 
                      className="text-xs px-2 py-1 rounded-full bg-muted/50 text-muted-foreground"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                {selectedGoal === goal.id && (
                  <div className="flex items-center justify-center gap-2 text-primary font-medium animate-fade-in">
                    <Sparkles className="h-4 w-4" />
                    Selected
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Smart Profile & BMI Input */}
      <Card className="rounded-3xl shadow-card border-border/50 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-border/30">
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10">
              <Target className="h-5 w-5 text-primary" />
            </div>
            Your Profile & Stats
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Age */}
            <div className="space-y-3">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Heart className="h-4 w-4 text-primary" />
                Age
              </Label>
              <div className="flex items-center gap-4">
                <Slider
                  value={[age]}
                  onValueChange={(v) => setAge(v[0])}
                  min={16}
                  max={70}
                  step={1}
                  className="flex-1"
                />
                <span className="w-12 text-right font-display font-bold text-lg">{age}</span>
              </div>
            </div>

            {/* Weight */}
            <div className="space-y-3">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Scale className="h-4 w-4 text-primary" />
                Weight (kg)
              </Label>
              <Input
                type="number"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value) || 0)}
                min={30}
                max={200}
                className="rounded-xl h-12 text-lg font-display font-bold"
              />
            </div>

            {/* Height */}
            <div className="space-y-3">
              <Label className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                Height (cm)
              </Label>
              <Input
                type="number"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value) || 0)}
                min={100}
                max={250}
                className="rounded-xl h-12 text-lg font-display font-bold"
              />
            </div>

            {/* Days per Week */}
            <div className="space-y-3">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Zap className="h-4 w-4 text-secondary" />
                Days/Week
              </Label>
              <div className="flex items-center gap-4">
                <Slider
                  value={[exercisePerWeek]}
                  onValueChange={(v) => setExercisePerWeek(v[0])}
                  min={1}
                  max={7}
                  step={1}
                  className="flex-1"
                />
                <span className="w-12 text-right font-display font-bold text-lg">{exercisePerWeek}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              variant="outline" 
              size="lg"
              onClick={handleCalculateBMI}
              className="flex-1 sm:flex-none"
            >
              <Scale className="h-5 w-5 mr-2" />
              Calculate My BMI
            </Button>
            
            <Button 
              variant="gradient" 
              size="lg"
              onClick={handleGeneratePlan}
              disabled={!selectedGoal}
              className="flex-1"
            >
              <Zap className="h-5 w-5 mr-2" />
              Generate My Personalized Plan
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* BMI Motivation Card */}
      {bmiCalculated && motivation && (
        <Card className={`rounded-3xl shadow-card border-2 ${motivation.border} bg-gradient-to-br ${motivation.color} animate-fade-in overflow-hidden`}>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-2xl bg-background/50`}>
                <motivation.icon className={`h-8 w-8 ${motivation.iconColor}`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-display font-bold text-xl">{motivation.title}</h4>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium bg-background/50 ${bmiInfo.color}`}>
                    BMI: {bmi.toFixed(1)} • {bmiInfo.category}
                  </span>
                </div>
                <p className="text-muted-foreground leading-relaxed">{motivation.message}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Generated Results */}
      {showResults && selectedGoal && nutrition && (
        <div className="space-y-6 animate-fade-in">
          {/* Summary */}
          <Card className="rounded-3xl shadow-card border-primary/30 bg-gradient-to-r from-primary/5 to-primary/10">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-primary/20">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <p className="text-lg">
                <span className="text-muted-foreground">Your </span>
                <span className="font-bold text-foreground">
                  {goalCards.find(g => g.id === selectedGoal)?.title}
                </span>
                <span className="text-muted-foreground"> plan is ready! Training </span>
                <span className="font-bold text-foreground">{exercisePerWeek} days/week</span>
                <span className="text-muted-foreground"> with tailored nutrition.</span>
              </p>
            </CardContent>
          </Card>

          {/* Workout Table */}
          <Card className="rounded-3xl shadow-card border-border/50 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 border-b border-border/30">
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-primary/20">
                  <Dumbbell className="h-5 w-5 text-primary" />
                </div>
                Your Weekly Training Routine
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

          {/* Nutrition Blueprint */}
          <Card className="rounded-3xl shadow-card border-border/50 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-secondary/10 to-secondary/5 border-b border-border/30">
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-secondary/20">
                  <Utensils className="h-5 w-5 text-secondary" />
                </div>
                Nutritional & Calorie Blueprint
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Daily Targets */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 text-center">
                  <Flame className="h-8 w-8 text-primary mx-auto mb-3" />
                  <p className="text-sm font-medium text-muted-foreground mb-1">Daily Calories</p>
                  <p className="text-3xl font-bold text-foreground">{nutrition.calories}</p>
                  <p className="text-xs text-muted-foreground">
                    {selectedGoal === "shred" ? "TDEE - 500" : selectedGoal === "lean" ? "TDEE - 250" : "Maintenance"}
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20 text-center">
                  <Dumbbell className="h-8 w-8 text-secondary mx-auto mb-3" />
                  <p className="text-sm font-medium text-muted-foreground mb-1">Protein Target</p>
                  <p className="text-3xl font-bold text-foreground">{nutrition.protein}g</p>
                  <p className="text-xs text-muted-foreground">per day</p>
                </div>
                <div className="p-6 rounded-2xl bg-gradient-to-br from-accent/10 to-blue-500/5 border border-accent/20 text-center">
                  <Target className="h-8 w-8 text-accent mx-auto mb-3" />
                  <p className="text-sm font-medium text-muted-foreground mb-1">Your TDEE</p>
                  <p className="text-3xl font-bold text-foreground">{nutrition.tdee}</p>
                  <p className="text-xs text-muted-foreground">maintenance calories</p>
                </div>
              </div>

              {/* Food Recommendations */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Apple className="h-5 w-5 text-primary" />
                  Recommended Meals
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="rounded-2xl border-border/50 bg-gradient-to-br from-amber-500/5 to-amber-500/10">
                    <CardContent className="p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-xl bg-amber-500/20">
                          <Sunrise className="h-5 w-5 text-amber-600" />
                        </div>
                        <h4 className="font-semibold">Breakfast</h4>
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

                  <Card className="rounded-2xl border-border/50 bg-gradient-to-br from-primary/5 to-primary/10">
                    <CardContent className="p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-xl bg-primary/20">
                          <Sun className="h-5 w-5 text-primary" />
                        </div>
                        <h4 className="font-semibold">Lunch/Dinner</h4>
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

                  <Card className="rounded-2xl border-border/50 bg-gradient-to-br from-secondary/5 to-secondary/10">
                    <CardContent className="p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-xl bg-secondary/20">
                          <Moon className="h-5 w-5 text-secondary" />
                        </div>
                        <h4 className="font-semibold">Snacks</h4>
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
