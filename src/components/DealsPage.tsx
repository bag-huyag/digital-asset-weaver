import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  Search,
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

const DealsTable = ({ deals, onApprove }: { deals: Deal[]; onApprove?: (id: string) => void }) => (
  <Card className="border shadow-premium bg-gradient-card">
    <CardContent className="p-0">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Реквизит</TableHead>
            <TableHead>Сумма сделки</TableHead>
            <TableHead>Награда трейдера</TableHead>
            <TableHead>Создана в</TableHead>
            <TableHead>Завершена в</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead>Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deals.map((deal) => (
            <TableRow key={deal.id}>
              <TableCell className="font-mono text-xs">{deal.id.substring(0, 8)}...</TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="text-sm font-medium">{deal.paymentMethod.system} - {deal.paymentMethod.bank}</div>
                  <div className="text-xs text-muted-foreground">{deal.paymentMethod.phone}</div>
                  <div className="text-xs text-muted-foreground">{deal.paymentMethod.owner}</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="font-semibold">{deal.amount.rub.toLocaleString()} RUB</div>
                  <div className="text-xs text-muted-foreground">≈ {deal.amount.usdt.toFixed(2)} USDT</div>
                  <div className="text-xs text-muted-foreground">Rate: {deal.amount.rate}</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  <span className="text-success font-semibold">{deal.reward.percentage}%</span>
                  <div className="text-xs text-muted-foreground">{deal.reward.amount} USDT</div>
                </div>
              </TableCell>
              <TableCell className="text-sm">{deal.createdAt}</TableCell>
              <TableCell className="text-sm">{deal.completedAt || "—"}</TableCell>
              <TableCell>{getStatusBadge(deal.status)}</TableCell>
              <TableCell>
                {deal.status === "active" && onApprove && (
                  <Button 
                    size="sm"
                    onClick={() => onApprove(deal.id)}
                    className="bg-gradient-primary hover:opacity-90 transition-opacity"
                  >
                    Одобрить
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
          {filteredDeals.length > 0 ? (
            <DealsTable deals={filteredDeals} onApprove={handleApprove} />
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
        </TabsContent>
      </Tabs>
    </div>
  );
};