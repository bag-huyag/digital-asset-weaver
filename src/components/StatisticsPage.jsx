import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  XCircle,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  Users,
  Award
} from "lucide-react";

const mockStatistics = {
  successfulDeals: 1247,
  cancelledDeals: 89,
  successfulRequests: 2156,
  cancelledRequests: 234,
  processedCrypto: 156789.45,
  processedFiat: 12567890.50,
  profit: 234567.89,
  profitPercent: 12.5
};

function StatCard({ title, value, subtitle, icon: Icon, valueColor = "text-premium-primary", currency = "" }) {
  return (
    <Card className="border shadow-premium bg-gradient-card hover:shadow-glow transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-premium-primary" />
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${valueColor} bg-gradient-text bg-clip-text text-transparent`}>
          {typeof value === 'number' ? value.toLocaleString('ru-RU') : value}{currency}
        </div>
        {subtitle && (
          <p className="text-xs text-muted-foreground">
            {subtitle}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export const StatisticsPage = () => {
  const [dateFrom, setDateFrom] = useState("2024-09-01");
  const [dateTo, setDateTo] = useState("2024-09-30");

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold bg-gradient-text bg-clip-text text-transparent">
          Статистика и аналитика
        </h2>
        <p className="text-muted-foreground">
          Подробная статистика по операциям и доходности
        </p>
      </div>

      <Card className="border shadow-premium bg-gradient-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-premium-primary" />
            <span>Период анализа</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date-from">Дата начала</Label>
              <Input
                id="date-from"
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="bg-background/50 border-premium-border focus:border-premium-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date-to">Дата окончания</Label>
              <Input
                id="date-to"
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="bg-background/50 border-premium-border focus:border-premium-primary"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Успешных сделок"
          value={mockStatistics.successfulDeals}
          subtitle="+15.2% к предыдущему периоду"
          icon={CheckCircle}
          valueColor="text-green-600"
        />
        
        <StatCard
          title="Отменённых сделок"
          value={mockStatistics.cancelledDeals}
          subtitle="-8.3% к предыдущему периоду"
          icon={XCircle}
          valueColor="text-red-600"
        />
        
        <StatCard
          title="Обработано в криптовалюте"
          value={mockStatistics.processedCrypto}
          subtitle="BTC, ETH, USDT"
          icon={DollarSign}
          currency=" USD"
        />
        
        <StatCard
          title="Обработано в фиате"
          value={mockStatistics.processedFiat}
          subtitle="RUB, USD, EUR"
          icon={DollarSign}
          currency=" ₽"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StatCard
          title="Прибыль за период"
          value={mockStatistics.profit}
          subtitle={`+${mockStatistics.profitPercent}% к предыдущему периоду`}
          icon={TrendingUp}
          valueColor="text-green-600"
          currency=" ₽"
        />
        
        <StatCard
          title="Успешных запросов"
          value={mockStatistics.successfulRequests}
          subtitle="API и пользовательские запросы"
          icon={Award}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border shadow-premium bg-gradient-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span>Обработанные операции</span>
            </CardTitle>
            <CardDescription>Статистика успешно завершённых операций</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Сделки</span>
              <div className="flex items-center space-x-2">
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  {mockStatistics.successfulDeals}
                </Badge>
                <span className="text-sm font-medium">успешных</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Запросы</span>
              <div className="flex items-center space-x-2">
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  {mockStatistics.successfulRequests}
                </Badge>
                <span className="text-sm font-medium">обработано</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Объём в криптовалюте</span>
              <span className="text-sm font-medium">${mockStatistics.processedCrypto.toLocaleString('ru-RU')}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Объём в фиате</span>
              <span className="text-sm font-medium">₽{mockStatistics.processedFiat.toLocaleString('ru-RU')}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-premium bg-gradient-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center space-x-2">
              <TrendingDown className="h-5 w-5 text-red-600" />
              <span>Отклонённые операции</span>
            </CardTitle>
            <CardDescription>Статистика неуспешных или отменённых операций</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Отменённые сделки</span>
              <div className="flex items-center space-x-2">
                <Badge variant="destructive" className="bg-red-100 text-red-800 border-red-200">
                  {mockStatistics.cancelledDeals}
                </Badge>
                <span className="text-sm font-medium">отменено</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Неуспешные запросы</span>
              <div className="flex items-center space-x-2">
                <Badge variant="destructive" className="bg-red-100 text-red-800 border-red-200">
                  {mockStatistics.cancelledRequests}
                </Badge>
                <span className="text-sm font-medium">отклонено</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Коэффициент успеха</span>
              <span className="text-sm font-medium text-green-600">
                {((mockStatistics.successfulDeals / (mockStatistics.successfulDeals + mockStatistics.cancelledDeals)) * 100).toFixed(1)}%
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Среднее время обработки</span>
              <span className="text-sm font-medium">2.3 мин</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border shadow-premium bg-gradient-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center space-x-2">
            <Users className="h-5 w-5 text-premium-primary" />
            <span>Детальная аналитика</span>
          </CardTitle>
          <CardDescription>Расширенные метрики производительности</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2 text-center">
              <div className="text-2xl font-bold bg-gradient-text bg-clip-text text-transparent">
                93.4%
              </div>
              <p className="text-sm text-muted-foreground">Коэффициент успешности</p>
            </div>
            
            <div className="space-y-2 text-center">
              <div className="text-2xl font-bold text-premium-primary">
                2.3 мин
              </div>
              <p className="text-sm text-muted-foreground">Среднее время сделки</p>
            </div>
            
            <div className="space-y-2 text-center">
              <div className="text-2xl font-bold text-green-600">
                ₽{mockStatistics.profit.toLocaleString('ru-RU')}
              </div>
              <p className="text-sm text-muted-foreground">Чистая прибыль</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};