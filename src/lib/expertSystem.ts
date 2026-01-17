// ISP543 Rule-Based Fitness Expert System
// Forward-Chaining Inference Engine with 29 Production Rules

export interface UserInput {
  age: number;
  weight: number; // kg (Berat)
  height: number; // cm (Tinggi)
  gender: 'male' | 'female'; // Jantina
  trainingType: 'home' | 'gym' | 'cardio-focused';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active';
  goalBody: 'recomp' | 'fat-loss';
  timeframe: number; // weeks
  goalWeight: number; // kg
}

export interface RuleLog {
  ruleId: string;
  description: string;
  result: string;
}

export interface ExpertSystemResult {
  // Derived facts
  bmi: number;
  bmiCategory: 'underweight' | 'normal' | 'overweight' | 'obese';
  fatLossMode: 'disabled' | 'mild_deficit' | 'standard_deficit';
  deficit: number;
  activityFactor: number;
  tdee: number;
  dailyCalories: number;
  proteinMultiplier: number;
  proteinTarget: number;
  trainingPriority: 'recomp' | 'fat_burning' | 'joint_safe' | 'none';
  trainingPlan: string;
  mealTemplate: string;
  warnings: string[];
  
  // Logs
  ruleLogs: RuleLog[];
  
  // Training details
  exercises: Exercise[];
  
  // Timeline
  timeline: TimelinePhase[];
}

export interface Exercise {
  day: string;
  name: string;
  setsReps: string;
  rest: string;
}

export interface TimelinePhase {
  weeks: string;
  phase: string;
  focus: string;
}

// Calculate BMR using Mifflin-St Jeor Equation
function calculateBMR(weight: number, height: number, age: number, gender: 'male' | 'female'): number {
  if (gender === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
}

// Legacy functions for backward compatibility
export function calculateBMI(weight: number, height: number): number {
  const heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters);
}

export function getBMICategory(bmi: number): { category: string; color: string } {
  if (bmi < 18.5) return { category: "Underweight", color: "text-blue-500" };
  if (bmi < 25) return { category: "Normal", color: "text-green-500" };
  if (bmi < 30) return { category: "Overweight", color: "text-orange-500" };
  return { category: "Obese", color: "text-red-500" };
}

