import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Settings,
  Users,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Filter
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";

// Mock data
const mockTrafficSettings = [
  {
    id: "1",
    status: true,
    merchant: "BitWire",
    trader: "alex_trader",
    reward: "3.5%",
    priority: "Высокий",
    commission: "1.2%"
  },
  {
    id: "2", 
    status: false,
    merchant: "CryptoExchange",
    trader: "maria_crypto",
    reward: "2.8%",
    priority: "Средний", 
    commission: "1.0%"
  },
  {
    id: "3",
    status: true,
    merchant: "FastPay",
    trader: "ivan_fast",
    reward: "4.0%",
    priority: "Высокий",
    commission: "1.5%"
  }
];

const mockUsers = [
  {
    id: "user_1",
    name: "Алексей Петров",
    balance: 125000,
    frozenBalance: 15000,
    email: "alex@example.com"
  },
  {
    id: "user_2", 
    name: "Мария Сидорова",
    balance: 89500,
    frozenBalance: 5500,
    email: "maria@example.com"
  },
  {
    id: "user_3",
    name: "Иван Иванов", 
    balance: 234000,
    frozenBalance: 25000,
    email: "ivan@example.com"
  }
];

const mockDisputes = [
  {
    id: "D001",
    internalId: "INT-D001",
    merchantId: "MERCH-001",
    status: "open",
    dealId: "1234567890",
    amount: "15000 ₽",
    reason: "Средства не поступили",
    created: "01.09 15:30",
    merchant: "BitWire",
    trader: "alex_trader"
  },
  {
    id: "D002",
    internalId: "INT-D002", 
    merchantId: "MERCH-002",
    status: "accepted",
    dealId: "1234567891",
    amount: "8500 ₽",
    reason: "Неверные реквизиты",
    created: "31.08 20:15",
    merchant: "CryptoExchange",
    trader: "maria_crypto"
  },
  {
    id: "D003",
    internalId: "INT-D003",
    merchantId: "MERCH-003", 
    status: "frozen",
    dealId: "1234567892",
    amount: "22000 ₽",
    reason: "Подозрительная активность",
    created: "30.08 14:45",
    merchant: "FastPay",
    trader: "ivan_fast"
  }
];

const mockDeals = [
  {
    id: "a1b2c3d4",
    requisites: "Т-Банк SBP +79991234567 Иван И",
    amount: "15000 ₽ / 185.19 USD",
    merchant: "bitwire",
    merchantOrderId: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    trader: "adus20091",
    created: "01.09 15:30",
    updated: "01.09 15:35",
    timer: "00:28:45",
    status: "COMPLETED"
  },
  {
    id: "e5f6g7h8",
    requisites: "ВТБ C2C 4276********1234 Петр П",
    amount: "8500 ₽ / 104.94 USD", 
    merchant: "cryptoex",
    merchantOrderId: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
    trader: "rmnvch21",
    created: "01.09 16:45",
    updated: "01.09 16:47",
    timer: "00:15:23",
    status: "ACTIVE"
  },
  {
    id: "i9j0k1l2",
    requisites: "Сбер SBP +79997654321 Мария М",
    amount: "22000 ₽ / 271.60 USD",
    merchant: "fastpay",
    merchantOrderId: "550e8400-e29b-41d4-a716-446655440000",
    trader: "ivan1990",
    created: "01.09 14:20",
    updated: "01.09 20:57",
    timer: "Истекло",
    status: "COMPLETED"
  },
  {
    id: "a1b2c3d4",
    requisites: "Т-Банк SBP +79991234567 Иван И",
    amount: "12000 ₽ / 148.15 USD",
    merchant: "mock_merch",
    merchantOrderId: "3c039354-b123-4567-8901-234567890123",
    trader: "adus20091",
    created: "02.09 14:30",
    updated: "02.09 14:32",
    timer: "00:15:23",
    status: "ACTIVE"
  },
  {
    id: "e5f6g7h8",
    requisites: "ВТБ C2C 4276********1234 Петр П",
    amount: "7500 ₽ / 92.59 USD",
    merchant: "bitwire",
    merchantOrderId: "9a8b7c6d-5e4f-3210-9876-543210987654",
    trader: "rmnvch21",
    created: "02.09 13:45",
    updated: "02.09 13:47",
    timer: "Истекло",
    status: "CANCELLED"
  }
];

