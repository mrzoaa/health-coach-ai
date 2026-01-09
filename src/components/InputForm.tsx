import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { UserInput } from "@/lib/expertSystem";
import { Activity, Target, Flame, Ruler, Weight, Calendar, Zap } from "lucide-react";

interface InputFormProps {
  onSubmit: (data: UserInput) => void;
}

export function InputForm({ onSubmit }: InputFormProps) {
  const [age, setAge] = useState<number>(25);
  const [weight, setWeight] = useState<number>(70);
  const [height, setHeight] = useState<number>(170);
  const [exercisePerWeek, setExercisePerWeek] = useState<number>(3);
  const [exerciseType, setExerciseType] = useState<string>("");
  const [intensity, setIntensity] = useState<string>("");
  const [goal, setGoal] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!exerciseType || !intensity || !goal) return;
    
    onSubmit({
      age,
      weight,
      height,
      exercisePerWeek,
      exerciseType,
      intensity,
      goal
    });
  };

  const isFormValid = exerciseType && intensity && goal;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Physical Stats */}
      <div className="grid gap-6 sm:grid-cols-3">
        <Card className="shadow-card border-0">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="h-4 w-4 text-primary" />
              <Label htmlFor="age" className="font-medium">Age</Label>
            </div>
            <div className="flex items-center gap-4">
              <Slider
                value={[age]}
                onValueChange={(v) => setAge(v[0])}
                min={16}
                max={80}
                step={1}
                className="flex-1"
              />
              <span className="w-12 text-right font-display font-bold text-lg">{age}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card border-0">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-4">
              <Weight className="h-4 w-4 text-primary" />
              <Label htmlFor="weight" className="font-medium">Weight (kg)</Label>
            </div>
            <Input
              id="weight"
              type="number"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              min={30}
              max={200}
              className="text-lg font-display font-bold"
            />
          </CardContent>
        </Card>

        <Card className="shadow-card border-0">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-4">
              <Ruler className="h-4 w-4 text-primary" />
              <Label htmlFor="height" className="font-medium">Height (cm)</Label>
            </div>
            <Input
              id="height"
              type="number"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              min={100}
              max={250}
              className="text-lg font-display font-bold"
            />
          </CardContent>
        </Card>
      </div>

      {/* Exercise Frequency */}
      <Card className="shadow-card border-0">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="h-4 w-4 text-secondary" />
            <Label className="font-medium">Exercise per Week</Label>
          </div>
          <div className="flex items-center gap-4">
            <Slider
              value={[exercisePerWeek]}
              onValueChange={(v) => setExercisePerWeek(v[0])}
              min={0}
              max={7}
              step={1}
              className="flex-1"
            />
            <span className="w-24 text-right">
              <span className="font-display font-bold text-lg">{exercisePerWeek}</span>
              <span className="text-muted-foreground text-sm ml-1">days</span>
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Selects */}
      <div className="grid gap-6 sm:grid-cols-3">
        <Card className="shadow-card border-0">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-4">
              <Flame className="h-4 w-4 text-primary" />
              <Label className="font-medium">Exercise Type</Label>
            </div>
            <Select value={exerciseType} onValueChange={setExerciseType}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cardio">Cardio (Running, Cycling)</SelectItem>
                <SelectItem value="strength">Strength Training</SelectItem>
                <SelectItem value="hiit">HIIT / CrossFit</SelectItem>
                <SelectItem value="sports">Sports / Recreation</SelectItem>
                <SelectItem value="yoga">Yoga / Pilates</SelectItem>
                <SelectItem value="mixed">Mixed / Various</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card className="shadow-card border-0">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="h-4 w-4 text-accent" />
              <Label className="font-medium">Intensity Level</Label>
            </div>
            <Select value={intensity} onValueChange={setIntensity}>
              <SelectTrigger>
                <SelectValue placeholder="Select intensity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sedentary">Sedentary (Little to no exercise)</SelectItem>
                <SelectItem value="light">Light (1-2 days/week)</SelectItem>
                <SelectItem value="moderate">Moderate (3-4 days/week)</SelectItem>
                <SelectItem value="intense">Intense (5-6 days/week)</SelectItem>
                <SelectItem value="extreme">Extreme (Athlete level)</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card className="shadow-card border-0">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-4">
              <Target className="h-4 w-4 text-secondary" />
              <Label className="font-medium">Your Goal</Label>
            </div>
            <Select value={goal} onValueChange={setGoal}>
              <SelectTrigger>
                <SelectValue placeholder="Select goal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lose">Lose Weight</SelectItem>
                <SelectItem value="maintain">Maintain Weight</SelectItem>
                <SelectItem value="gain">Gain Weight</SelectItem>
                <SelectItem value="muscle">Build Muscle</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>

      <Button 
        type="submit" 
        variant="gradient" 
        size="xl" 
        className="w-full"
        disabled={!isFormValid}
      >
        Get My Personalized Plan
      </Button>
    </form>
  );
}
