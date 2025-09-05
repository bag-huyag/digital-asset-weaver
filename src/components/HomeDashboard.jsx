import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wallet, Shield, Snowflake, Users } from "lucide-react";

export const HomeDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Команда */}
        <Card className="border shadow-premium bg-gradient-card hover:shadow-glow transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Команда</CardTitle>
            <Users className="h-4 w-4 text-premium-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold bg-gradient-text bg-clip-text text-transparent">
              Phoenix Team
            </div>
            <p className="text-xs text-muted-foreground">
              Активных участников: 12
            </p>
          </CardContent>
        </Card>

        {/* Баланс */}
        <Card className="border shadow-premium bg-gradient-card hover:shadow-glow transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Баланс</CardTitle>
            <Wallet className="h-4 w-4 text-premium-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold bg-gradient-text bg-clip-text text-transparent">
              ₽234,567.89
            </div>
            <p className="text-xs text-muted-foreground">
              +20.1% с прошлого месяца
            </p>
          </CardContent>
        </Card>

        {/* Страховой лимит */}
        <Card className="border shadow-premium bg-gradient-card hover:shadow-glow transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Страховой лимит</CardTitle>
            <Shield className="h-4 w-4 text-premium-primary" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold bg-gradient-text bg-clip-text text-transparent">
                ₽1,000,000
              </div>
              <Badge className="bg-premium-primary/10 text-premium-primary border-premium-primary/20 hover:bg-premium-primary/20 transition-colors">
                Активен
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Покрытие до 95%
            </p>
          </CardContent>
        </Card>

        {/* Замороженный баланс */}
        <Card className="border shadow-premium bg-gradient-card hover:shadow-glow transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Замороженный баланс</CardTitle>
            <Snowflake className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">
              ₽45,230.12
            </div>
            <p className="text-xs text-muted-foreground">
              В обработке: 3 сделки
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};