// Forward-Chaining Inference Engine
export function runExpertSystem(input: UserInput): ExpertSystemResult {
  const ruleLogs: RuleLog[] = [];
  const warnings: string[] = [];
  
  // Calculate BMI
  const heightM = input.height / 100;
  const bmi = input.weight / (heightM * heightM);
  
  // ========== A. BMI CATEGORY RULES (R1-R4) ==========
  let bmiCategory: 'underweight' | 'normal' | 'overweight' | 'obese';
  
  if (bmi < 18.5) {
    bmiCategory = 'underweight';
    ruleLogs.push({
      ruleId: 'R1',
      description: 'IF BMI < 18.5 THEN bmi_category = underweight',
      result: `BMI ${bmi.toFixed(1)} < 18.5 → Underweight`
    });
  } else if (bmi >= 18.5 && bmi < 25) {
    bmiCategory = 'normal';
    ruleLogs.push({
      ruleId: 'R2',
      description: 'IF BMI ≥ 18.5 AND BMI < 25 THEN bmi_category = normal',
      result: `BMI ${bmi.toFixed(1)} in range [18.5, 25) → Normal`
    });
  } else if (bmi >= 25 && bmi < 30) {
    bmiCategory = 'overweight';
    ruleLogs.push({
      ruleId: 'R3',
      description: 'IF BMI ≥ 25 AND BMI < 30 THEN bmi_category = overweight',
      result: `BMI ${bmi.toFixed(1)} in range [25, 30) → Overweight`
    });
  } else {
    bmiCategory = 'obese';
    ruleLogs.push({
      ruleId: 'R4',
      description: 'IF BMI ≥ 30 THEN bmi_category = obese',
      result: `BMI ${bmi.toFixed(1)} ≥ 30 → Obese`
    });
  }

  // ========== B. FAT-LOSS MODE RULES (R5-R8) ==========
  let fatLossMode: 'disabled' | 'mild_deficit' | 'standard_deficit';
  
  if (bmiCategory === 'underweight') {
    fatLossMode = 'disabled';
    ruleLogs.push({
      ruleId: 'R5',
      description: 'IF bmi_category = underweight THEN fat_loss_mode = disabled',
      result: 'Underweight → Fat loss disabled'
    });
  } else if (bmiCategory === 'normal') {
    fatLossMode = 'mild_deficit';
    ruleLogs.push({
      ruleId: 'R6',
      description: 'IF bmi_category = normal THEN fat_loss_mode = mild_deficit',
      result: 'Normal BMI → Mild deficit mode'
    });
  } else if (bmiCategory === 'overweight') {
    fatLossMode = 'standard_deficit';
    ruleLogs.push({
      ruleId: 'R7',
      description: 'IF bmi_category = overweight THEN fat_loss_mode = standard_deficit',
      result: 'Overweight → Standard deficit mode'
    });
  } else {
    fatLossMode = 'standard_deficit';
    ruleLogs.push({
      ruleId: 'R8',
      description: 'IF bmi_category = obese THEN fat_loss_mode = standard_deficit',
      result: 'Obese → Standard deficit mode'
    });
  }

  // ========== C. CALORIE DEFICIT RULES (R9-R10) ==========
  let deficit = 0;
  
  if (fatLossMode === 'mild_deficit') {
    deficit = 300;
    ruleLogs.push({
      ruleId: 'R9',
      description: 'IF fat_loss_mode = mild_deficit THEN deficit = 300',
      result: 'Mild deficit → 300 kcal deficit applied'
    });
  } else if (fatLossMode === 'standard_deficit') {
    deficit = 500;
    ruleLogs.push({
      ruleId: 'R10',
      description: 'IF fat_loss_mode = standard_deficit THEN deficit = 500',
      result: 'Standard deficit → 500 kcal deficit applied'
    });
  }

  // ========== D. ACTIVITY FACTOR RULES (R11-R14) ==========
  let activityFactor = 1.2;
  
  if (input.trainingType === 'home') {
    activityFactor = 1.375;
    ruleLogs.push({
      ruleId: 'R11',
      description: 'IF training_type = home THEN activity_factor = 1.375',
      result: 'Home training → Activity factor 1.375'
    });
  } else if (input.trainingType === 'gym') {
    activityFactor = 1.55;
    ruleLogs.push({
      ruleId: 'R12',
      description: 'IF training_type = gym THEN activity_factor = 1.55',
      result: 'Gym training → Activity factor 1.55'
    });
  } else if (input.trainingType === 'cardio-focused') {
    activityFactor = 1.55;
    ruleLogs.push({
      ruleId: 'R13',
      description: 'IF training_type = cardio-focused THEN activity_factor = 1.55',
      result: 'Cardio-focused → Activity factor 1.55'
    });
  }
  
  if (input.activityLevel === 'sedentary') {
    activityFactor = 1.2;
    ruleLogs.push({
      ruleId: 'R14',
      description: 'IF activity_level = sedentary THEN activity_factor = 1.2',
      result: 'Sedentary lifestyle → Activity factor 1.2 (override)'
    });
  }

  // ========== E. CALORIE TARGET RULES (R15-R17) ==========
  const bmr = calculateBMR(input.weight, input.height, input.age, input.gender);
  const tdee = bmr * activityFactor;
  let dailyCalories = tdee - deficit;
  
  ruleLogs.push({
    ruleId: 'R15',
    description: 'IF TDEE is known AND deficit is known THEN daily_calories = TDEE − deficit',
    result: `TDEE ${Math.round(tdee)} - ${deficit} = ${Math.round(dailyCalories)} kcal`
  });
  
  // Safety rules
  if (input.gender === 'female' && dailyCalories < 1200) {
    dailyCalories = 1200;
    ruleLogs.push({
      ruleId: 'R16',
      description: 'IF gender = female AND daily_calories < 1200 THEN daily_calories = 1200',
      result: 'Safety: Female minimum set to 1200 kcal'
    });
  }
  
  if (input.gender === 'male' && dailyCalories < 1500) {
    dailyCalories = 1500;
    ruleLogs.push({
      ruleId: 'R17',
      description: 'IF gender = male AND daily_calories < 1500 THEN daily_calories = 1500',
      result: 'Safety: Male minimum set to 1500 kcal'
    });
  }

  // ========== F. PROTEIN TARGET RULES (R18-R20) ==========
  let proteinMultiplier = 1.6;
  
  if (fatLossMode === 'mild_deficit') {
    proteinMultiplier = 1.6;
    ruleLogs.push({
      ruleId: 'R18',
      description: 'IF fat_loss_mode = mild_deficit THEN protein_multiplier = 1.6',
      result: 'Mild deficit → Protein multiplier 1.6g/kg'
    });
  } else if (fatLossMode === 'standard_deficit') {
    proteinMultiplier = 1.8;
    ruleLogs.push({
      ruleId: 'R19',
      description: 'IF fat_loss_mode = standard_deficit THEN protein_multiplier = 1.8',
      result: 'Standard deficit → Protein multiplier 1.8g/kg'
    });
  }
  
  const proteinTarget = input.weight * proteinMultiplier;
  ruleLogs.push({
    ruleId: 'R20',
    description: 'IF protein_multiplier is known THEN protein_target = weight × protein_multiplier',
    result: `${input.weight}kg × ${proteinMultiplier} = ${Math.round(proteinTarget)}g protein`
  });

  // ========== G. TRAINING PRIORITY RULES (R21-R23) ==========
  let trainingPriority: 'recomp' | 'fat_burning' | 'joint_safe' | 'none' = 'none';
  
  if (bmiCategory === 'normal') {
    trainingPriority = 'recomp';
    ruleLogs.push({
      ruleId: 'R21',
      description: 'IF bmi_category = normal THEN training_priority = recomp',
      result: 'Normal BMI → Recomposition priority'
    });
  } else if (bmiCategory === 'overweight') {
    trainingPriority = 'fat_burning';
    ruleLogs.push({
      ruleId: 'R22',
      description: 'IF bmi_category = overweight THEN training_priority = fat_burning',
      result: 'Overweight → Fat burning priority'
    });
  } else if (bmiCategory === 'obese') {
    trainingPriority = 'joint_safe';
    ruleLogs.push({
      ruleId: 'R23',
      description: 'IF bmi_category = obese THEN training_priority = joint_safe',
      result: 'Obese → Joint-safe priority'
    });
  }

  // ========== H. TRAINING PLAN RULES (R24-R26) ==========
  let trainingPlan = '';
  let exercises: Exercise[] = [];
  
  if (trainingPriority === 'recomp' && input.trainingType === 'gym') {
    trainingPlan = '3× strength + daily steps';
    ruleLogs.push({
      ruleId: 'R24',
      description: 'IF training_priority = recomp AND training_type = gym THEN training_plan = "3× strength + daily steps"',
      result: 'Recomp + Gym → Hybrid strength program'
    });
    exercises = generateRecompGymExercises();
  } else if (trainingPriority === 'fat_burning' && input.trainingType === 'gym') {
    trainingPlan = '3× strength + 2× cardio';
    ruleLogs.push({
      ruleId: 'R25',
      description: 'IF training_priority = fat_burning AND training_type = gym THEN training_plan = "3× strength + 2× cardio"',
      result: 'Fat burning + Gym → Intensity program'
    });
    exercises = generateFatBurningGymExercises();
  } else if (trainingPriority === 'joint_safe') {
    trainingPlan = 'low-impact cardio + basic strength';
    ruleLogs.push({
      ruleId: 'R26',
      description: 'IF training_priority = joint_safe THEN training_plan = "low-impact cardio + basic strength"',
      result: 'Joint-safe → Low-impact program'
    });
    exercises = generateJointSafeExercises();
  } else if (input.trainingType === 'home') {
    trainingPlan = 'Home bodyweight training';
    exercises = generateHomeExercises();
  } else if (input.trainingType === 'cardio-focused') {
    trainingPlan = 'Cardio-focused fat burning';
    exercises = generateCardioExercises();
  } else if (trainingPriority === 'recomp') {
    trainingPlan = '4× Hybrid (Weights + Cardio)';
    exercises = generateRecompGymExercises();
  } else if (trainingPriority === 'fat_burning') {
    trainingPlan = '5× Intensity Training';
    exercises = generateFatBurningGymExercises();
  }

  // ========== I. MEAL TEMPLATE RULES (R27) ==========
  const mealTemplate = `Your target is ${Math.round(proteinTarget)}g Protein. Example: 1 Palm of Chicken (30g) + 2 Fists Broccoli + 1 Cupped Hand Rice + 1 Thumb Fat.`;
  ruleLogs.push({
    ruleId: 'R27',
    description: 'IF protein_target is known THEN meal_template = "1 palm protein + 2 fists vegetables + 1 cupped-hand carbs + 1 thumb fat"',
    result: 'Generated personalized meal template'
  });

  // ========== J. WARNING RULES (R28-R29) ==========
  if (bmiCategory === 'underweight') {
    warnings.push('Fat loss not recommended for underweight individuals. Focus on building muscle mass instead.');
    ruleLogs.push({
      ruleId: 'R28',
      description: 'IF bmi_category = underweight THEN warning',
      result: 'Warning: Fat loss not recommended'
    });
  }
  
  const weeklyWeightLoss = (input.weight - input.goalWeight) / input.timeframe;
  if (weeklyWeightLoss > 1.0) {
    warnings.push(`Your goal of losing ${(input.weight - input.goalWeight).toFixed(1)}kg in ${input.timeframe} weeks (${weeklyWeightLoss.toFixed(2)}kg/week) is too aggressive. Aim for 0.5-1kg per week for sustainable results.`);
    ruleLogs.push({
      ruleId: 'R29',
      description: 'IF weekly_weight_loss > 1.0 THEN warning',
      result: `Warning: ${weeklyWeightLoss.toFixed(2)}kg/week is too aggressive`
    });
  }

  // Generate timeline
  const timeline = generateTimeline(input.timeframe);

  return {
    bmi,
    bmiCategory,
    fatLossMode,
    deficit,
    activityFactor,
    tdee,
    dailyCalories: Math.round(dailyCalories),
    proteinMultiplier,
    proteinTarget: Math.round(proteinTarget),
    trainingPriority,
    trainingPlan,
    mealTemplate,
    warnings,
    ruleLogs,
    exercises,
    timeline
  };
}

