import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp } from "lucide-react";

const communityData = [
  { week: "Week 1", score: 45 },
  { week: "Week 2", score: 52 },
  { week: "Week 3", score: 58 },
  { week: "Week 4", score: 63 },
  { week: "Week 5", score: 68 },
  { week: "Week 6", score: 74 },
  { week: "Week 7", score: 79 },
  { week: "Week 8", score: 85 },
];

export function CommunityChart() {
  return (
    <Card className="shadow-card border-0 rounded-3xl overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-3 font-display">
          <div className="p-2 rounded-xl bg-primary/10">
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          Average Community Progress
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          See how our community improves over 8 weeks
        </p>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={communityData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="week" 
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                axisLine={{ stroke: "hsl(var(--border))" }}
                tickLine={{ stroke: "hsl(var(--border))" }}
              />
              <YAxis 
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                axisLine={{ stroke: "hsl(var(--border))" }}
                tickLine={{ stroke: "hsl(var(--border))" }}
                label={{ 
                  value: "Avg. Fitness Score", 
                  angle: -90, 
                  position: "insideLeft",
                  style: { fill: "hsl(var(--muted-foreground))", fontSize: 12 }
                }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "12px",
                  boxShadow: "var(--shadow-soft)"
                }}
                labelStyle={{ color: "hsl(var(--foreground))", fontWeight: 600 }}
                itemStyle={{ color: "hsl(var(--primary))" }}
              />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: "hsl(var(--primary))", stroke: "hsl(var(--card))", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
