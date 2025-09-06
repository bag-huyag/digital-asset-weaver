import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, CheckCircle, XCircle, Clock, AlertTriangle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const mockDeals = [
  {
    id: "1234567890",
    paymentMethod: "Т-Банк SBP +79991234567 Иван И",
    amount: "15000 ₽",
    usdAmount: "185.19 USD",
    reward: "450 ₽",
    created: "01.09 15:30",
    completed: "01.09 15:35",
    status: "completed"
  },
  {
    id: "1234567891",
    paymentMethod: "ВТБ C2C 4276********1234 Петр П",
    amount: "8500 ₽",
    usdAmount: "104.94 USD",
    reward: "255 ₽",
    created: "01.09 16:45",
    completed: "-",
    status: "active"
  },
  {
    id: "1234567892",
    paymentMethod: "Сбер SBP +79997654321 Мария М",
    amount: "22000 ₽",
    usdAmount: "271.60 USD",
    reward: "660 ₽",
    created: "01.09 14:20",
    completed: "-",
    status: "cancelled"
  },
  {
    id: "1234567893",
    paymentMethod: "ВТБ SBP +79995432109 Алексей А",
    amount: "5000 ₽",
    usdAmount: "61.73 USD",
    reward: "150 ₽",
    created: "01.09 17:10",
    completed: "-",
    status: "dispute"
  },
  {
    id: "1234567894",
    paymentMethod: "Альфа C2C 5536********5678 Елена Е",
    amount: "12000 ₽",
    usdAmount: "148.15 USD",
    reward: "360 ₽",
    created: "01.09 13:15",
    completed: "01.09 13:18",
    status: "completed"
  },
  {
    id: "1234567895",
    paymentMethod: "Т-Банк C2C 2202********9876 Дмитрий Д",
    amount: "18500 ₽",
    usdAmount: "228.40 USD",
    reward: "555 ₽",
    created: "01.09 18:00",
    completed: "-",
    status: "active"
  }
];

const mockDisputes = [
  {
    id: "D1001",
    dealId: "1234567893",
    paymentMethod: "ВТБ SBP +79995432109 Алексей А",
    amount: "5000 ₽",
    usdAmount: "61.73 USD",
    reason: "Средства не поступили",
    created: "01.09 17:30",
    status: "open"
  },
  {
    id: "D1002",
    dealId: "1234567896",
    paymentMethod: "Сбер C2C 4279********3456 Анна А",
    amount: "25000 ₽",
    usdAmount: "308.64 USD",
    reason: "Неверные реквизиты",
    created: "31.08 20:15",
    status: "resolved"
  }
];

function getStatusBadge(status) {
  const statusConfig = {
    completed: { variant: "default", label: "Завершена", icon: CheckCircle },
    active: { variant: "secondary", label: "Активна", icon: Clock },
    cancelled: { variant: "destructive", label: "Отменена", icon: XCircle },
    dispute: { variant: "outline", label: "Спор", icon: AlertTriangle }
  };

  const config = statusConfig[status] || statusConfig.active;
  const Icon = config.icon;
  
  return (
    <Badge variant={config.variant} className="flex items-center gap-1">
      <Icon className="h-3 w-3" />
      {config.label}
    </Badge>
  );
}

