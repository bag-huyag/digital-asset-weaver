import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Shield, Smartphone, QrCode } from "lucide-react";

export const SettingsPage = () => {
  const [twoFactorCode, setTwoFactorCode] = useState("");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Настройки</h2>
        <p className="text-muted-foreground">Управление безопасностью аккаунта</p>
      </div>

      <Card className="border shadow-soft max-w-2xl">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Подключение двухфакторной аутентификации
          </CardTitle>
        </CardHeader>
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
                <Button className="bg-primary hover:bg-primary/90">
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
      </Card>
    </div>
  );
};