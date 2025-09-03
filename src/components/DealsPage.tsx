import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  DollarSign, 
  Calendar,
  Smartphone,
  Building,
  User,
  Search,
  Filter,
  AlertTriangle
} from "lucide-react";

interface Deal {
  id: string;
  paymentMethod: {
    system: string;
    bank: string;
    phone: string;
    owner: string;
  };
  amount: {
    rub: number;
    usdt: number;
    rate: number;
  };
  reward: {
    percentage: number;
    amount: number;
  };
  createdAt: string;
  completedAt?: string;
  status: "completed" | "active" | "cancelled" | "frozen" | "dispute";
}

const mockDeals: Deal[] = [
  {
    id: "02e530a2-363d-4bcc-b7b2-ff1af21b534f",
    paymentMethod: {
      system: "SBP",
      bank: "Сбербанк",
      phone: "+7 (828) 880-88-80",
      owner: "Иван И."
    },
    amount: {
      rub: 5540,
      usdt: 68.32252176701282,
      rate: 81.086
    },
    reward: {
      percentage: 7.0,
      amount: 5.00
    },
    createdAt: "01.09.2025, 17:11:28 GMT+3",
    completedAt: "01.09.2025, 17:13:33 GMT+3",
    status: "completed"
  },
  {
    id: "1242dfc5-b79b-41b8-8890-b153b9fa0d5d",
    paymentMethod: {
      system: "C2C",
      bank: "Т-Банк",
      phone: "+7 (999) 123-45-67",
      owner: "Мария С."
    },
    amount: {
      rub: 10000,
      usdt: 123.45,
      rate: 81.0
    },
    reward: {
      percentage: 6.5,
      amount: 8.02
    },
    createdAt: "01.09.2025, 16:30:15 GMT+3",
    status: "active"
  },
  {
    id: "3242dfc5-b79b-41b8-8890-b153b9fa0d5e",
    paymentMethod: {
      system: "SBP",
      bank: "ВТБ",
      phone: "+7 (777) 888-99-00",
      owner: "Петр К."
    },
    amount: {
      rub: 15000,
      usdt: 185.19,
      rate: 81.0
    },
    reward: {
      percentage: 5.5,
      amount: 10.19
    },
    createdAt: "01.09.2025, 15:45:22 GMT+3",
    status: "dispute"
  }
];