function DealsTable({ deals, onApprove, showApproveButton = false }) {
  return (
    <div className="rounded-md border shadow-premium bg-gradient-card">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-semibold">ID</TableHead>
            <TableHead className="font-semibold">Реквизит</TableHead>
            <TableHead className="font-semibold">Сумма сделки</TableHead>
            <TableHead className="font-semibold">Награда трейдера</TableHead>
            <TableHead className="font-semibold">Создана в</TableHead>
            <TableHead className="font-semibold">Завершена в</TableHead>
            <TableHead className="font-semibold">Статус</TableHead>
            {showApproveButton && <TableHead className="font-semibold">Действия</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {deals.map((deal) => (
            <TableRow key={deal.id} className="hover:bg-muted/30 transition-colors">
              <TableCell className="font-mono text-sm">{deal.id}</TableCell>
              <TableCell className="max-w-[200px]">
                <div className="truncate" title={deal.paymentMethod}>
                  {deal.paymentMethod}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium">{deal.amount}</span>
                  <span className="text-xs text-muted-foreground">{deal.usdAmount}</span>
                </div>
              </TableCell>
              <TableCell className="font-medium text-premium-primary">
                {deal.reward}
              </TableCell>
              <TableCell className="text-sm">{deal.created}</TableCell>
              <TableCell className="text-sm">{deal.completed}</TableCell>
              <TableCell>{getStatusBadge(deal.status)}</TableCell>
              {showApproveButton && (
                <TableCell>
                  {deal.status === 'active' && (
                    <Button 
                      size="sm" 
                      onClick={() => onApprove && onApprove(deal.id)}
                      className="bg-premium-primary hover:bg-premium-primary/90"
                    >
                      Подтвердить
                    </Button>
                  )}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export const DealsPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("active");
  const [searchQuery, setSearchQuery] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");

  const handleApprove = (dealId) => {
    toast({
      title: "Сделка подтверждена",
      description: `Сделка ${dealId} успешно подтверждена`,
    });
  };

  const filterDeals = (deals) => {
    return deals.filter(deal => {
      const matchesSearch = deal.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          deal.paymentMethod.toLowerCase().includes(searchQuery.toLowerCase());
      
      const dealAmount = parseFloat(deal.amount.replace(/[^\d]/g, ''));
      const matchesMinAmount = !minAmount || dealAmount >= parseFloat(minAmount);
      const matchesMaxAmount = !maxAmount || dealAmount <= parseFloat(maxAmount);
      
      return matchesSearch && matchesMinAmount && matchesMaxAmount;
    });
  };

  const getFilteredDeals = () => {
    let filteredDeals = mockDeals;
    
    if (activeTab !== "all") {
      filteredDeals = filteredDeals.filter(deal => deal.status === activeTab);
    }
    
    return filterDeals(filteredDeals);
  };

  const getFilteredDisputes = () => {
    return mockDisputes.filter(dispute =>
      dispute.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dispute.dealId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dispute.paymentMethod.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="space-y-6">
      <Card className="border shadow-premium bg-gradient-card">
        <CardHeader>
          <CardTitle className="text-xl font-semibold bg-gradient-text bg-clip-text text-transparent">
            Поиск и фильтры
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Поиск по ID или реквизитам</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Введите ID или часть реквизитов..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background/50 border-premium-border focus:border-premium-primary"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="min-amount">Минимальная сумма (₽)</Label>
              <Input
                id="min-amount"
                type="number"
                placeholder="0"
                value={minAmount}
                onChange={(e) => setMinAmount(e.target.value)}
                className="bg-background/50 border-premium-border focus:border-premium-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="max-amount">Максимальная сумма (₽)</Label>
              <Input
                id="max-amount"
                type="number"
                placeholder="∞"
                value={maxAmount}
                onChange={(e) => setMaxAmount(e.target.value)}
                className="bg-background/50 border-premium-border focus:border-premium-primary"
              />
            </div>
          </div>
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchQuery("");
              setMinAmount("");
              setMaxAmount("");
            }}
            className="border-premium-border hover:bg-premium-primary/10"
          >
            Сбросить фильтры
          </Button>
        </CardContent>
      </Card>

      <Card className="border shadow-premium bg-gradient-card">
        <CardHeader>
          <CardTitle className="text-xl font-semibold bg-gradient-text bg-clip-text text-transparent">
            Управление сделками
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5 bg-muted/50">
              <TabsTrigger value="active" className="data-[state=active]:bg-premium-primary data-[state=active]:text-white">
                Активные
              </TabsTrigger>
              <TabsTrigger value="completed" className="data-[state=active]:bg-premium-primary data-[state=active]:text-white">
                Завершённые
              </TabsTrigger>
              <TabsTrigger value="cancelled" className="data-[state=active]:bg-premium-primary data-[state=active]:text-white">
                Отменённые
              </TabsTrigger>
              <TabsTrigger value="dispute" className="data-[state=active]:bg-premium-primary data-[state=active]:text-white">
                Споры
              </TabsTrigger>
              <TabsTrigger value="disputes-list" className="data-[state=active]:bg-premium-primary data-[state=active]:text-white">
                Диспуты
              </TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="mt-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Активные сделки</h3>
                  <Badge variant="secondary" className="bg-premium-primary/10 text-premium-primary">
                    {getFilteredDeals().length} сделок
                  </Badge>
                </div>
                {getFilteredDeals().length > 0 ? (
                  <DealsTable 
                    deals={getFilteredDeals()} 
                    onApprove={handleApprove}
                    showApproveButton={true}
                  />
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    Активных сделок не найдено
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="completed" className="mt-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Завершённые сделки</h3>
                  <Badge variant="secondary" className="bg-premium-primary/10 text-premium-primary">
                    {getFilteredDeals().length} сделок
                  </Badge>
                </div>
                {getFilteredDeals().length > 0 ? (
                  <DealsTable deals={getFilteredDeals()} />
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    Завершённых сделок не найдено
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="cancelled" className="mt-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Отменённые сделки</h3>
                  <Badge variant="secondary" className="bg-premium-primary/10 text-premium-primary">
                    {getFilteredDeals().length} сделок
                  </Badge>
                </div>
                {getFilteredDeals().length > 0 ? (
                  <DealsTable deals={getFilteredDeals()} />
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    Отменённых сделок не найдено
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="dispute" className="mt-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Сделки в споре</h3>
                  <Badge variant="secondary" className="bg-premium-primary/10 text-premium-primary">
                    {getFilteredDeals().length} сделок
                  </Badge>
                </div>
                {getFilteredDeals().length > 0 ? (
                  <DealsTable deals={getFilteredDeals()} />
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    Сделок в споре не найдено
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="disputes-list" className="mt-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Диспуты</h3>
                  <Badge variant="secondary" className="bg-premium-primary/10 text-premium-primary">
                    {getFilteredDisputes().length} диспутов
                  </Badge>
                </div>
                {getFilteredDisputes().length > 0 ? (
                  <div className="rounded-md border shadow-premium bg-gradient-card">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/50">
                          <TableHead className="font-semibold">ID диспута</TableHead>
                          <TableHead className="font-semibold">ID сделки</TableHead>
                          <TableHead className="font-semibold">Реквизит</TableHead>
                          <TableHead className="font-semibold">Сумма</TableHead>
                          <TableHead className="font-semibold">Причина</TableHead>
                          <TableHead className="font-semibold">Создан</TableHead>
                          <TableHead className="font-semibold">Статус</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {getFilteredDisputes().map((dispute) => (
                          <TableRow key={dispute.id} className="hover:bg-muted/30 transition-colors">
                            <TableCell className="font-mono text-sm">{dispute.id}</TableCell>
                            <TableCell className="font-mono text-sm">{dispute.dealId}</TableCell>
                            <TableCell className="max-w-[200px]">
                              <div className="truncate" title={dispute.paymentMethod}>
                                {dispute.paymentMethod}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <span className="font-medium">{dispute.amount}</span>
                                <span className="text-xs text-muted-foreground">{dispute.usdAmount}</span>
                              </div>
                            </TableCell>
                            <TableCell>{dispute.reason}</TableCell>
                            <TableCell className="text-sm">{dispute.created}</TableCell>
                            <TableCell>
                              <Badge variant={dispute.status === 'open' ? 'destructive' : 'default'}>
                                {dispute.status === 'open' ? 'Открыт' : 'Решён'}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    Диспутов не найдено
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};