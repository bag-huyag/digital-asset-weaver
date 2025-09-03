import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Shield, Smartphone, QrCode, ShieldOff } from "lucide-react";

export const SettingsPage = () => {
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Настройки</h2>
        <p className="text-muted-foreground">Управление безопасностью аккаунта</p>
      </div>

      {/* 2FA Status Card */}
      <Card className="border shadow-premium max-w-2xl bg-gradient-card">
        <CardHeader>
          <CardTitle className="text-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Двухфакторная аутентификация
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {twoFactorEnabled ? "Включена" : "Отключена"}
              </span>
              <Switch 
                checked={twoFactorEnabled} 
                onCheckedChange={setTwoFactorEnabled}
              />
            </div>
          </CardTitle>
        </CardHeader>
        {twoFactorEnabled ? (
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-3">Отсканируйте QR-код в Google Authenticator:</h3>
                <div className="flex justify-center">
                  <div className="w-48 h-48 bg-muted border-2 border-dashed border-border rounded-lg flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <QrCode className="h-12 w-12 mx-auto text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">QR Code</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="auth-code" className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  Введите код из приложения
                </Label>
                <div className="space-y-3">
                  <Input
                    id="auth-code"
                    placeholder="Код из Google Authenticator"
                    value={twoFactorCode}
                    onChange={(e) => setTwoFactorCode(e.target.value)}
                    className="max-w-sm"
                  />
                  <Button className="bg-gradient-primary hover:opacity-90 transition-opacity">
                    Подтвердить
                  </Button>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  Инструкции по настройке 2FA
                </h4>
                <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                  <li>Установите приложение Google Authenticator на свой телефон</li>
                  <li>Откройте приложение и нажмите "+"</li>
                  <li>Выберите "Сканировать QR-код"</li>
                  <li>Отсканируйте QR-код выше</li>
                  <li>Введите 6-значный код из приложения в поле выше</li>
                  <li>Нажмите "Подтвердить" для активации 2FA</li>
                </ol>
              </div>
            </div>
          </CardContent>
        ) : (
          <CardContent>
            <div className="flex items-center justify-center py-8">
              <div className="text-center space-y-4">
                <ShieldOff className="h-16 w-16 mx-auto text-muted-foreground" />
                <div>
                  <h3 className="text-lg font-medium">2FA отключена</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Включите переключатель выше, чтобы настроить двухфакторную аутентификацию
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Additional Security Settings */}
      <Card className="border shadow-premium max-w-2xl bg-gradient-card">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Дополнительная безопасность
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Уведомления о входе</h4>
              <p className="text-sm text-muted-foreground">Получать уведомления при входе с нового устройства</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Автоматический выход</h4>
              <p className="text-sm text-muted-foreground">Автоматически выходить из системы после 30 минут бездействия</p>
            </div>
            <Switch />
          </div>

          <div className="pt-4 border-t border-border">
            <Button variant="outline" className="w-full">
              Изменить пароль
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};