// Exercise generators based on training priority
function generateRecompGymExercises(): Exercise[] {
  return [
    { day: 'Monday', name: 'Squats', setsReps: '3 × 10', rest: '90s' },
    { day: 'Monday', name: 'Bench Press', setsReps: '3 × 10', rest: '90s' },
    { day: 'Monday', name: 'Pull-ups', setsReps: '3 × Max', rest: '90s' },
    { day: 'Monday', name: 'HIIT Cardio', setsReps: '15 mins', rest: '-' },
    { day: 'Wednesday', name: 'Deadlifts', setsReps: '3 × 8', rest: '120s' },
    { day: 'Wednesday', name: 'Overhead Press', setsReps: '3 × 10', rest: '90s' },
    { day: 'Wednesday', name: 'Barbell Rows', setsReps: '3 × 10', rest: '90s' },
    { day: 'Friday', name: 'Leg Press', setsReps: '3 × 12', rest: '60s' },
    { day: 'Friday', name: 'Dumbbell Flyes', setsReps: '3 × 12', rest: '60s' },
    { day: 'Friday', name: 'HIIT Cardio', setsReps: '15 mins', rest: '-' },
    { day: 'Daily', name: 'Walking', setsReps: '10,000 steps', rest: '-' }
  ];
}

function generateFatBurningGymExercises(): Exercise[] {
  return [
    { day: 'Monday', name: 'Deadlifts', setsReps: '3 × 8', rest: '90s' },
    { day: 'Monday', name: 'Kettlebell Swings', setsReps: '3 × 15', rest: '45s' },
    { day: 'Monday', name: 'Burpees', setsReps: '3 × 12', rest: '30s' },
    { day: 'Tuesday', name: 'LISS Cardio', setsReps: '45 mins', rest: '-' },
    { day: 'Wednesday', name: 'Squats', setsReps: '4 × 10', rest: '60s' },
    { day: 'Wednesday', name: 'Lunges', setsReps: '3 × 12 each', rest: '45s' },
    { day: 'Wednesday', name: 'Mountain Climbers', setsReps: '3 × 30s', rest: '30s' },
    { day: 'Thursday', name: 'LISS Cardio', setsReps: '45 mins', rest: '-' },
    { day: 'Friday', name: 'Full Body Circuit', setsReps: '4 rounds', rest: '60s' },
    { day: 'Friday', name: 'Core Work', setsReps: '3 × 15', rest: '30s' }
  ];
}

