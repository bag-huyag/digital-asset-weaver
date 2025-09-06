import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { QrCode, Shield, Bell, LogOut, Key, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const SettingsPage = () => {
  const { toast } = useToast();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [loginNotifications, setLoginNotifications] = useState(true);
  const [autoLogout, setAutoLogout] = useState(false);
  const [showQr, setShowQr] = useState(false);

  const handleTwoFactorToggle = (enabled) => {
    setTwoFactorEnabled(enabled);
    if (enabled) {
      setShowQr(true);
      toast({
        title: "2FA включена",
        description: "Двухфакторная аутентификация активирована",
      });
    } else {
      setShowQr(false);
      toast({
        title: "2FA отключена",
        description: "Двухфакторная аутентификация деактивирована",
      });
    }
  };

  const handleSetupTwoFactor = () => {
    if (twoFactorCode.length === 6) {
      toast({
        title: "2FA настроена",
        description: "Двухфакторная аутентификация успешно настроена",
      });
      setShowQr(false);
    } else {
      toast({
        title: "Ошибка",
        description: "Введите корректный 6-значный код",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold bg-gradient-text bg-clip-text text-transparent">
          Настройки безопасности
        </h2>
        <p className="text-muted-foreground">
          Управляйте настройками безопасности вашего аккаунта
        </p>
      </div>

      {/* Двухфакторная аутентификация */}
      <Card className="border shadow-premium bg-gradient-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-premium-primary/10">
                <Shield className="h-5 w-5 text-premium-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">Двухфакторная аутентификация (2FA)</CardTitle>
                <CardDescription>
                  Дополнительный уровень защиты для вашего аккаунта
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={twoFactorEnabled}
                onCheckedChange={handleTwoFactorToggle}
              />
              <Badge variant={twoFactorEnabled ? "default" : "secondary"}>
                {twoFactorEnabled ? "Включена" : "Отключена"}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {twoFactorEnabled ? (
            <div className="space-y-4">
              {showQr && (
                <div className="p-4 border border-premium-border rounded-lg bg-background/50 space-y-4">
                  <div className="flex items-center space-x-3">
                    <QrCode className="h-5 w-5 text-premium-primary" />
                    <span className="font-medium">Настройка 2FA</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="w-48 h-48 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mx-auto">
                        <div className="text-center text-gray-500">
                          <QrCode className="h-12 w-12 mx-auto mb-2" />
                          <p className="text-sm">QR-код для<br />аутентификатора</p>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground text-center">
                        Отсканируйте QR-код в приложении Google Authenticator или Authy
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="2fa-code">Код подтверждения</Label>
                        <Input
                          id="2fa-code"
                          type="text"
                          placeholder="Введите 6-значный код"
                          value={twoFactorCode}
                          onChange={(e) => setTwoFactorCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                          className="bg-background/50 border-premium-border focus:border-premium-primary"
                          maxLength="6"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-medium">Инструкции:</h4>
                        <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                          <li>Установите Google Authenticator или Authy</li>
                          <li>Отсканируйте QR-код</li>
                          <li>Введите 6-значный код из приложения</li>
                          <li>Нажмите "Подтвердить настройку"</li>
                        </ol>
                      </div>
                      
                      <Button 
                        onClick={handleSetupTwoFactor}
                        className="w-full bg-premium-primary hover:bg-premium-primary/90"
                        disabled={twoFactorCode.length !== 6}
                      >
                        Подтвердить настройку
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              
              {!showQr && (
                <div className="p-4 border border-premium-primary/20 rounded-lg bg-premium-primary/5">
                  <div className="flex items-center space-x-2 text-premium-primary">
                    <Shield className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      Двухфакторная аутентификация активна и защищает ваш аккаунт
                    </span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 border border-muted rounded-lg bg-muted/20">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Shield className="h-4 w-4" />
                <span className="text-sm">
                  Двухфакторная аутентификация отключена. Включите её для повышения безопасности.
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Уведомления и безопасность */}
      <Card className="border shadow-premium bg-gradient-card">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-premium-primary/10">
              <Bell className="h-5 w-5 text-premium-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Уведомления и безопасность</CardTitle>
              <CardDescription>
                Настройте уведомления и параметры безопасности
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="login-notifications" className="text-sm font-medium">
                Уведомления о входе в систему
              </Label>
              <p className="text-xs text-muted-foreground">
                Получать уведомления при входе с нового устройства
              </p>
            </div>
            <Switch
              id="login-notifications"
              checked={loginNotifications}
              onCheckedChange={setLoginNotifications}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="auto-logout" className="text-sm font-medium">
                Автоматический выход
              </Label>
              <p className="text-xs text-muted-foreground">
                Автоматически выходить из системы после 30 минут неактивности
              </p>
            </div>
            <Switch
              id="auto-logout"
              checked={autoLogout}
              onCheckedChange={setAutoLogout}
            />
          </div>

          <div className="pt-4 border-t border-border/50">
            <Button 
              variant="outline" 
              className="w-full border-premium-border hover:bg-premium-primary/10"
            >
              <Key className="h-4 w-4 mr-2" />
              Изменить пароль
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Активные сессии */}
      <Card className="border shadow-premium bg-gradient-card">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-premium-primary/10">
              <Eye className="h-5 w-5 text-premium-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Активные сессии</CardTitle>
              <CardDescription>
                Управляйте устройствами, с которых осуществлён вход
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border border-premium-border rounded-lg bg-background/50">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">Текущая сессия</p>
                  <p className="text-xs text-muted-foreground">
                    Chrome на Windows • Москва, Россия • Сейчас
                  </p>
                </div>
              </div>
              <Badge variant="secondary">Активна</Badge>
            </div>

            <div className="flex items-center justify-between p-3 border border-muted rounded-lg bg-muted/20">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">Mobile приложение</p>
                  <p className="text-xs text-muted-foreground">
                    iOS Safari • Москва, Россия • 2 часа назад
                  </p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="text-xs">
                Завершить
              </Button>
            </div>
          </div>

          <Button 
            variant="outline" 
            className="w-full border-destructive/20 text-destructive hover:bg-destructive/10"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Завершить все другие сессии
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};