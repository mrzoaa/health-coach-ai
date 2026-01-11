import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppLayout } from "@/components/AppLayout";
import { Sparkles, Quote, Heart, Trophy, Flame } from "lucide-react";

interface MotivationCardProps {
  title: string;
  message: string;
  borderColor: string;
  bgColor: string;
  icon: React.ElementType;
  iconColor: string;
  glowing?: boolean;
}

function MotivationCard({ title, message, borderColor, bgColor, icon: Icon, iconColor, glowing }: MotivationCardProps) {
  return (
    <Card 
      className={`shadow-card border-2 rounded-3xl overflow-hidden transition-all duration-300 hover:scale-[1.02] ${borderColor} ${bgColor} ${glowing ? "animate-pulse-soft" : ""}`}
      style={glowing ? { boxShadow: "0 0 30px -5px hsl(var(--secondary) / 0.4)" } : {}}
    >
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3 font-display">
          <div className={`p-3 rounded-2xl ${iconColor}`}>
            <Icon className="h-6 w-6" />
          </div>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-3">
          <Quote className="h-8 w-8 text-muted-foreground/30 shrink-0" />
          <p className="text-lg leading-relaxed text-foreground/90 italic">
            {message}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Motivation() {
  return (
    <AppLayout>
      <div className="p-6 md:p-8 lg:p-12">
        {/* Header */}
        <div className="mb-10 animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-2xl gradient-primary">
              <Sparkles className="h-7 w-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold">Motivation Center</h1>
              <p className="text-muted-foreground">Find your daily inspiration</p>
            </div>
          </div>
        </div>

        {/* Motivation Cards Grid */}
        <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {/* Underweight Section */}
          <div className="space-y-4 animate-fade-in" style={{ animationDelay: "100ms" }}>
            <h2 className="text-lg font-display font-semibold text-muted-foreground flex items-center gap-2">
              <Heart className="h-5 w-5 text-accent" />
              For Building Up
            </h2>
            <MotivationCard
              title="Building Your Foundation"
              message="Building a stronger foundation brick by brick. Every meal, every workout, every good night's sleep is a step toward the powerful you that's waiting to emerge. Small gains compound into remarkable transformations."
              borderColor="border-accent"
              bgColor="bg-accent/5"
              icon={Heart}
              iconColor="bg-accent/20 text-accent"
            />
          </div>

          {/* Overweight Section */}
          <div className="space-y-4 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <h2 className="text-lg font-display font-semibold text-muted-foreground flex items-center gap-2">
              <Flame className="h-5 w-5 text-primary" />
              For the Journey
            </h2>
            <MotivationCard
              title="The Marathon of Health"
              message="The marathon of health rewards consistency over speed. Every step forward, no matter how small, is a victory. The power of persistence will transform not just your body, but your entire relationship with yourself."
              borderColor="border-primary"
              bgColor="bg-primary/5"
              icon={Flame}
              iconColor="bg-primary/20 text-primary"
            />
          </div>

          {/* Normal Weight Section */}
          <div className="space-y-4 animate-fade-in" style={{ animationDelay: "300ms" }}>
            <h2 className="text-lg font-display font-semibold text-muted-foreground flex items-center gap-2">
              <Trophy className="h-5 w-5 text-secondary" />
              Status: Balanced
            </h2>
            <MotivationCard
              title="Champion of Balance"
              message="You have achieved a fantastic balance! Your dedication to maintenance is inspiring—keep leading the way! Your consistency proves that excellence isn't a destination, it's a daily choice."
              borderColor="border-secondary"
              bgColor="bg-secondary/5"
              icon={Trophy}
              iconColor="bg-secondary/20 text-secondary"
              glowing
            />
          </div>
        </div>

        {/* Additional Inspiration Section */}
        <div className="mt-12 animate-fade-in" style={{ animationDelay: "400ms" }}>
          <Card className="shadow-card border-0 rounded-3xl overflow-hidden gradient-primary text-primary-foreground">
            <CardContent className="py-8 px-6 md:px-10">
              <div className="max-w-2xl mx-auto text-center">
                <Sparkles className="h-10 w-10 mx-auto mb-4 opacity-90" />
                <h3 className="text-2xl font-display font-bold mb-3">Your Journey, Your Story</h3>
                <p className="text-lg opacity-90 leading-relaxed">
                  Remember: Every champion was once a beginner. Your fitness journey is unique, 
                  and every step you take is writing your own success story. 
                  The best time to start was yesterday. The second best time is now.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