function generateJointSafeExercises(): Exercise[] {
  return [
    { day: 'Monday', name: 'Seated Leg Press', setsReps: '3 × 12', rest: '90s' },
    { day: 'Monday', name: 'Wall Pushups', setsReps: '3 × 15', rest: '60s' },
    { day: 'Monday', name: 'Seated Rows', setsReps: '3 × 12', rest: '60s' },
    { day: 'Wednesday', name: 'Incline Walking', setsReps: '20 mins', rest: '-' },
    { day: 'Wednesday', name: 'Swimming/Aqua Aerobics', setsReps: '30 mins', rest: '-' },
    { day: 'Friday', name: 'Recumbent Bike', setsReps: '25 mins', rest: '-' },
    { day: 'Friday', name: 'Resistance Band Work', setsReps: '3 × 15', rest: '60s' },
    { day: 'Friday', name: 'Chair Squats', setsReps: '3 × 10', rest: '90s' }
  ];
}

function generateHomeExercises(): Exercise[] {
  return [
    { day: 'Monday', name: 'Goblet Squats (Water Bottles)', setsReps: '3 × 15', rest: '60s' },
    { day: 'Monday', name: 'Floor Press', setsReps: '3 × 12', rest: '60s' },
    { day: 'Monday', name: 'Plank', setsReps: '3 × 45s', rest: '30s' },
    { day: 'Wednesday', name: 'Bodyweight Rows (Table)', setsReps: '3 × 12', rest: '60s' },
    { day: 'Wednesday', name: 'Lunges', setsReps: '3 × 10 each', rest: '45s' },
    { day: 'Wednesday', name: 'Push-ups', setsReps: '3 × Max', rest: '60s' },
    { day: 'Friday', name: 'Glute Bridges', setsReps: '3 × 15', rest: '45s' },
    { day: 'Friday', name: 'Tricep Dips (Chair)', setsReps: '3 × 12', rest: '45s' },
    { day: 'Friday', name: 'Mountain Climbers', setsReps: '3 × 30s', rest: '30s' }
  ];
}

