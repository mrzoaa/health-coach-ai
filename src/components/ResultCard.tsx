import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface ResultCardProps {
  title: string;
  icon: LucideIcon;
  items: string[];
  variant?: "default" | "primary" | "secondary";
  delay?: number;
}

export function ResultCard({ title, icon: Icon, items, variant = "default", delay = 0 }: ResultCardProps) {
  return (
    <Card 
      className={cn(
        "shadow-card border-0 overflow-hidden animate-slide-up",
        variant === "primary" && "bg-primary/5 border-l-4 border-l-primary",
        variant === "secondary" && "bg-secondary/5 border-l-4 border-l-secondary"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3 text-lg font-display">
          <div className={cn(
            "p-2 rounded-lg",
            variant === "primary" && "bg-primary/10",
            variant === "secondary" && "bg-secondary/10",
            variant === "default" && "bg-muted"
          )}>
            <Icon className={cn(
              "h-5 w-5",
              variant === "primary" && "text-primary",
              variant === "secondary" && "text-secondary",
              variant === "default" && "text-foreground"
            )} />
          </div>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li 
              key={index} 
              className="flex items-start gap-3 text-sm text-muted-foreground"
            >
              <span className={cn(
                "mt-1.5 h-1.5 w-1.5 rounded-full shrink-0",
                variant === "primary" && "bg-primary",
                variant === "secondary" && "bg-secondary",
                variant === "default" && "bg-foreground/40"
              )} />
              {item}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
