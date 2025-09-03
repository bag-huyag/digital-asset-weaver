import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  Plus, 
  CreditCard, 
  Building, 
  Smartphone, 
  User, 
  DollarSign,
  BarChart3,
  Hash,
  RefreshCw,
  Edit,
  Trash2
} from "lucide-react";

interface PaymentMethod {
  id: string;
  system: string;
  bank: string;
  phone: string;
  owner: string;
  currency: string;
  limits: {
    minAmount: number;
    maxAmount: number;
    dailyVolume: number;
    monthlyVolume: number;
    dailyCount: number;
    monthlyCount: number;
    concurrent: number;
  };
  statistics: {
    todayCount: number;
    monthCount: number;
    todayAmount: number;
    monthAmount: number;
  };
  isActive: boolean;
}

const mockPaymentMethods: PaymentMethod[] = [
  {
    id: "1",
    system: "SBP",
    bank: "Т-Банк",
    phone: "+7 (828) 880-88-80",
    owner: "Иван И.",
    currency: "RUB",
    limits: {
      minAmount: 0,
      maxAmount: 1000000,
      dailyVolume: 1000000,
      monthlyVolume: 999998,
      dailyCount: 2,
      monthlyCount: 4,
      concurrent: 2
    },
    statistics: {
      todayCount: 0,
      monthCount: 1,
      todayAmount: 0,
      monthAmount: 5540
    },
    isActive: true
  }
];

const AddPaymentMethodDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Добавить реквизит
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Добавить реквизит</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="currency">Валюта</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Выберите валюту" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rub">RUB</SelectItem>
                <SelectItem value="usd">USD</SelectItem>
                <SelectItem value="eur">EUR</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="payment-method">Способ оплаты</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Выберите способ оплаты" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sbp">SBP</SelectItem>
                <SelectItem value="c2c">C2C</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bank">Банк</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Выберите банк" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sberbank">Сбербанк</SelectItem>
                <SelectItem value="tbank">Т-Банк</SelectItem>
                <SelectItem value="vtb">ВТБ</SelectItem>
                <SelectItem value="alpha">Альфа-Банк</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="owner">Имя владельца</Label>
            <Input id="owner" placeholder="Введите имя владельца" />
          </div>

          <Separator />
          
          <div>
            <h4 className="text-sm font-medium mb-3">Лимиты</h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="min-amount" className="text-xs">Мин сумма сделки</Label>
                <Input id="min-amount" type="number" defaultValue="0" />
              </div>
              <div>
                <Label htmlFor="max-amount" className="text-xs">Макс сумма сделки</Label>
                <Input id="max-amount" type="number" defaultValue="0" />
              </div>
              <div>
                <Label htmlFor="daily-sum" className="text-xs">Сумма (день)</Label>
                <Input id="daily-sum" type="number" defaultValue="0" />
              </div>
              <div>
                <Label htmlFor="monthly-sum" className="text-xs">Сумма (месяц)</Label>
                <Input id="monthly-sum" type="number" defaultValue="0" />
              </div>
              <div>
                <Label htmlFor="daily-count" className="text-xs">Макс кол-во сделок (день)</Label>
                <Input id="daily-count" type="number" defaultValue="0" />
              </div>
              <div>
                <Label htmlFor="monthly-count" className="text-xs">Макс кол-во сделок (месяц)</Label>
                <Input id="monthly-count" type="number" defaultValue="0" />
              </div>
              <div>
                <Label htmlFor="concurrent" className="text-xs">Сделок одновременно</Label>
                <Input id="concurrent" type="number" defaultValue="0" />
              </div>
              <div>
                <Label htmlFor="delay" className="text-xs">Задержка между сделками(мин)</Label>
                <Input id="delay" type="number" defaultValue="0" />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="active" />
            <Label htmlFor="active">Активность</Label>
          </div>

          <div className="flex gap-2 pt-4">
            <Button className="flex-1 bg-primary hover:bg-primary/90">Сохранить</Button>
            <Button variant="outline" className="flex-1" onClick={() => setOpen(false)}>Выйти</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const PaymentMethodCard = ({ method }: { method: PaymentMethod }) => (
  <Card className="border shadow-soft hover:shadow-medium transition-shadow">
    <CardContent className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">Реквизиты</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-primary" />
              <div>
                <div className="text-xs text-muted-foreground">Система:</div>
                <div className="font-medium">{method.system}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4 text-primary" />
              <div>
                <div className="text-xs text-muted-foreground">Банк:</div>
                <div className="font-medium">{method.bank}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Smartphone className="h-4 w-4 text-primary" />
              <div>
                <div className="text-xs text-muted-foreground">Телефон:</div>
                <div className="font-medium">{method.phone}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              <div>
                <div className="text-xs text-muted-foreground">Владелец:</div>
                <div className="font-medium">{method.owner}</div>
              </div>
            </div>
          </div>
          <Badge variant="secondary">{method.currency}</Badge>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">Лимиты</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-success" />
              <div>
                <div className="text-xs text-muted-foreground">Сумма сделки</div>
                <div className="text-sm">От: {method.limits.minAmount.toLocaleString()} {method.currency}</div>
                <div className="text-sm">До: {method.limits.maxAmount.toLocaleString()} {method.currency}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4 text-primary" />
              <div>
                <div className="text-xs text-muted-foreground">Одновременно</div>
                <div className="text-sm">{method.limits.concurrent}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">Статистика</h4>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Сегодня (штук): {method.statistics.todayCount} / {method.limits.dailyCount}</span>
                <span className="text-primary">{Math.round((method.statistics.todayCount / method.limits.dailyCount) * 100)}%</span>
              </div>
              <Progress value={(method.statistics.todayCount / method.limits.dailyCount) * 100} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Месяц (штук): {method.statistics.monthCount} / {method.limits.monthlyCount}</span>
                <span className="text-primary">{Math.round((method.statistics.monthCount / method.limits.monthlyCount) * 100)}%</span>
              </div>
              <Progress value={(method.statistics.monthCount / method.limits.monthlyCount) * 100} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Сегодня (₽): {method.statistics.todayAmount.toLocaleString()} / {method.limits.dailyVolume.toLocaleString()}</span>
                <span className="text-primary">{((method.statistics.todayAmount / method.limits.dailyVolume) * 100).toFixed(1)}%</span>
              </div>
              <Progress value={(method.statistics.todayAmount / method.limits.dailyVolume) * 100} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Месяц (₽): {method.statistics.monthAmount.toLocaleString()} / {method.limits.monthlyVolume.toLocaleString()}</span>
                <span className="text-primary">{((method.statistics.monthAmount / method.limits.monthlyVolume) * 100).toFixed(1)}%</span>
              </div>
              <Progress value={(method.statistics.monthAmount / method.limits.monthlyVolume) * 100} className="h-2" />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">Действия</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm">Активен</span>
              <Switch checked={method.isActive} />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Edit className="h-3 w-3 mr-1" />
                Редактировать
              </Button>
              <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                <Trash2 className="h-3 w-3 mr-1" />
                Удалить
              </Button>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export const PaymentMethodsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Банковские реквизиты</h2>
          <p className="text-muted-foreground">Управление платежными методами</p>
        </div>
        <AddPaymentMethodDialog />
      </div>

      <div className="space-y-4">
        {mockPaymentMethods.map((method) => (
          <PaymentMethodCard key={method.id} method={method} />
        ))}
      </div>
    </div>
  );
};