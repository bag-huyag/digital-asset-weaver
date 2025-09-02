import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  CheckCircle, 
  XCircle, 
  DollarSign, 
  TrendingUp,
  Activity,
  Target
} from "lucide-react";

interface StatisticsData {
  successfulDeals: number;
  processedRequests: number;
  cancelledDeals: number;
  rejectedRequests: number;
  cryptoProcessed: number;
  fiatProcessed: number;
  successfulRequests: number;
  cryptoCancelled: number;
  fiatCancelled: number;
  rejectedRequests2: number;
  cryptoProfit: number;
  netProfit: number;
  totalDeals: number;
  periodTotal: number;
}

const mockStatistics: StatisticsData = {
  successfulDeals: 0,
  processedRequests: 0,
  cancelledDeals: 0,
  rejectedRequests: 0,
  cryptoProcessed: 0,
  fiatProcessed: 0,
  successfulRequests: 0,
  cryptoCancelled: 0,
  fiatCancelled: 0,
  rejectedRequests2: 0,
  cryptoProfit: 0,
  netProfit: 0,
  totalDeals: 0,
  periodTotal: 0
};

const StatCard = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  valueColor = "text-foreground",
  currency = "",
  isProfit = false 
}: {
  title: string;
  value: number | string;
  subtitle: string;
  icon: React.ElementType;
  valueColor?: string;
  currency?: string;
  isProfit?: boolean;
}) => (
  <Card className="border shadow-soft hover:shadow-medium transition-shadow">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className={`text-2xl font-bold ${valueColor}`}>
        {isProfit && typeof value === "number" && value >= 0 ? "+" : ""}
        {typeof value === "number" ? value.toLocaleString() : value} {currency}
      </div>
      <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
    </CardContent>
  </Card>
);

export const StatisticsPage = () => {
  const [dateFrom, setDateFrom] = useState("01.09.2025");
  const [dateTo, setDateTo] = useState("02.09.2025");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Статистика</h2>
        <p className="text-muted-foreground">Анализ торговой деятельности</p>
      </div>

      <Card className="border shadow-soft">
        <CardHeader>
          <CardTitle className="text-lg">Период анализа</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-end">
            <div className="space-y-2">
              <Label htmlFor="date-from">С</Label>
              <Input
                id="date-from"
                type="text"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="w-32"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date-to">По</Label>
              <Input
                id="date-to"
                type="text"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="w-32"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Успешных сделок"
          value={mockStatistics.successfulDeals}
          subtitle="Обработано заявок"
          icon={CheckCircle}
          valueColor="text-success"
        />
        
        <StatCard
          title="Отменённых сделок"
          value={mockStatistics.cancelledDeals}
          subtitle="Отклонено заявок"
          icon={XCircle}
          valueColor="text-destructive"
        />

        <StatCard
          title="Сумма в крипте (обработано)"
          value={mockStatistics.cryptoProcessed}
          subtitle="Успешные заявки"
          icon={DollarSign}
          currency="USD"
          valueColor="text-success"
        />

        <StatCard
          title="Сумма в фиате (обработано)"
          value={mockStatistics.fiatProcessed}
          subtitle="Успешные заявки"
          icon={DollarSign}
          currency="₽"
          valueColor="text-success"
        />

        <StatCard
          title="Сумма в крипте (отмена)"
          value={mockStatistics.cryptoCancelled}
          subtitle="Отклонённые заявки"
          icon={DollarSign}
          currency="USD"
          valueColor="text-destructive"
        />

        <StatCard
          title="Сумма в фиате (отмена)"
          value={mockStatistics.fiatCancelled}
          subtitle="Отклонённые заявки"
          icon={DollarSign}
          currency="₽"
          valueColor="text-destructive"
        />

        <StatCard
          title="Прибыль в крипте"
          value={mockStatistics.cryptoProfit}
          subtitle="Чистая прибыль"
          icon={TrendingUp}
          currency="USD"
          valueColor="text-success"
          isProfit={true}
        />

        <StatCard
          title="Всего сделок"
          value={mockStatistics.totalDeals}
          subtitle="За период"
          icon={Activity}
          valueColor="text-primary"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Обработанные операции
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Успешные сделки</span>
                <span className="font-semibold text-success">{mockStatistics.successfulDeals}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Криптовалюта</span>
                <span className="font-semibold">{mockStatistics.cryptoProcessed} USD</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Фиатные средства</span>
                <span className="font-semibold">{mockStatistics.fiatProcessed} ₽</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <XCircle className="h-5 w-5 text-destructive" />
              Отклоненные операции
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Отменённые сделки</span>
                <span className="font-semibold text-destructive">{mockStatistics.cancelledDeals}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Криптовалюта</span>
                <span className="font-semibold">{mockStatistics.cryptoCancelled} USD</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Фиатные средства</span>
                <span className="font-semibold">{mockStatistics.fiatCancelled} ₽</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};