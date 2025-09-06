import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  CreditCard, 
  Smartphone, 
  Building, 
  Plus, 
  Edit, 
  Trash2 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockPaymentMethods = [
  {
    id: "1",
    type: "card",
    bank: "Т-Банк",
    details: "•••• 1234",
    cardHolder: "Иван Иванов",
    isActive: true,
    balance: "₽50,000",
    limits: "₽10,000 - ₽100,000"
  },
  {
    id: "2",
    type: "sbp",
    bank: "Сбербанк",
    details: "+7 999 123-45-67",
    cardHolder: "Иван Иванов",
    isActive: true,
    balance: "₽75,000",
    limits: "₽5,000 - ₽200,000"
  },
  {
    id: "3",
    type: "card",
    bank: "ВТБ",
    details: "•••• 5678",
    cardHolder: "Иван Иванов",
    isActive: false,
    balance: "₽25,000",
    limits: "₽15,000 - ₽150,000"
  },
  {
    id: "4",
    type: "sbp",
    bank: "Альфа-Банк",
    details: "+7 999 987-65-43",
    cardHolder: "Иван Иванов",
    isActive: true,
    balance: "₽120,000",
    limits: "₽8,000 - ₽300,000"
  }
];

function getPaymentIcon(type) {
  switch (type) {
    case "card":
      return CreditCard;
    case "sbp":
      return Smartphone;
    default:
      return Building;
  }
}

function getPaymentTypeLabel(type) {
  switch (type) {
    case "card":
      return "Банковская карта";
    case "sbp":
      return "СБП";
    default:
      return "Другое";
  }
}

export const PaymentMethodsPage = () => {
  const { toast } = useToast();
  const [paymentMethods, setPaymentMethods] = useState(mockPaymentMethods);
  const [newMethodBank, setNewMethodBank] = useState("");
  const [newMethodDetails, setNewMethodDetails] = useState("");
  const [newMethodHolder, setNewMethodHolder] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const handleToggleActive = (id) => {
    setPaymentMethods(prevMethods =>
      prevMethods.map(method =>
        method.id === id
          ? { ...method, isActive: !method.isActive }
          : method
      )
    );
    
    const method = paymentMethods.find(m => m.id === id);
    const newStatus = !method.isActive ? "включён" : "отключён";
    
    toast({
      title: "Реквизит обновлён",
      description: `Реквизит ${method.bank} ${newStatus}`,
    });
  };

  const handleAddPaymentMethod = () => {
    if (!newMethodBank || !newMethodDetails || !newMethodHolder) {
      toast({
        title: "Ошибка",
        description: "Заполните все поля",
        variant: "destructive"
      });
      return;
    }

    const newMethod = {
      id: Date.now().toString(),
      type: newMethodDetails.includes("+7") ? "sbp" : "card",
      bank: newMethodBank,
      details: newMethodDetails,
      cardHolder: newMethodHolder,
      isActive: true,
      balance: "₽0",
      limits: "₽1,000 - ₽50,000"
    };

    setPaymentMethods(prev => [...prev, newMethod]);
    setNewMethodBank("");
    setNewMethodDetails("");
    setNewMethodHolder("");
    setShowAddForm(false);

    toast({
      title: "Реквизит добавлен",
      description: "Новый платёжный реквизит успешно добавлен",
    });
  };

  const handleDeletePaymentMethod = (id) => {
    setPaymentMethods(prev => prev.filter(method => method.id !== id));
    toast({
      title: "Реквизит удалён",
      description: "Платёжный реквизит успешно удалён",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-text bg-clip-text text-transparent">
            Платёжные реквизиты
          </h2>
          <p className="text-muted-foreground">
            Управляйте вашими способами оплаты
          </p>
        </div>
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-premium-primary hover:bg-premium-primary/90 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Добавить реквизит
        </Button>
      </div>

      {showAddForm && (
        <Card className="border shadow-premium bg-gradient-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Добавить новый реквизит</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bank">Банк</Label>
                <Input
                  id="bank"
                  placeholder="Название банка"
                  value={newMethodBank}
                  onChange={(e) => setNewMethodBank(e.target.value)}
                  className="bg-background/50 border-premium-border focus:border-premium-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="details">Реквизиты</Label>
                <Input
                  id="details"
                  placeholder="Номер карты или телефона"
                  value={newMethodDetails}
                  onChange={(e) => setNewMethodDetails(e.target.value)}
                  className="bg-background/50 border-premium-border focus:border-premium-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="holder">Владелец</Label>
                <Input
                  id="holder"
                  placeholder="ФИО владельца"
                  value={newMethodHolder}
                  onChange={(e) => setNewMethodHolder(e.target.value)}
                  className="bg-background/50 border-premium-border focus:border-premium-primary"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={handleAddPaymentMethod}
                className="bg-premium-primary hover:bg-premium-primary/90"
              >
                Добавить
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowAddForm(false)}
                className="border-premium-border hover:bg-premium-primary/10"
              >
                Отмена
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {paymentMethods.map((method) => {
          const Icon = getPaymentIcon(method.type);
          
          return (
            <Card 
              key={method.id} 
              className={`border shadow-premium transition-all duration-300 hover:shadow-glow ${
                method.isActive 
                  ? 'bg-gradient-card border-premium-primary/20' 
                  : 'bg-muted/50 border-muted'
              }`}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      method.isActive 
                        ? 'bg-premium-primary/10 text-premium-primary' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{method.bank}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {getPaymentTypeLabel(method.type)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={method.isActive}
                      onCheckedChange={() => handleToggleActive(method.id)}
                    />
                    <span className="text-sm font-medium">
                      {method.isActive ? 'Вкл' : 'Выкл'}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Реквизиты:</span>
                    <span className="font-mono text-sm">{method.details}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Владелец:</span>
                    <span className="text-sm">{method.cardHolder}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Баланс:</span>
                    <span className="font-medium text-premium-primary">{method.balance}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Лимиты:</span>
                    <span className="text-sm">{method.limits}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <Badge 
                    variant={method.isActive ? "default" : "secondary"}
                    className={method.isActive 
                      ? "bg-premium-primary/10 text-premium-primary border-premium-primary/20" 
                      : ""
                    }
                  >
                    {method.isActive ? "Активен" : "Отключён"}
                  </Badge>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-premium-border hover:bg-premium-primary/10"
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleDeletePaymentMethod(method.id)}
                      className="border-destructive/20 text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="border shadow-premium bg-gradient-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Статистика реквизитов</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold bg-gradient-text bg-clip-text text-transparent">
                {paymentMethods.length}
              </div>
              <p className="text-sm text-muted-foreground">Всего реквизитов</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-premium-primary">
                {paymentMethods.filter(m => m.isActive).length}
              </div>
              <p className="text-sm text-muted-foreground">Активных</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-muted-foreground">
                {paymentMethods.filter(m => !m.isActive).length}
              </div>
              <p className="text-sm text-muted-foreground">Отключённых</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};