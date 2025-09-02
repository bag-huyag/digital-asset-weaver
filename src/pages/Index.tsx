import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HomeDashboard } from "@/components/HomeDashboard";
import { DealsPage } from "@/components/DealsPage";
import { PaymentMethodsPage } from "@/components/PaymentMethodsPage";
import { TransactionHistoryPage } from "@/components/TransactionHistoryPage";
import { StatisticsPage } from "@/components/StatisticsPage";
import { SettingsPage } from "@/components/SettingsPage";
import { AdminPanelPage } from "@/components/AdminPanelPage";
import { 
  Home, 
  HandshakeIcon, 
  CreditCard, 
  History, 
  BarChart3, 
  Settings, 
  Shield 
} from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">P2P Trading Platform</h1>
          <p className="text-muted-foreground">Manage your trading operations</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-7 bg-card border shadow-soft">
            <TabsTrigger value="home" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Главная</span>
            </TabsTrigger>
            <TabsTrigger value="deals" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <HandshakeIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Сделки</span>
            </TabsTrigger>
            <TabsTrigger value="payment-methods" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Реквизиты</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <History className="h-4 w-4" />
              <span className="hidden sm:inline">История</span>
            </TabsTrigger>
            <TabsTrigger value="statistics" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Статистика</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Настройки</span>
            </TabsTrigger>
            <TabsTrigger value="admin" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Админ</span>
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="home" className="space-y-6">
              <HomeDashboard />
            </TabsContent>

            <TabsContent value="deals" className="space-y-6">
              <DealsPage />
            </TabsContent>

            <TabsContent value="payment-methods" className="space-y-6">
              <PaymentMethodsPage />
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <TransactionHistoryPage />
            </TabsContent>

            <TabsContent value="statistics" className="space-y-6">
              <StatisticsPage />
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <SettingsPage />
            </TabsContent>

            <TabsContent value="admin" className="space-y-6">
              <AdminPanelPage />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;