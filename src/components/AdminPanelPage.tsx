import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
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
  Key
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

const TradersTab = () => {
  const [newTrader, setNewTrader] = useState({ username: "", login: "", password: "" });

  return (
    <div className="space-y-6">
      <Card className="border shadow-soft">
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
          <Button className="bg-primary hover:bg-primary/90">Создать трейдера</Button>
        </CardContent>
      </Card>

      <Card className="border shadow-soft">
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

const MerchantsTab = () => {
  const [newMerchant, setNewMerchant] = useState({ username: "", login: "", password: "" });

  return (
    <div className="space-y-6">
      <Card className="border shadow-soft">
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
          <Button className="bg-primary hover:bg-primary/90">Создать мерчанта</Button>
        </CardContent>
      </Card>

      <Card className="border shadow-soft">
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

const TelegramTab = () => (
  <Card className="border shadow-soft">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Send className="h-5 w-5" />
        Telegram Bot
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-center py-8">
        <Button className="bg-primary hover:bg-primary/90" size="lg">
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

const PlaceholderTab = ({ title, icon: Icon }: { title: string; icon: React.ElementType }) => (
  <Card className="border shadow-soft">
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

export const AdminPanelPage = () => {
  const [activeTab, setActiveTab] = useState("traders");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Админ-панель</h2>
        <p className="text-muted-foreground">Управление системой</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 lg:grid-cols-10 bg-card">
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

          <TabsContent value="telegram">
            <TelegramTab />
          </TabsContent>

          {AdminTabs.filter(tab => !["traders", "merchants", "telegram"].includes(tab.id)).map((tab) => (
            <TabsContent key={tab.id} value={tab.id}>
              <PlaceholderTab title={tab.label} icon={tab.icon} />
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
};