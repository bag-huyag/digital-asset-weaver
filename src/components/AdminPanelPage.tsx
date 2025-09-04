import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Users, 
  Store, 
  TrendingUp, 
  Wallet, 
  MessageSquare, 
  Handshake,
  Send,
  Settings,
  Crown,
  BarChart3,
  ArrowUp,
  ArrowDown,
  Key,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Check,
  X,
  Clock,
  Pause
} from "lucide-react";

const AdminTabs = [
  { id: "traders", label: "Трейдеры", icon: Users },
  { id: "merchants", label: "Мерчанты", icon: Store },
  { id: "traffic", label: "Трафик", icon: TrendingUp },
  { id: "wallets", label: "Кошельки", icon: Wallet },
  { id: "disputes", label: "Диспуты", icon: MessageSquare },
  { id: "deals", label: "Сделки", icon: Handshake },
  { id: "telegram", label: "Телеграм", icon: Send },
  { id: "settle", label: "Settle-settings", icon: Settings },
  { id: "teams", label: "Команды", icon: Crown },
  { id: "stats", label: "Статистика", icon: BarChart3 }
];

interface Trader {
  id: string;
  username: string;
  login: string;
  role: "Трейдер" | "Тим-лид";
}

interface Merchant {
  id: string;
  username: string;
  login: string;
  role: string;
}

interface TrafficRule {
  id: string;
  isActive: boolean;
  merchant: string;
  trader: string;
  reward: number;
  priority: number;
  commission: number;
}

interface User {
  id: string;
  username: string;
  type: "TRADER" | "MERCHANT" | "TEAM_LEAD";
  balance: number;
  frozen: number;
}

interface Dispute {
  id: string;
  dealId: string;
  merchantOrderId: string;
  status: "открыт" | "принят" | "заморожен" | "отклонён";
  amount: number;
  reason: string;
  createdAt: string;
}

interface Deal {
  id: string;
  requisites: string;
  amount: string;
  merchant: string;
  merchantOrderId: string;
  trader: string;
  created: string;
  updated: string;
  timer: string;
  status: string;
}

const mockTraders: Trader[] = [
  {
    id: "afe5f24c-0613-4a4a-bfbb-5030dbd69227",
    username: "adus20091",
    login: "adus20091",
    role: "Трейдер"
  },
  {
    id: "eef80b7e-39b4-4d17-b5de-3a852b5f3e1e",
    username: "rmnvch21",
    login: "rmnvch21",
    role: "Тим-лид"
  }
];

const mockMerchants: Merchant[] = [
  {
    id: "cc6093ec-5151-4467-9fda-d8b1b3f423ff",
    username: "mock_merch",
    login: "mock_merch",
    role: "MERCHANT"
  },
  {
    id: "519d83aa-a53b-42d6-bcf2-ecf3d19a2983",
    username: "bitwire",
    login: "account@bitwire.work",
    role: "MERCHANT"
  }
];

const mockTrafficRules: TrafficRule[] = [
  {
    id: "1",
    isActive: false,
    merchant: "biwire_finance (account@bitwire.finance)",
    trader: "adus20091 (adus20091)",
    reward: 7.0,
    priority: 200,
    commission: 9.5
  }
];

const mockUsers: User[] = [
  {
    id: "1",
    username: "adus20091",
    type: "TRADER",
    balance: 2133.5,
    frozen: 0
  },
  {
    id: "2",
    username: "Shrayder",
    type: "TRADER",
    balance: 1500.0,
    frozen: 250.0
  }
];

const mockDisputes: Dispute[] = [
  {
    id: "mt_Pr85MnodF4Lo",
    dealId: "495f375f-66f5-4a63-967a-926e3927cbf6",
    merchantOrderId: "c3595d26-dec2-4e58-a440-ce5176a280a8",
    status: "принят",
    amount: 7416,
    reason: "NO_PAYMENT",
    createdAt: "01.09.2025, 17:13:33"
  }
];