function getStatusBadge(status) {
  const statusConfig = {
    open: { variant: "destructive", label: "Открыт" },
    accepted: { variant: "default", label: "Принят" },
    frozen: { variant: "secondary", label: "Заморожен" },
    rejected: { variant: "outline", label: "Отклонён" },
    ACTIVE: { variant: "secondary", label: "Активна" },
    COMPLETED: { variant: "default", label: "Завершена" },
    CANCELLED: { variant: "destructive", label: "Отменена" }
  };

  const config = statusConfig[status] || { variant: "outline", label: status };
  
  return (
    <Badge variant={config.variant}>
      {config.label}
    </Badge>
  );
}

export const AdminPanelPage = () => {
  const [activeTab, setActiveTab] = useState("traffic");
  
  // Traffic settings state
  const [trafficSettings, setTrafficSettings] = useState(mockTrafficSettings);
  
  // Users state
  const [selectedUser, setSelectedUser] = useState("");
  const [walletAmount, setWalletAmount] = useState("");
  const [walletOperation, setWalletOperation] = useState("add");
  
  // Disputes state
  const [disputeSearch, setDisputeSearch] = useState("");
  const [merchantIdSearch, setMerchantIdSearch] = useState("");
  const [disputeStatus, setDisputeStatus] = useState("all");
  const [filteredDisputes, setFilteredDisputes] = useState(mockDisputes);
  const [freezeTime, setFreezeTime] = useState("");
  
  // Deals state
  const [dealsFilters, setDealsFilters] = useState({
    trader: "",
    merchant: "",
    status: "",
    dealType: "",
    dealId: "",
    searchId: "",
    merchantOrderId: "",
    bank: "",
    deviceId: "",
    paymentSystem: "",
    amountFrom: "",
    amountTo: "",
    dateFrom: "",
    dateTo: "",
    recordsPerPage: "10"
  });

  const [autoRefresh, setAutoRefresh] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("08:21:23");

  const handleRefresh = () => {
    const now = new Date();
    setLastUpdated(now.toLocaleTimeString('ru-RU', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    }));
  };

  const handleTrafficToggle = (id) => {
    setTrafficSettings(prev =>
      prev.map(setting =>
        setting.id === id
          ? { ...setting, status: !setting.status }
          : setting
      )
    );
    toast({
      title: "Настройки обновлены",
      description: "Статус трафика изменён",
    });
  };

  const handleWalletOperation = () => {
    if (!selectedUser || !walletAmount) {
      toast({
        title: "Ошибка",
        description: "Выберите пользователя и введите сумму",
        variant: "destructive"
      });
      return;
    }

    const operationText = walletOperation === "add" ? "пополнён" : "списан";
    toast({
      title: "Операция выполнена",
      description: `Кошелёк ${operationText} на ${walletAmount} ₽`,
    });
    
    setWalletAmount("");
  };

  const handleDisputeAction = (disputeId, action) => {
    let actionText = "";
    switch(action) {
      case "accept":
        actionText = "принят";
        break;
      case "reject":
        actionText = "отклонён"; 
        break;
      case "freeze":
        actionText = "заморожен";
        break;
      default:
        actionText = "обработан";
    }
    
    toast({
      title: "Диспут обновлён",
      description: `Диспут ${disputeId} ${actionText}`,
    });
  };

  const filterDisputes = () => {
    let filtered = mockDisputes;
    
    if (disputeSearch) {
      filtered = filtered.filter(dispute => 
        dispute.internalId.toLowerCase().includes(disputeSearch.toLowerCase())
      );
    }
    
    if (merchantIdSearch) {
      filtered = filtered.filter(dispute =>
        dispute.merchantId.toLowerCase().includes(merchantIdSearch.toLowerCase())
      );
    }
    
    if (disputeStatus !== "all") {
      filtered = filtered.filter(dispute => dispute.status === disputeStatus);
    }
    
    setFilteredDisputes(filtered);
  };

  const resetDealsFilters = () => {
    setDealsFilters({
      trader: "",
      merchant: "",
      status: "",
      dealType: "",
      dealId: "",
      searchId: "",
      merchantOrderId: "",
      bank: "",
      deviceId: "",
      paymentSystem: "",
      amountFrom: "",
      amountTo: "",
      dateFrom: "",
      dateTo: "",
      recordsPerPage: "10"
    });
  };

  React.useEffect(() => {
    filterDisputes();
  }, [disputeSearch, merchantIdSearch, disputeStatus]);

  const selectedUserData = mockUsers.find(user => user.id === selectedUser);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold bg-gradient-text bg-clip-text text-transparent">
          Панель администратора
        </h2>
        <p className="text-muted-foreground">
          Управление системой и мониторинг операций
        </p>
      </div>

      <Card className="border shadow-premium bg-gradient-card">
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-muted/50">
              <TabsTrigger value="traffic" className="data-[state=active]:bg-premium-primary data-[state=active]:text-white">
                Трафик
              </TabsTrigger>
              <TabsTrigger value="wallet" className="data-[state=active]:bg-premium-primary data-[state=active]:text-white">
                Кошелёк
              </TabsTrigger>
              <TabsTrigger value="disputes" className="data-[state=active]:bg-premium-primary data-[state=active]:text-white">
                Диспуты
              </TabsTrigger>
              <TabsTrigger value="deals" className="data-[state=active]:bg-premium-primary data-[state=active]:text-white">
                Сделки
              </TabsTrigger>
            </TabsList>

            {/* Traffic Settings Tab */}
            <TabsContent value="traffic" className="mt-6 p-6 space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">Настройки трафика</h3>
                  <p className="text-sm text-muted-foreground">Управление направлениями трафика и комиссиями</p>
                </div>
                <Button className="bg-premium-primary hover:bg-premium-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Добавить направление
                </Button>
              </div>

              <div className="rounded-md border shadow-premium bg-gradient-card">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead>Статус</TableHead>
                      <TableHead>Мерчант</TableHead>
                      <TableHead>Трейдер</TableHead>
                      <TableHead>Награда</TableHead>
                      <TableHead>Приоритет</TableHead>
                      <TableHead>Комиссия</TableHead>
                      <TableHead>Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {trafficSettings.map((setting) => (
                      <TableRow key={setting.id} className="hover:bg-muted/30 transition-colors">
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={setting.status}
                              onCheckedChange={() => handleTrafficToggle(setting.id)}
                            />
                            <span className="text-sm">{setting.status ? "Вкл" : "Выкл"}</span>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{setting.merchant}</TableCell>
                        <TableCell>{setting.trader}</TableCell>
                        <TableCell className="text-premium-primary font-medium">{setting.reward}</TableCell>
                        <TableCell>
                          <Badge variant={setting.priority === "Высокий" ? "default" : "secondary"}>
                            {setting.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>{setting.commission}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline" className="text-destructive">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Wallet Tab */}
            <TabsContent value="wallet" className="mt-6 p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold">Управление кошельками</h3>
                <p className="text-sm text-muted-foreground">Пополнение и списание средств с кошельков пользователей</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border shadow-premium bg-gradient-card">
                  <CardHeader>
                    <CardTitle>Выбор пользователя</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Пользователь</Label>
                      <Select value={selectedUser} onValueChange={setSelectedUser}>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите пользователя" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockUsers.map((user) => (
                            <SelectItem key={user.id} value={user.id}>
                              {user.name} ({user.email})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {selectedUserData && (
                      <div className="space-y-3 p-4 border border-premium-border rounded-lg bg-background/50">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Баланс:</span>
                          <span className="font-medium">₽{selectedUserData.balance.toLocaleString('ru-RU')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Заморожено:</span>
                          <span className="font-medium text-blue-500">₽{selectedUserData.frozenBalance.toLocaleString('ru-RU')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Доступно:</span>
                          <span className="font-medium text-green-600">₽{(selectedUserData.balance - selectedUserData.frozenBalance).toLocaleString('ru-RU')}</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="border shadow-premium bg-gradient-card">
                  <CardHeader>
                    <CardTitle>Операции с кошельком</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Тип операции</Label>
                      <Select value={walletOperation} onValueChange={setWalletOperation}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="add">Пополнение</SelectItem>
                          <SelectItem value="subtract">Списание</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Сумма (₽)</Label>
                      <Input
                        type="number"
                        placeholder="Введите сумму"
                        value={walletAmount}
                        onChange={(e) => setWalletAmount(e.target.value)}
                        className="bg-background/50 border-premium-border focus:border-premium-primary"
                      />
                    </div>

                    <Button 
                      onClick={handleWalletOperation}
                      className="w-full bg-premium-primary hover:bg-premium-primary/90"
                      disabled={!selectedUser || !walletAmount}
                    >
                      {walletOperation === "add" ? "Пополнить кошелёк" : "Списать средства"}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Disputes Tab */}
            <TabsContent value="disputes" className="mt-6 p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold">Управление диспутами</h3>
                <p className="text-sm text-muted-foreground">Поиск и обработка диспутов</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>Поиск по внутреннему ID</Label>
                  <Input
                    placeholder="INT-D001"
                    value={disputeSearch}
                    onChange={(e) => setDisputeSearch(e.target.value)}
                    className="bg-background/50 border-premium-border focus:border-premium-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Поиск по ID мерчанта</Label>
                  <Input
                    placeholder="MERCH-001"
                    value={merchantIdSearch}
                    onChange={(e) => setMerchantIdSearch(e.target.value)}
                    className="bg-background/50 border-premium-border focus:border-premium-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Статус диспута</Label>
                  <Select value={disputeStatus} onValueChange={setDisputeStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все</SelectItem>
                      <SelectItem value="open">Открыт</SelectItem>
                      <SelectItem value="accepted">Принят</SelectItem>
                      <SelectItem value="frozen">Заморожен</SelectItem>
                      <SelectItem value="rejected">Отклонён</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Время заморозки (часы)</Label>
                  <Input
                    type="number"
                    placeholder="24"
                    value={freezeTime}
                    onChange={(e) => setFreezeTime(e.target.value)}
                    className="bg-background/50 border-premium-border focus:border-premium-primary"
                  />
                </div>
              </div>

              <div className="rounded-md border shadow-premium bg-gradient-card">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead>ID диспута</TableHead>
                      <TableHead>ID сделки</TableHead>
                      <TableHead>Сумма</TableHead>
                      <TableHead>Причина</TableHead>
                      <TableHead>Мерчант</TableHead>
                      <TableHead>Трейдер</TableHead>
                      <TableHead>Создан</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead>Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDisputes.map((dispute) => (
                      <TableRow key={dispute.id} className="hover:bg-muted/30 transition-colors">
                        <TableCell className="font-mono text-sm">{dispute.internalId}</TableCell>
                        <TableCell className="font-mono text-sm">{dispute.dealId}</TableCell>
                        <TableCell className="font-medium">{dispute.amount}</TableCell>
                        <TableCell className="max-w-[150px] truncate">{dispute.reason}</TableCell>
                        <TableCell>{dispute.merchant}</TableCell>
                        <TableCell>{dispute.trader}</TableCell>
                        <TableCell className="text-sm">{dispute.created}</TableCell>
                        <TableCell>{getStatusBadge(dispute.status)}</TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            {dispute.status === "open" && (
                              <>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleDisputeAction(dispute.id, "accept")}
                                  className="text-green-600"
                                >
                                  <CheckCircle className="h-3 w-3" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleDisputeAction(dispute.id, "reject")}
                                  className="text-red-600"
                                >
                                  <XCircle className="h-3 w-3" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleDisputeAction(dispute.id, "freeze")}
                                  className="text-blue-600"
                                >
                                  <Clock className="h-3 w-3" />
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Deals Tab */}
            <TabsContent value="deals" className="mt-6 p-6 space-y-6">
              <Card className="border shadow-premium bg-gradient-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Filter className="h-5 w-5 text-premium-primary" />
                    <span>Фильтры поиска</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label>Трейдер</Label>
                      <Input
                        placeholder="Имя трейдера"
                        value={dealsFilters.trader}
                        onChange={(e) => setDealsFilters(prev => ({ ...prev, trader: e.target.value }))}
                        className="bg-background/50 border-premium-border focus:border-premium-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Мерчант</Label>
                      <Input
                        placeholder="Имя мерчанта"
                        value={dealsFilters.merchant}
                        onChange={(e) => setDealsFilters(prev => ({ ...prev, merchant: e.target.value }))}
                        className="bg-background/50 border-premium-border focus:border-premium-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Статус</Label>
                      <Select value={dealsFilters.status} onValueChange={(value) => setDealsFilters(prev => ({ ...prev, status: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Все статусы" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Все статусы</SelectItem>
                          <SelectItem value="ACTIVE">Активные</SelectItem>
                          <SelectItem value="COMPLETED">Завершённые</SelectItem>
                          <SelectItem value="CANCELLED">Отменённые</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Тип сделки</Label>
                      <Select value={dealsFilters.dealType} onValueChange={(value) => setDealsFilters(prev => ({ ...prev, dealType: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Все типы" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Все типы</SelectItem>
                          <SelectItem value="buy">Покупка</SelectItem>
                          <SelectItem value="sell">Продажа</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label>ID сделки</Label>
                      <Input
                        placeholder="ID сделки"
                        value={dealsFilters.dealId}
                        onChange={(e) => setDealsFilters(prev => ({ ...prev, dealId: e.target.value }))}
                        className="bg-background/50 border-premium-border focus:border-premium-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Поиск по ID</Label>
                      <Input
                        placeholder="Поиск по ID"
                        value={dealsFilters.searchId}
                        onChange={(e) => setDealsFilters(prev => ({ ...prev, searchId: e.target.value }))}
                        className="bg-background/50 border-premium-border focus:border-premium-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>ID заказа мерчанта</Label>
                      <Input
                        placeholder="Merchant Order ID"
                        value={dealsFilters.merchantOrderId}
                        onChange={(e) => setDealsFilters(prev => ({ ...prev, merchantOrderId: e.target.value }))}
                        className="bg-background/50 border-premium-border focus:border-premium-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Банк</Label>
                      <Select value={dealsFilters.bank} onValueChange={(value) => setDealsFilters(prev => ({ ...prev, bank: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Все банки" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Все банки</SelectItem>
                          <SelectItem value="tbank">Т-Банк</SelectItem>
                          <SelectItem value="sber">Сбербанк</SelectItem>
                          <SelectItem value="vtb">ВТБ</SelectItem>
                          <SelectItem value="alpha">Альфа-Банк</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div className="space-y-2">
                      <Label>ID устройства</Label>
                      <Input
                        placeholder="Device ID"
                        value={dealsFilters.deviceId}
                        onChange={(e) => setDealsFilters(prev => ({ ...prev, deviceId: e.target.value }))}
                        className="bg-background/50 border-premium-border focus:border-premium-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Платёжная система</Label>
                      <Select value={dealsFilters.paymentSystem} onValueChange={(value) => setDealsFilters(prev => ({ ...prev, paymentSystem: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Все системы" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Все системы</SelectItem>
                          <SelectItem value="sbp">СБП</SelectItem>
                          <SelectItem value="card">Карта</SelectItem>
                          <SelectItem value="qiwi">QIWI</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Сумма от (₽)</Label>
                      <Input
                        type="number"
                        placeholder="Мин. сумма"
                        value={dealsFilters.amountFrom}
                        onChange={(e) => setDealsFilters(prev => ({ ...prev, amountFrom: e.target.value }))}
                        className="bg-background/50 border-premium-border focus:border-premium-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Сумма до (₽)</Label>
                      <Input
                        type="number"
                        placeholder="Макс. сумма"
                        value={dealsFilters.amountTo}
                        onChange={(e) => setDealsFilters(prev => ({ ...prev, amountTo: e.target.value }))}
                        className="bg-background/50 border-premium-border focus:border-premium-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Записей на странице</Label>
                      <Select value={dealsFilters.recordsPerPage} onValueChange={(value) => setDealsFilters(prev => ({ ...prev, recordsPerPage: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10">10</SelectItem>
                          <SelectItem value="25">25</SelectItem>
                          <SelectItem value="50">50</SelectItem>
                          <SelectItem value="100">100</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Дата от</Label>
                      <Input
                        type="date"
                        value={dealsFilters.dateFrom}
                        onChange={(e) => setDealsFilters(prev => ({ ...prev, dateFrom: e.target.value }))}
                        className="bg-background/50 border-premium-border focus:border-premium-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Дата до</Label>
                      <Input
                        type="date"
                        value={dealsFilters.dateTo}
                        onChange={(e) => setDealsFilters(prev => ({ ...prev, dateTo: e.target.value }))}
                        className="bg-background/50 border-premium-border focus:border-premium-primary"
                      />
                    </div>
                    <div className="flex items-end space-x-2">
                      <Button 
                        onClick={resetDealsFilters}
                        variant="outline"
                        className="border-premium-border hover:bg-premium-primary/10"
                      >
                        Сбросить
                      </Button>
                      <Button className="bg-premium-primary hover:bg-premium-primary/90">
                        Применить фильтры
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border shadow-premium bg-gradient-card">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Мониторинг сделок</span>
                    <div className="flex items-center gap-4">
                      <div className="text-sm text-muted-foreground">
                        Обновлено: {lastUpdated}
                      </div>
                      <div className="flex items-center gap-2">
                        <Label htmlFor="auto-refresh" className="text-sm">Автообновление:</Label>
                        <Switch
                          id="auto-refresh"
                          checked={autoRefresh}
                          onCheckedChange={setAutoRefresh}
                        />
                        <span className="text-sm">{autoRefresh ? "Вкл" : "Выкл"}</span>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={handleRefresh}
                        className="flex items-center gap-2"
                      >
                        <Search className="h-4 w-4" />
                        Обновить
                      </Button>
                    </div>
                  </CardTitle>
                  <div className="text-sm text-muted-foreground">
                    Всего сделок: {mockDeals.length} | Страница: 1 из 1
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="rounded-md border-0">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/50 hover:bg-muted/50">
                          <TableHead className="font-semibold">ID сделки</TableHead>
                          <TableHead className="font-semibold">Реквизиты</TableHead>
                          <TableHead className="font-semibold">Сумма</TableHead>
                          <TableHead className="font-semibold">Merchant</TableHead>
                          <TableHead className="font-semibold">Merchant Order ID</TableHead>
                          <TableHead className="font-semibold">Trader</TableHead>
                          <TableHead className="font-semibold">Создана</TableHead>
                          <TableHead className="font-semibold">Обновлена</TableHead>
                          <TableHead className="font-semibold">Таймер</TableHead>
                          <TableHead className="font-semibold">Статус</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockDeals.map((deal, index) => (
                          <TableRow key={`${deal.id}-${index}`} className="hover:bg-muted/30 transition-colors">
                            <TableCell className="font-mono text-sm">{deal.id}</TableCell>
                            <TableCell className="max-w-[200px]">
                              <div className="truncate" title={deal.requisites}>
                                {deal.requisites}
                              </div>
                            </TableCell>
                            <TableCell className="font-medium">{deal.amount}</TableCell>
                            <TableCell className="font-mono text-sm">{deal.merchant}</TableCell>
                            <TableCell className="font-mono text-xs max-w-[150px]">
                              <div className="truncate" title={deal.merchantOrderId}>
                                {deal.merchantOrderId}
                              </div>
                            </TableCell>
                            <TableCell>{deal.trader}</TableCell>
                            <TableCell className="text-sm">{deal.created}</TableCell>
                            <TableCell className="text-sm">{deal.updated}</TableCell>
                            <TableCell className="text-sm">
                              <span className={deal.timer === "Истекло" ? "text-red-500" : "text-green-600"}>
                                {deal.timer}
                              </span>
                            </TableCell>
                            <TableCell>{getStatusBadge(deal.status)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};