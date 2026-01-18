import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
  Trophy,
  User,
  Home,
  Activity,
  Clock,
  AlertTriangle,
  CheckCircle,
  ChevronRight,
  Brain,
  RotateCcw
} from "lucide-react";
import { 
  runExpertSystem, 
  UserInput, 
  ExpertSystemResult,
  getBmiMotivation 
} from "@/lib/expertSystem";

export function DashboardCoachHub() {
  // Form state
  const [age, setAge] = useState<number>(28);
  const [weight, setWeight] = useState<number>(75);
  const [height, setHeight] = useState<number>(175);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [trainingType, setTrainingType] = useState<'home' | 'gym' | 'cardio-focused'>('gym');
  const [activityLevel, setActivityLevel] = useState<'sedentary' | 'light' | 'moderate' | 'active'>('moderate');
  const [goalBody, setGoalBody] = useState<'recomp' | 'fat-loss'>('fat-loss');
  const [timeframe, setTimeframe] = useState<number>(12);
  const [goalWeight, setGoalWeight] = useState<number>(70);
  
  // Results state
  const [result, setResult] = useState<ExpertSystemResult | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleGeneratePlan = () => {
    const input: UserInput = {
      age,
      weight,
      height,
      gender,
      trainingType,
      activityLevel,
      goalBody,
      timeframe,
      goalWeight
    };
    
    const expertResult = runExpertSystem(input);
    setResult(expertResult);
    setShowResults(true);
  };

  const motivation = result ? getBmiMotivation(result.bmiCategory) : null;

  return (
    <div className="space-y-8">
      {/* ISP543 Header */}
      <div className="text-center">
        <Badge variant="outline" className="mb-4 px-4 py-1 text-sm">
          <Brain className="h-4 w-4 mr-2" />
          ISP543 Rule-Based Expert System
        </Badge>
        <h3 className="text-2xl font-display font-bold mb-2">Fitness Expert System</h3>
        <p className="text-muted-foreground">Build Your Dream Body.</p>
      </div>

      {/* Input Section */}
      <Card className="rounded-3xl shadow-card border-border/50 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-border/30">
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10">
              <Target className="h-5 w-5 text-primary" />
            </div>
            Input Your Data
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* Row 1: Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Heart className="h-4 w-4 text-primary" />
                Umur (Age)
              </Label>
              <Input
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value) || 0)}
                min={16}
                max={80}
                className="rounded-xl h-12"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Scale className="h-4 w-4 text-primary" />
                Berat (Weight kg)
              </Label>
              <Input
                type="number"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value) || 0)}
                min={30}
                max={200}
                className="rounded-xl h-12"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                Tinggi (Height cm)
              </Label>
              <Input
                type="number"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value) || 0)}
                min={100}
                max={250}
                className="rounded-xl h-12"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                Jantina (Gender)
              </Label>
              <Select value={gender} onValueChange={(v) => setGender(v as 'male' | 'female')}>
                <SelectTrigger className="rounded-xl h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male (Lelaki)</SelectItem>
                  <SelectItem value="female">Female (Perempuan)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Row 2: Training & Activity */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Home className="h-4 w-4 text-secondary" />
                Training Type
              </Label>
              <Select value={trainingType} onValueChange={(v) => setTrainingType(v as 'home' | 'gym' | 'cardio-focused')}>
                <SelectTrigger className="rounded-xl h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="home">Home Training</SelectItem>
                  <SelectItem value="gym">Gym Training</SelectItem>
                  <SelectItem value="cardio-focused">Cardio-Focused</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Activity className="h-4 w-4 text-secondary" />
                Activity Level
              </Label>
              <Select value={activityLevel} onValueChange={(v) => setActivityLevel(v as 'sedentary' | 'light' | 'moderate' | 'active')}>
                <SelectTrigger className="rounded-xl h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentary</SelectItem>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Flame className="h-4 w-4 text-secondary" />
                Goal Body
              </Label>
              <Select value={goalBody} onValueChange={(v) => setGoalBody(v as 'recomp' | 'fat-loss')}>
                <SelectTrigger className="rounded-xl h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recomp">Recomposition</SelectItem>
                  <SelectItem value="fat-loss">Fat Loss</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Row 3: Goal Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Clock className="h-4 w-4 text-accent" />
                Timeframe (Weeks)
              </Label>
              <Input
                type="number"
                value={timeframe}
                onChange={(e) => setTimeframe(Number(e.target.value) || 1)}
                min={1}
                max={52}
                className="rounded-xl h-12"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Target className="h-4 w-4 text-accent" />
                Goal Weight (kg)
              </Label>
              <Input
                type="number"
                value={goalWeight}
                onChange={(e) => setGoalWeight(Number(e.target.value) || 0)}
                min={30}
                max={200}
                className="rounded-xl h-12"
              />
            </div>
          </div>

          {/* Reset Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setAge(28);
              setWeight(75);
              setHeight(175);
              setGender('male');
              setTrainingType('gym');
              setActivityLevel('moderate');
              setGoalBody('fat-loss');
              setTimeframe(12);
              setGoalWeight(70);
              setShowResults(false);
              setResult(null);
            }}
            className="w-fit text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>

          <Button 
            variant="gradient" 
            size="lg"
            onClick={handleGeneratePlan}
            className="w-full"
          >
            <Zap className="h-5 w-5 mr-2" />
            Run Expert System Analysis
          </Button>
        </CardContent>
      </Card>

      {/* Results Section */}
      {showResults && result && (
        <div className="space-y-6 animate-fade-in">
          {/* Warnings */}
          {result.warnings.length > 0 && (
            <Card className="rounded-3xl shadow-card border-destructive/30 bg-destructive/5">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-destructive/20">
                    <AlertTriangle className="h-6 w-6 text-destructive" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-display font-bold text-lg mb-2">Expert System Warnings</h4>
                    <ul className="space-y-2">
                      {result.warnings.map((warning, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-destructive">•</span>
                          {warning}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* BMI Motivation Card */}
          {motivation && (
            <Card className={`rounded-3xl shadow-card border-2 ${motivation.bgColor} animate-fade-in overflow-hidden`}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-2xl bg-background/50`}>
                    {result.bmiCategory === 'underweight' && <Shield className="h-8 w-8 text-blue-500" />}
                    {result.bmiCategory === 'normal' && <Trophy className="h-8 w-8 text-green-500" />}
                    {(result.bmiCategory === 'overweight' || result.bmiCategory === 'obese') && <Flame className="h-8 w-8 text-orange-500" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-display font-bold text-xl">{motivation.title}</h4>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium bg-background/50 ${motivation.color}`}>
                        BMI: {result.bmi.toFixed(1)} • {result.bmiCategory.charAt(0).toUpperCase() + result.bmiCategory.slice(1)}
                      </span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{motivation.message}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Logic Logs Section */}
          <Card className="rounded-3xl shadow-card border-border/50 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-b border-border/30">
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-purple-500/20">
                  <Brain className="h-5 w-5 text-purple-500" />
                </div>
                Logic Logs - Rules Triggered
                <Badge variant="secondary" className="ml-auto">
                  {result.ruleLogs.length} Rules Fired
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="logs" className="border-0">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <span className="flex items-center gap-2">
                      <ChevronRight className="h-4 w-4" />
                      View Inference Chain
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="space-y-3 max-h-80 overflow-y-auto">
                      {result.ruleLogs.map((log, idx) => (
                        <div 
                          key={idx}
                          className="flex items-start gap-3 p-3 rounded-xl bg-muted/50 border border-border/30"
                        >
                          <Badge 
                            variant="outline" 
                            className="shrink-0 font-mono text-xs bg-primary/10 text-primary border-primary/30"
                          >
                            {log.ruleId}
                          </Badge>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-mono text-muted-foreground mb-1 break-words">
                              {log.description}
                            </p>
                            <p className="text-sm font-medium flex items-center gap-2">
                              <CheckCircle className="h-3 w-3 text-green-500 shrink-0" />
                              {log.result}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* Explanation Facility */}
          <Card className="rounded-3xl shadow-card border-primary/30 bg-gradient-to-r from-primary/5 to-secondary/5">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-primary/20">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-display font-bold text-lg mb-2">Expert System Explanation</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Based on your BMI of <span className="font-bold text-foreground">{result.bmi.toFixed(1)}</span>, 
                    I have classified you as <span className="font-bold text-foreground capitalize">{result.bmiCategory}</span>. 
                    I recommended a protein multiplier of <span className="font-bold text-foreground">{result.proteinMultiplier}g/kg</span> and 
                    customized your training plan because you chose <span className="font-bold text-foreground capitalize">{trainingType.replace('-', ' ')}</span> training 
                    with <span className="font-bold text-foreground capitalize">{result.trainingPriority.replace('_', ' ')}</span> priority.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Daily Targets */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="rounded-2xl border-border/50 bg-gradient-to-br from-primary/10 to-primary/5">
              <CardContent className="p-6 text-center">
                <Flame className="h-8 w-8 text-primary mx-auto mb-3" />
                <p className="text-sm font-medium text-muted-foreground mb-1">Daily Calories</p>
                <p className="text-3xl font-bold text-foreground">{result.dailyCalories}</p>
                <p className="text-xs text-muted-foreground">Total Daily Energy Expenditure {Math.round(result.tdee)} - {result.deficit}</p>
              </CardContent>
            </Card>
            <Card className="rounded-2xl border-border/50 bg-gradient-to-br from-secondary/10 to-secondary/5">
              <CardContent className="p-6 text-center">
                <Dumbbell className="h-8 w-8 text-secondary mx-auto mb-3" />
                <p className="text-sm font-medium text-muted-foreground mb-1">Protein Target</p>
                <p className="text-3xl font-bold text-foreground">{result.proteinTarget}g</p>
                <p className="text-xs text-muted-foreground">{weight}kg × {result.proteinMultiplier}g/kg</p>
              </CardContent>
            </Card>
            <Card className="rounded-2xl border-border/50 bg-gradient-to-br from-accent/10 to-accent/5">
              <CardContent className="p-6 text-center">
                <Moon className="h-8 w-8 text-accent mx-auto mb-3" />
                <p className="text-sm font-medium text-muted-foreground mb-1">Rest Days</p>
                <p className="text-3xl font-bold text-foreground">{result.restDays}</p>
                <p className="text-xs text-muted-foreground">per week</p>
              </CardContent>
            </Card>
            <Card className="rounded-2xl border-border/50 bg-gradient-to-br from-blue-500/10 to-blue-500/5">
              <CardContent className="p-6 text-center">
                <Target className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                <p className="text-sm font-medium text-muted-foreground mb-1">Training Plan</p>
                <p className="text-lg font-bold text-foreground">{result.trainingPlan}</p>
                <p className="text-xs text-muted-foreground capitalize">{result.trainingPriority.replace('_', ' ')} priority</p>
              </CardContent>
            </Card>
          </div>

          {/* Training Table */}
          <Card className="rounded-3xl shadow-card border-border/50 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 border-b border-border/30">
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-primary/20">
                  <Dumbbell className="h-5 w-5 text-primary" />
                </div>
                Personalized Training Plan
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
                    {result.exercises.map((exercise, index) => (
                      <TableRow key={index} className="hover:bg-muted/30 transition-colors">
                        <TableCell className="font-medium">{exercise.day}</TableCell>
                        <TableCell>{exercise.name}</TableCell>
                        <TableCell className="text-primary font-medium">{exercise.setsReps}</TableCell>
                        <TableCell className="text-muted-foreground">{exercise.rest}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Meal Template */}
          <Card className="rounded-3xl shadow-card border-border/50 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-secondary/10 to-secondary/5 border-b border-border/30">
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-secondary/20">
                  <Utensils className="h-5 w-5 text-secondary" />
                </div>
                Nutritional Blueprint
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Meal Template Message */}
              <div className="p-4 rounded-2xl bg-muted/50 border border-border/30">
                <p className="text-sm font-medium">{result.mealTemplate}</p>
              </div>

              {/* Food Recommendations */}
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
                        Lean poultry with fiber-rich greens
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        Baked fish with vegetables
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        Grilled chicken with quinoa
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
                        Greek yogurt
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-secondary">•</span>
                        Fresh fruit
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* 12-Week Timeline */}
          <Card className="rounded-3xl shadow-card border-border/50 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-accent/10 to-accent/5 border-b border-border/30">
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-accent/20">
                  <Clock className="h-5 w-5 text-accent" />
                </div>
                {timeframe}-Week Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {result.timeline.map((phase, idx) => (
                  <div 
                    key={idx}
                    className="p-4 rounded-2xl bg-muted/50 border border-border/30 space-y-2"
                  >
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                      {phase.weeks}
                    </Badge>
                    <h4 className="font-display font-bold">{phase.phase}</h4>
                    <p className="text-sm text-muted-foreground">{phase.focus}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