const mockDeals: Deal[] = [
  {
    id: "f69c162a",
    requisites: "Сбербанк SBP +79815574742 Богдан К",
    amount: "5368 ₽ / 66.13 USD",
    merchant: "biwire_finance",
    merchantOrderId: "ee388fb4-2767-4635-856e-798a3afa9f0c",
    trader: "obsthandler",
    created: "01.09 20:55",
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

// Traders Tab Component
const TradersTab = () => {
  const [newTrader, setNewTrader] = useState({ username: "", login: "", password: "" });

  return (
    <div className="space-y-6">
      <Card className="border shadow-premium bg-gradient-card">
        <CardHeader>
          <CardTitle>Создание аккаунта трейдера</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={newTrader.username}
                onChange={(e) => setNewTrader({...newTrader, username: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="login">Login</Label>
              <Input
                id="login"
                value={newTrader.login}
                onChange={(e) => setNewTrader({...newTrader, login: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={newTrader.password}
                onChange={(e) => setNewTrader({...newTrader, password: e.target.value})}
              />
            </div>
          </div>
          <Button className="bg-gradient-primary hover:opacity-90 transition-opacity">
            Создать трейдера
          </Button>
        </CardContent>
      </Card>

      <Card className="border shadow-premium bg-gradient-card">
        <CardHeader>
          <CardTitle>Список трейдеров и тим-лидов</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Login</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTraders.map((trader) => (
                <TableRow key={trader.id}>
                  <TableCell className="font-mono text-xs">{trader.id}</TableCell>
                  <TableCell>{trader.username}</TableCell>
                  <TableCell>{trader.login}</TableCell>
                  <TableCell>
                    <Badge variant={trader.role === "Тим-лид" ? "default" : "secondary"}>
                      {trader.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {trader.role === "Трейдер" ? (
                      <Button size="sm" variant="outline" className="text-primary">
                        <ArrowUp className="h-3 w-3 mr-1" />
                        Повысить до тим-лида
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline" className="text-destructive">
                        <ArrowDown className="h-3 w-3 mr-1" />
                        Понизить до трейдера
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

// Merchants Tab Component
const MerchantsTab = () => {
  const [newMerchant, setNewMerchant] = useState({ username: "", login: "", password: "" });

  return (
    <div className="space-y-6">
      <Card className="border shadow-premium bg-gradient-card">
        <CardHeader>
          <CardTitle>Создание аккаунта мерчанта</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="merchant-username">Username</Label>
              <Input
                id="merchant-username"
                value={newMerchant.username}
                onChange={(e) => setNewMerchant({...newMerchant, username: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="merchant-login">Login</Label>
              <Input
                id="merchant-login"
                value={newMerchant.login}
                onChange={(e) => setNewMerchant({...newMerchant, login: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="merchant-password">Password</Label>
              <Input
                id="merchant-password"
                type="password"
                value={newMerchant.password}
                onChange={(e) => setNewMerchant({...newMerchant, password: e.target.value})}
              />
            </div>
          </div>
          <Button className="bg-gradient-primary hover:opacity-90 transition-opacity">
            Создать мерчанта
          </Button>
        </CardContent>
      </Card>

      <Card className="border shadow-premium bg-gradient-card">
        <CardHeader>
          <CardTitle>Список мерчантов</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Login</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockMerchants.map((merchant) => (
                <TableRow key={merchant.id}>
                  <TableCell className="font-mono text-xs">{merchant.id}</TableCell>
                  <TableCell>{merchant.username}</TableCell>
                  <TableCell>{merchant.login}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{merchant.role}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

// Traffic Tab Component
const TrafficTab = () => {
  const [newRule, setNewRule] = useState({
    merchant: "",
    trader: "",
    commission: 0,
    reward: 0,
    priority: 0,
    isActive: true
  });

  return (
    <div className="space-y-6">
      <Card className="border shadow-premium bg-gradient-card">
        <CardHeader>
          <CardTitle>Создание новой записи</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Мерчант *</Label>
              <Select value={newRule.merchant} onValueChange={(value) => setNewRule({...newRule, merchant: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите мерчанта" />
                </SelectTrigger>
                <SelectContent>
                  {mockMerchants.map((merchant) => (
                    <SelectItem key={merchant.id} value={merchant.username}>
                      {merchant.username} ({merchant.login})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Трейдер *</Label>
              <Select value={newRule.trader} onValueChange={(value) => setNewRule({...newRule, trader: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите трейдера" />
                </SelectTrigger>
                <SelectContent>
                  {mockTraders.map((trader) => (
                    <SelectItem key={trader.id} value={trader.username}>
                      {trader.username} ({trader.login})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Комиссия платформы (%)</Label>
              <Input
                type="number"
                step="0.001"
                placeholder="0"
                value={newRule.commission}
                onChange={(e) => setNewRule({...newRule, commission: parseFloat(e.target.value) || 0})}
              />
            </div>
            <div>
              <Label>Награда трейдера (%)</Label>
              <Input
                type="number"
                step="0.001"
                placeholder="0"
                value={newRule.reward}
                onChange={(e) => setNewRule({...newRule, reward: parseFloat(e.target.value) || 0})}
              />
            </div>
            <div>
              <Label>Приоритет трейдера</Label>
              <Input
                type="number"
                placeholder="0"
                value={newRule.priority}
                onChange={(e) => setNewRule({...newRule, priority: parseInt(e.target.value) || 0})}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="active-traffic"
                checked={newRule.isActive}
                onCheckedChange={(checked) => setNewRule({...newRule, isActive: checked})}
              />
              <Label htmlFor="active-traffic">Активный трафик</Label>
            </div>
          </div>
          <Button className="bg-gradient-primary hover:opacity-90 transition-opacity">
            <Plus className="h-4 w-4 mr-2" />
            Создать
          </Button>
        </CardContent>
      </Card>

      <Card className="border shadow-premium bg-gradient-card">
        <CardHeader>
          <CardTitle>Настройки трафика</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
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
              {mockTrafficRules.map((rule) => (
                <TableRow key={rule.id}>
                  <TableCell>
                    <Badge variant={rule.isActive ? "default" : "secondary"}>
                      {rule.isActive ? "Активен" : "Неактивен"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{rule.merchant.split(' ')[0]}</div>
                      <div className="text-muted-foreground text-xs">
                        {rule.merchant.substring(rule.merchant.indexOf('('))}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{rule.trader.split(' ')[0]}</div>
                      <div className="text-muted-foreground text-xs">
                        {rule.trader.substring(rule.trader.indexOf('('))}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{rule.reward}%</TableCell>
                  <TableCell>{rule.priority}</TableCell>
                  <TableCell>{rule.commission}%</TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">
                      <Edit className="h-3 w-3 mr-1" />
                      Редактировать
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

// Wallets Tab Component
const WalletsTab = () => {
  const [selectedUser, setSelectedUser] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  
  const currentUser = mockUsers.find(u => u.username === selectedUser);

  return (
    <div className="space-y-6">
      <Card className="border shadow-premium bg-gradient-card">
        <CardHeader>
          <CardTitle>Управление кошельками</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Выберите пользователя или платформу</Label>
            <Select value={selectedUser} onValueChange={setSelectedUser}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите пользователя" />
              </SelectTrigger>
              <SelectContent>
                {mockUsers.map((user) => (
                  <SelectItem key={user.id} value={user.username}>
                    [{user.type}] {user.username}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {currentUser && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border">
                <CardHeader>
                  <CardTitle className="text-base">Информация о кошельке</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <Label className="text-sm text-muted-foreground">Адрес:</Label>
                    <p className="font-mono text-sm">TUoYcezrKNXd6Y4XhpCtsfdgfdgqHYLn</p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Баланс:</Label>
                    <p className="text-lg font-bold text-success">{currentUser.balance} USDT</p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Заморожено:</Label>
                    <p className="text-lg font-bold text-warning">{currentUser.frozen} USDT</p>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <Card className="border">
                  <CardHeader>
                    <CardTitle className="text-base">Пополнение кошелька</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label>Сумма депозита</Label>
                      <Input
                        placeholder="Введите сумму"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                      />
                    </div>
                    <Button className="w-full bg-gradient-primary hover:opacity-90 transition-opacity">
                      Пополнить
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border">
                  <CardHeader>
                    <CardTitle className="text-base">Списание средств</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label>Сумма списания</Label>
                      <Input
                        placeholder="Введите сумму"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                      />
                    </div>
                    <Button variant="destructive" className="w-full">
                      Списать
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// Disputes Tab Component
const DisputesTab = () => {
  const [searchDealId, setSearchDealId] = useState("");
  const [searchMerchantId, setSearchMerchantId] = useState("");
  const [statusFilter, setStatusFilter] = useState("все");

  const filteredDisputes = mockDisputes.filter(dispute => {
    const matchesDealId = !searchDealId || dispute.dealId.toLowerCase().includes(searchDealId.toLowerCase());
    const matchesMerchantId = !searchMerchantId || dispute.merchantOrderId.toLowerCase().includes(searchMerchantId.toLowerCase());
    const matchesStatus = statusFilter === "все" || dispute.status === statusFilter;
    
    return matchesDealId && matchesMerchantId && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <Card className="border shadow-premium bg-gradient-card">
        <CardHeader>
          <CardTitle>Поиск диспутов</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>ID сделки в системе</Label>
              <Input
                placeholder="Найти сделку"
                value={searchDealId}
                onChange={(e) => setSearchDealId(e.target.value)}
              />
            </div>
            <div>
              <Label>ID сделки мерчанта</Label>
              <Input
                placeholder="Найти сделку мерчанта"
                value={searchMerchantId}
                onChange={(e) => setSearchMerchantId(e.target.value)}
              />
            </div>
            <div>
              <Label>Фильтр по статусу</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="все">Все статусы</SelectItem>
                  <SelectItem value="открыт">Открыт</SelectItem>
                  <SelectItem value="принят">Принят</SelectItem>
                  <SelectItem value="заморожен">Заморожен</SelectItem>
                  <SelectItem value="отклонён">Отклонён</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border shadow-premium bg-gradient-card">
        <CardHeader>
          <CardTitle>Диспуты</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID диспута</TableHead>
                <TableHead>ID сделки</TableHead>
                <TableHead>Merchant Order ID</TableHead>
                <TableHead>Сумма</TableHead>
                <TableHead>Причина</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Дата</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDisputes.map((dispute) => (
                <TableRow key={dispute.id}>
                  <TableCell className="font-mono text-xs">{dispute.id}</TableCell>
                  <TableCell className="font-mono text-xs">{dispute.dealId.substring(0, 8)}...</TableCell>
                  <TableCell className="font-mono text-xs">{dispute.merchantOrderId.substring(0, 8)}...</TableCell>
                  <TableCell>{dispute.amount} ₽</TableCell>
                  <TableCell>
                    <Badge variant="outline">{dispute.reason}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        dispute.status === "принят" ? "default" :
                        dispute.status === "открыт" ? "secondary" :
                        dispute.status === "заморожен" ? "destructive" : "outline"
                      }
                    >
                      {dispute.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{dispute.createdAt}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" className="text-success">
                        <Check className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline" className="text-destructive">
                        <X className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline" className="text-warning">
                        <Pause className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

// Deals Tab Component  
const AdminDealsTab = () => {
  const [filters, setFilters] = useState({
    trader: "",
    merchant: "",
    status: "",
    dealType: "",
    dealId: "",
    merchantOrderId: "",
    bank: "",
    deviceId: "",
    paymentSystem: "",
    minAmount: "",
    maxAmount: "",
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

  return (
    <div className="space-y-6">
      <Card className="border shadow-premium bg-gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Фильтры сделок
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label>Трейдер:</Label>
              <Select value={filters.trader} onValueChange={(value) => setFilters({...filters, trader: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Все трейдеры" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Все трейдеры</SelectItem>
                  {mockTraders.map((trader) => (
                    <SelectItem key={trader.id} value={trader.username}>{trader.username}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Мерчант:</Label>
              <Select value={filters.merchant} onValueChange={(value) => setFilters({...filters, merchant: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Все мерчанты" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Все мерчанты</SelectItem>
                  {mockMerchants.map((merchant) => (
                    <SelectItem key={merchant.id} value={merchant.username}>{merchant.username}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Статус:</Label>
              <Select value={filters.status} onValueChange={(value) => setFilters({...filters, status: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Все статусы" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Все статусы</SelectItem>
                  <SelectItem value="COMPLETED">Завершено</SelectItem>
                  <SelectItem value="ACTIVE">Активно</SelectItem>
                  <SelectItem value="CANCELLED">Отменено</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Тип сделки:</Label>
              <Select value={filters.dealType} onValueChange={(value) => setFilters({...filters, dealType: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Все типы" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Все типы</SelectItem>
                  <SelectItem value="BUY">Покупка</SelectItem>
                  <SelectItem value="SELL">Продажа</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>ID сделки:</Label>
              <Input
                placeholder="Поиск по ID"
                value={filters.dealId}
                onChange={(e) => setFilters({...filters, dealId: e.target.value})}
              />
            </div>

            <div>
              <Label>ID заказа мерчанта:</Label>
              <Input
                placeholder="Merchant Order ID"
                value={filters.merchantOrderId}
                onChange={(e) => setFilters({...filters, merchantOrderId: e.target.value})}
              />
            </div>

            <div>
              <Label>Банк:</Label>
              <Select value={filters.bank} onValueChange={(value) => setFilters({...filters, bank: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Все банки" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Все банки</SelectItem>
                  <SelectItem value="sberbank">Сбербанк</SelectItem>
                  <SelectItem value="tinkoff">Т-Банк</SelectItem>
                  <SelectItem value="vtb">ВТБ</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>ID устройства:</Label>
              <Input
                placeholder="Device ID"
                value={filters.deviceId}
                onChange={(e) => setFilters({...filters, deviceId: e.target.value})}
              />
            </div>

            <div>
              <Label>Платежная система:</Label>
              <Select value={filters.paymentSystem} onValueChange={(value) => setFilters({...filters, paymentSystem: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Все системы" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Все системы</SelectItem>
                  <SelectItem value="SBP">SBP</SelectItem>
                  <SelectItem value="C2C">C2C</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Сумма от:</Label>
              <Input
                placeholder="Мин. сумма (₽)"
                value={filters.minAmount}
                onChange={(e) => setFilters({...filters, minAmount: e.target.value})}
              />
            </div>

            <div>
              <Label>Сумма до:</Label>
              <Input
                placeholder="Макс. сумма (₽)"
                value={filters.maxAmount}
                onChange={(e) => setFilters({...filters, maxAmount: e.target.value})}
              />
            </div>

            <div>
              <Label>Дата от:</Label>
              <Input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => setFilters({...filters, dateFrom: e.target.value})}
              />
            </div>

            <div>
              <Label>Дата до:</Label>
              <Input
                type="date"
                value={filters.dateTo}
                onChange={(e) => setFilters({...filters, dateTo: e.target.value})}
              />
            </div>

            <div>
              <Label>Записей на странице:</Label>
              <Select value={filters.recordsPerPage} onValueChange={(value) => setFilters({...filters, recordsPerPage: value})}>
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
          
          <div className="flex justify-end">
            <Button variant="outline" onClick={() => setFilters({
              trader: "", merchant: "", status: "", dealType: "", dealId: "", merchantOrderId: "",
              bank: "", deviceId: "", paymentSystem: "", minAmount: "", maxAmount: "", 
              dateFrom: "", dateTo: "", recordsPerPage: "10"
            })}>
              Сбросить
            </Button>
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
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID сделки</TableHead>
                <TableHead>Реквизиты</TableHead>
                <TableHead>Сумма</TableHead>
                <TableHead>Merchant</TableHead>
                <TableHead>Merchant Order ID</TableHead>
                <TableHead>Trader</TableHead>
                <TableHead>Создана</TableHead>
                <TableHead>Обновлена</TableHead>
                <TableHead>Таймер</TableHead>
                <TableHead>Статус</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockDeals.map((deal) => (
                <TableRow key={deal.id}>
                  <TableCell className="font-mono text-xs">{deal.id}</TableCell>
                  <TableCell>
                    <div className="text-sm">{deal.requisites}</div>
                  </TableCell>
                  <TableCell>{deal.amount}</TableCell>
                  <TableCell>{deal.merchant}</TableCell>
                  <TableCell className="font-mono text-xs">{deal.merchantOrderId.substring(0, 8)}...</TableCell>
                  <TableCell>{deal.trader}</TableCell>
                  <TableCell className="text-sm">{deal.created}</TableCell>
                  <TableCell className="text-sm">{deal.updated}</TableCell>
                  <TableCell>
                    <Badge variant="destructive">{deal.timer}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-success text-success-foreground">{deal.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

// Telegram Tab Component
const TelegramTab = () => (
  <Card className="border shadow-premium bg-gradient-card">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Send className="h-5 w-5" />
        Telegram Bot
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-center py-8">
        <Button className="bg-gradient-primary hover:opacity-90 transition-opacity" size="lg">
          <Key className="h-4 w-4 mr-2" />
          Генерировать JWT токен
        </Button>
        <p className="text-sm text-muted-foreground mt-2">
          Нажмите для создания нового токена доступа к Telegram боту
        </p>
      </div>
    </CardContent>
  </Card>
);

// Placeholder Tab Component
const PlaceholderTab = ({ title, icon: Icon }: { title: string; icon: React.ElementType }) => (
  <Card className="border shadow-premium bg-gradient-card">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Icon className="h-5 w-5" />
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-center py-8">
        <Icon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <p className="text-muted-foreground">Раздел в разработке</p>
      </div>
    </CardContent>
  </Card>
);

// Main Admin Panel Component
export const AdminPanelPage = () => {
  const [activeTab, setActiveTab] = useState("traders");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Админ-панель</h2>
        <p className="text-muted-foreground">Управление системой</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 lg:grid-cols-10 bg-card shadow-soft">
          {AdminTabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="flex items-center gap-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs"
            >
              <tab.icon className="h-3 w-3" />
              <span className="hidden sm:inline">{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="mt-6">
          <TabsContent value="traders">
            <TradersTab />
          </TabsContent>

          <TabsContent value="merchants">
            <MerchantsTab />
          </TabsContent>

          <TabsContent value="traffic">
            <TrafficTab />
          </TabsContent>

          <TabsContent value="wallets">
            <WalletsTab />
          </TabsContent>

          <TabsContent value="disputes">
            <DisputesTab />
          </TabsContent>

          <TabsContent value="deals">
            <AdminDealsTab />
          </TabsContent>

          <TabsContent value="telegram">
            <TelegramTab />
          </TabsContent>

          {/* Placeholder tabs for remaining sections */}
          {AdminTabs.filter(tab => !["traders", "merchants", "traffic", "wallets", "disputes", "deals", "telegram"].includes(tab.id)).map((tab) => (
            <TabsContent key={tab.id} value={tab.id}>
              <PlaceholderTab title={tab.label} icon={tab.icon} />
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
};