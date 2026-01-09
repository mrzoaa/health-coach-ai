export interface UserInput {
  age: number;
  weight: number;
  height: number;
  exercisePerWeek: number;
  exerciseType: string;
  intensity: string;
  goal: string;
}

export interface ExpertResult {
  bmi: number;
  bmiCategory: string;
  bmiColor: string;
  exerciseSuggestions: string[];
  dietRecommendations: string[];
  weeklyPlan: string[];
  endGoal: string;
  calorieTarget: number;
  proteinTarget: number;
}

export function calculateBMI(weight: number, height: number): number {
  const heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters);
}

export function getBMICategory(bmi: number): { category: string; color: string } {
  if (bmi < 18.5) return { category: "Underweight", color: "text-accent" };
  if (bmi < 25) return { category: "Normal", color: "text-secondary" };
  if (bmi < 30) return { category: "Overweight", color: "text-primary" };
  return { category: "Obese", color: "text-destructive" };
}

export function analyzeUser(input: UserInput): ExpertResult {
  const bmi = calculateBMI(input.weight, input.height);
  const { category: bmiCategory, color: bmiColor } = getBMICategory(bmi);
  
  // Calculate base metabolic rate (Mifflin-St Jeor)
  const bmr = 10 * input.weight + 6.25 * input.height - 5 * input.age + 5;
  
  // Activity multiplier
  const activityMultipliers: Record<string, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    intense: 1.725,
    extreme: 1.9
  };
  
  const multiplier = activityMultipliers[input.intensity] || 1.55;
  const maintenanceCalories = Math.round(bmr * multiplier);
  
  // Adjust calories based on goal
  let calorieTarget = maintenanceCalories;
  let endGoal = "";
  
  switch (input.goal) {
    case "lose":
      calorieTarget = maintenanceCalories - 500;
      endGoal = "Achieve sustainable weight loss of 0.5-1kg per week through a moderate calorie deficit and consistent exercise routine.";
      break;
    case "maintain":
      endGoal = "Maintain current weight and improve overall fitness, energy levels, and body composition.";
      break;
    case "gain":
      calorieTarget = maintenanceCalories + 300;
      endGoal = "Build lean muscle mass with a slight caloric surplus while minimizing fat gain through progressive resistance training.";
      break;
    case "muscle":
      calorieTarget = maintenanceCalories + 400;
      endGoal = "Maximize muscle hypertrophy with progressive overload training and optimal protein intake for muscle recovery and growth.";
      break;
  }
  
  // Protein target (1.6-2.2g per kg for active individuals)
  const proteinMultiplier = input.goal === "muscle" ? 2.2 : input.goal === "gain" ? 2.0 : 1.6;
  const proteinTarget = Math.round(input.weight * proteinMultiplier);
  
  // Exercise suggestions based on current type, intensity, and goal
  const exerciseSuggestions = generateExerciseSuggestions(input);
  const dietRecommendations = generateDietRecommendations(input, bmiCategory);
  const weeklyPlan = generateWeeklyPlan(input);
  
  return {
    bmi: Math.round(bmi * 10) / 10,
    bmiCategory,
    bmiColor,
    exerciseSuggestions,
    dietRecommendations,
    weeklyPlan,
    endGoal,
    calorieTarget,
    proteinTarget
  };
}

function generateExerciseSuggestions(input: UserInput): string[] {
  const suggestions: string[] = [];
  
  if (input.goal === "lose" || input.goal === "maintain") {
    suggestions.push("Add 20-30 minutes of moderate cardio 3-4 times per week");
    suggestions.push("Include HIIT sessions for efficient calorie burn");
    if (input.exerciseType !== "strength") {
      suggestions.push("Add 2 strength training sessions to preserve muscle mass");
    }
  }
  
  if (input.goal === "gain" || input.goal === "muscle") {
    suggestions.push("Focus on compound movements: squats, deadlifts, bench press");
    suggestions.push("Progressive overload: increase weight or reps weekly");
    suggestions.push("Allow 48 hours recovery between training same muscle groups");
    if (input.intensity === "light" || input.intensity === "moderate") {
      suggestions.push("Gradually increase training intensity over 4 weeks");
    }
  }
  
  if (input.exercisePerWeek < 3) {
    suggestions.push("Aim to increase workout frequency to at least 3 days per week");
  }
  
  if (input.age > 40) {
    suggestions.push("Include mobility and flexibility work to prevent injuries");
    suggestions.push("Warm up thoroughly before intense exercise");
  }
  
  return suggestions.slice(0, 5);
}

function generateDietRecommendations(input: UserInput, bmiCategory: string): string[] {
  const recommendations: string[] = [];
  
  recommendations.push("Drink at least 2-3 liters of water daily");
  recommendations.push("Eat protein with every meal for satiety and muscle support");
  
  if (input.goal === "lose") {
    recommendations.push("Focus on high-volume, low-calorie foods like vegetables");
    recommendations.push("Limit processed foods and added sugars");
    recommendations.push("Track your food intake to stay within calorie goals");
  }
  
  if (input.goal === "gain" || input.goal === "muscle") {
    recommendations.push("Eat calorie-dense foods: nuts, avocados, whole grains");
    recommendations.push("Have a protein shake post-workout for recovery");
    recommendations.push("Eat 4-5 smaller meals throughout the day");
  }
  
  if (bmiCategory === "Underweight") {
    recommendations.push("Increase healthy fat intake from olive oil, nuts, seeds");
  }
  
  if (input.intensity === "intense" || input.intensity === "extreme") {
    recommendations.push("Consider adding electrolytes during long workouts");
  }
  
  return recommendations.slice(0, 5);
}

function generateWeeklyPlan(input: UserInput): string[] {
  const plan: string[] = [];
  
  if (input.goal === "muscle" || input.goal === "gain") {
    plan.push("Monday: Upper Body Push (Chest, Shoulders, Triceps)");
    plan.push("Tuesday: Lower Body (Quads, Hamstrings, Glutes)");
    plan.push("Wednesday: Active Recovery / Light Cardio");
    plan.push("Thursday: Upper Body Pull (Back, Biceps)");
    plan.push("Friday: Lower Body + Core");
    plan.push("Saturday: Full Body or Weak Points");
    plan.push("Sunday: Rest Day");
  } else if (input.goal === "lose") {
    plan.push("Monday: Full Body Strength Training");
    plan.push("Tuesday: 30-min HIIT Cardio");
    plan.push("Wednesday: Active Recovery / Walking");
    plan.push("Thursday: Full Body Strength Training");
    plan.push("Friday: 30-min Steady State Cardio");
    plan.push("Saturday: Outdoor Activity / Sports");
    plan.push("Sunday: Rest or Light Yoga");
  } else {
    plan.push("Monday: Upper Body Strength");
    plan.push("Tuesday: Cardio / HIIT");
    plan.push("Wednesday: Lower Body Strength");
    plan.push("Thursday: Rest or Light Activity");
    plan.push("Friday: Full Body Circuit");
    plan.push("Saturday: Cardio or Recreational Sports");
    plan.push("Sunday: Rest Day");
  }
  
  return plan;
}