function generateCardioExercises(): Exercise[] {
  return [
    { day: 'Monday', name: 'Interval Running', setsReps: '30 mins', rest: '-' },
    { day: 'Tuesday', name: 'Swimming', setsReps: '45 mins', rest: '-' },
    { day: 'Wednesday', name: 'Cycling', setsReps: '40 mins', rest: '-' },
    { day: 'Thursday', name: 'HIIT Session', setsReps: '25 mins', rest: '-' },
    { day: 'Friday', name: 'Rowing Machine', setsReps: '30 mins', rest: '-' },
    { day: 'Saturday', name: 'Long Walk/Hike', setsReps: '60+ mins', rest: '-' },
    { day: 'Sunday', name: 'Active Recovery', setsReps: 'Yoga/Stretching', rest: '-' }
  ];
}

function generateTimeline(weeks: number): TimelinePhase[] {
  const phases: TimelinePhase[] = [];
  
  if (weeks >= 4) {
    phases.push({
      weeks: 'Weeks 1-4',
      phase: 'Adaptation Phase',
      focus: 'Build habits, learn form, adjust to new routine. Focus on consistency over intensity.'
    });
  }
  
  if (weeks >= 8) {
    phases.push({
      weeks: 'Weeks 5-8',
      phase: 'Intensity Phase',
      focus: 'Increase weights/duration. Add progressive overload. Track and optimize nutrition.'
    });
  }
  
  if (weeks >= 12) {
    phases.push({
      weeks: 'Weeks 9-12',
      phase: 'Peak Performance',
      focus: 'Metabolic shift, maximum results. Fine-tune based on progress. Prepare for maintenance.'
    });
  }
  
  if (weeks < 4) {
    phases.push({
      weeks: `Weeks 1-${weeks}`,
      phase: 'Quick Start',
      focus: 'Intensive short-term program. Focus on building momentum and seeing early results.'
    });
  }
  
  return phases;
}

export function getBmiCategoryColor(category: string): string {
  switch (category) {
    case 'underweight': return 'text-blue-500';
    case 'normal': return 'text-green-500';
    case 'overweight': return 'text-orange-500';
    case 'obese': return 'text-red-500';
    default: return 'text-foreground';
  }
}

export function getBmiMotivation(category: string): { color: string; bgColor: string; message: string; title: string } {
  switch (category) {
    case 'underweight':
      return {
        color: 'text-blue-600',
        bgColor: 'bg-blue-500/10 border-blue-500/30',
        title: 'Foundation Builder',
        message: 'Focus on building a strong foundation. Your priority is gaining healthy muscle mass with nutrient-dense foods.'
      };
    case 'normal':
      return {
        color: 'text-green-600',
        bgColor: 'bg-green-500/10 border-green-500/30',
        title: 'Optimal Zone',
        message: 'Excellent balance! Focus on body recomposition - building lean muscle while maintaining your healthy weight.'
      };
    case 'overweight':
      return {
        color: 'text-orange-600',
        bgColor: 'bg-orange-500/10 border-orange-500/30',
        title: "The Warrior's Path",
        message: 'Your journey begins now! Focus on consistency and sustainable habits. Every workout counts toward your transformation.'
      };
    case 'obese':
      return {
        color: 'text-orange-600',
        bgColor: 'bg-orange-500/10 border-orange-500/30',
        title: 'Steady Progress',
        message: 'Start with joint-friendly exercises and build up gradually. Your body will thank you for the patience and consistency.'
      };
    default:
      return {
        color: 'text-muted-foreground',
        bgColor: 'bg-muted',
        title: 'Ready to Start',
        message: 'Enter your details to get personalized recommendations.'
      };
  }
}
