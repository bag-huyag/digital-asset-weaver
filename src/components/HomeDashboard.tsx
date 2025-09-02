import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Wallet, Snowflake } from "lucide-react";

export const HomeDashboard = () => {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card className="border shadow-soft hover:shadow-medium transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">ID пользователя</CardTitle>
          <User className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">afe5f24c-0613</div>
          <p className="text-xs text-muted-foreground">Ваш уникальный идентификатор</p>
        </CardContent>
      </Card>

      <Card className="border shadow-soft hover:shadow-medium transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Баланс</CardTitle>
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-success">2,133.5 USDT</div>
          <p className="text-xs text-muted-foreground">Доступные средства</p>
        </CardContent>
      </Card>

      <Card className="border shadow-soft hover:shadow-medium transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Замороженный баланс</CardTitle>
          <Snowflake className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-warning">0 USDT</div>
          <p className="text-xs text-muted-foreground">Заблокированные средства</p>
        </CardContent>
      </Card>
    </div>
  );
};