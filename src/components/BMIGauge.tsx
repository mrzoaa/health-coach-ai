import { cn } from "@/lib/utils";

interface BMIGaugeProps {
  bmi: number;
  category: string;
  colorClass: string;
}

export function BMIGauge({ bmi, category, colorClass }: BMIGaugeProps) {
  // Calculate position on gauge (BMI 15-40 range)
  const minBMI = 15;
  const maxBMI = 40;
  const clampedBMI = Math.min(Math.max(bmi, minBMI), maxBMI);
  const percentage = ((clampedBMI - minBMI) / (maxBMI - minBMI)) * 100;
  
  return (
    <div className="w-full animate-fade-in">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-muted-foreground">BMI Score</span>
        <span className={cn("text-3xl font-display font-bold", colorClass)}>
          {bmi}
        </span>
      </div>
      
      {/* Gauge bar */}
      <div className="relative h-3 rounded-full overflow-hidden bg-muted">
        {/* Gradient background showing BMI zones */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: "linear-gradient(to right, hsl(45 95% 55%), hsl(165 60% 45%), hsl(165 60% 45%), hsl(16 85% 60%), hsl(0 84% 60%))"
          }}
        />
        
        {/* Indicator */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-foreground rounded-full border-2 border-background shadow-lg transition-all duration-700 ease-out"
          style={{ left: `calc(${percentage}% - 8px)` }}
        />
      </div>
      
      {/* Labels */}
      <div className="flex justify-between mt-2 text-xs text-muted-foreground">
        <span>Underweight</span>
        <span>Normal</span>
        <span>Overweight</span>
        <span>Obese</span>
      </div>
      
      {/* Category badge */}
      <div className="mt-4 text-center">
        <span className={cn(
          "inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium",
          category === "Normal" && "bg-secondary/20 text-secondary",
          category === "Underweight" && "bg-accent/20 text-accent-foreground",
          category === "Overweight" && "bg-primary/20 text-primary",
          category === "Obese" && "bg-destructive/20 text-destructive"
        )}>
          {category}
        </span>
      </div>
    </div>
  );
}