const getStatusBadge = (status: Deal["status"]) => {
  switch (status) {
    case "completed":
      return <Badge className="bg-success text-success-foreground">Завершено</Badge>;
    case "active":
      return <Badge className="bg-primary text-primary-foreground">Активно</Badge>;
    case "cancelled":
      return <Badge variant="destructive">Отменено</Badge>;
    case "frozen":
      return <Badge className="bg-warning text-warning-foreground">Заморожено</Badge>;
    case "dispute":
      return <Badge className="bg-destructive/20 text-destructive border-destructive/20">Спор</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const DealCard = ({ deal, onApprove }: { deal: Deal; onApprove?: (id: string) => void }) => (
  <Card className="border shadow-premium hover:shadow-strong transition-all duration-300 bg-gradient-card">
    <CardHeader className="pb-3">
      <div className="flex items-center justify-between">
        <CardTitle className="text-sm font-mono">ID: {deal.id.substring(0, 8)}...</CardTitle>
        {getStatusBadge(deal.status)}
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">Реквизит</h4>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm">
              <Building className="h-3 w-3" />
              <span>Система: {deal.paymentMethod.system}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Building className="h-3 w-3" />
              <span>Банк: {deal.paymentMethod.bank}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Smartphone className="h-3 w-3" />
              <span>Телефон: {deal.paymentMethod.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <User className="h-3 w-3" />
              <span>Владелец: {deal.paymentMethod.owner}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">Сумма сделки</h4>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-success" />
              <span className="font-semibold">{deal.amount.rub.toLocaleString()} RUB</span>
            </div>
            <div className="text-sm text-muted-foreground">
              ≈ {deal.amount.usdt.toFixed(8)} USDT
            </div>
            <div className="text-sm text-muted-foreground">
              🔁 1 USDT = {deal.amount.rate} RUB
            </div>
          </div>
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-1">Награда трейдера</h4>
          <div className="text-sm">
            <span className="text-success font-semibold">{deal.reward.percentage}%</span> ваша доля → {deal.reward.amount} USDT
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-3 w-3" />
            <span>Создана в: {deal.createdAt}</span>
          </div>
          {deal.completedAt && (
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="h-3 w-3 text-success" />
              <span>Завершена в: {deal.completedAt}</span>
            </div>
          )}
        </div>
      </div>

      {deal.status === "active" && onApprove && (
        <>
          <Separator />
          <div className="flex justify-end">
            <Button 
              onClick={() => onApprove(deal.id)}
              className="bg-gradient-primary hover:opacity-90 transition-opacity"
            >
              Одобрить сделку
            </Button>
          </div>
        </>
      )}
    </CardContent>
  </Card>
);

export const DealsPage = () => {
  const [activeDealsTab, setActiveDealsTab] = useState("active");
  const [searchId, setSearchId] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");

  const handleApprove = (dealId: string) => {
    console.log("Approving deal:", dealId);
    // Implement approval logic here
  };

  const filteredDeals = mockDeals.filter(deal => {
    const matchesTab = (() => {
      switch (activeDealsTab) {
        case "active":
          return deal.status === "active" || deal.status === "frozen";
        case "completed":
          return deal.status === "completed";
        case "cancelled":
          return deal.status === "cancelled";
        case "disputes":
          return deal.status === "dispute";
        default:
          return true;
      }
    })();

    const matchesSearch = !searchId || deal.id.toLowerCase().includes(searchId.toLowerCase());
    const matchesMinAmount = !minAmount || deal.amount.rub >= parseFloat(minAmount);
    const matchesMaxAmount = !maxAmount || deal.amount.rub <= parseFloat(maxAmount);

    return matchesTab && matchesSearch && matchesMinAmount && matchesMaxAmount;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Сделки</h2>
        <p className="text-muted-foreground">Управление активными и завершенными сделками</p>
      </div>

      {/* Search and Filter Section */}
      <Card className="border shadow-premium bg-gradient-card">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Search className="h-5 w-5" />
            Поиск и фильтры
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search-id">Поиск по ID</Label>
              <Input
                id="search-id"
                placeholder="Введите ID сделки"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="min-amount">Мин. сумма (RUB)</Label>
              <Input
                id="min-amount"
                type="number"
                placeholder="0"
                value={minAmount}
                onChange={(e) => setMinAmount(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="max-amount">Макс. сумма (RUB)</Label>
              <Input
                id="max-amount"
                type="number"
                placeholder="1000000"
                value={maxAmount}
                onChange={(e) => setMaxAmount(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeDealsTab} onValueChange={setActiveDealsTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-card shadow-soft">
          <TabsTrigger value="active" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Clock className="h-4 w-4" />
            Активные
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-2 data-[state=active]:bg-success data-[state=active]:text-success-foreground">
            <CheckCircle className="h-4 w-4" />
            Завершенные
          </TabsTrigger>
          <TabsTrigger value="cancelled" className="flex items-center gap-2 data-[state=active]:bg-destructive data-[state=active]:text-destructive-foreground">
            <XCircle className="h-4 w-4" />
            Отмененные
          </TabsTrigger>
          <TabsTrigger value="disputes" className="flex items-center gap-2 data-[state=active]:bg-warning data-[state=active]:text-warning-foreground">
            <AlertTriangle className="h-4 w-4" />
            Споры
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeDealsTab} className="mt-6">
          <div className="space-y-4">
            {filteredDeals.length > 0 ? (
              filteredDeals.map((deal) => (
                <DealCard key={deal.id} deal={deal} onApprove={handleApprove} />
              ))
            ) : (
              <Card className="border-dashed shadow-soft">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <div className="text-muted-foreground text-center">
                    <p className="text-lg mb-2">Нет сделок</p>
                    <p className="text-sm">В данной категории пока нет сделок</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};