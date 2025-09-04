import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, Wallet, Snowflake } from "lucide-react";

export const HomeDashboard = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Most important - Balance */}
      <Card className="border shadow-premium hover:shadow-strong transition-all duration-300 bg-gradient-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Баланс</CardTitle>
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-success">2,133.5 USDT</div>
          <p className="text-xs text-muted-foreground">Доступные средства</p>
        </CardContent>
      </Card>

      {/* Second most important - Insurance Limit */}
      <Card className="border shadow-premium hover:shadow-strong transition-all duration-300 bg-gradient-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Страховой лимит</CardTitle>
          <Shield className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-primary">50,000 USDT</div>
              <p className="text-xs text-muted-foreground">Максимальная страховая защита</p>
            </div>
            <Badge variant="outline" className="bg-success/10 text-success border-success/20">
              Активен
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Third - Frozen Balance */}
      <Card className="border shadow-premium hover:shadow-strong transition-all duration-300 bg-gradient-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Замороженный баланс</CardTitle>
          <Snowflake className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-warning">0 USDT</div>
          <p className="text-xs text-muted-foreground">Заблокированные средства</p>
        </CardContent>
      </Card>

      {/* Fourth - Team */}
      <Card className="border shadow-premium hover:shadow-strong transition-all duration-300 bg-gradient-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Команда</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold bg-gradient-premium bg-clip-text text-transparent">Premium Team</div>
          <p className="text-xs text-muted-foreground">Ваша рабочая команда</p>
        </CardContent>
      </Card>
    </div>
  );
};