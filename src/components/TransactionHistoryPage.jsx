import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

const mockTransactions = [
  {
    id: "TXN001",
    amount: 25000,
    currency: "RUB",
    type: "deposit",
    status: "completed",
    date: "2024-09-01 14:30",
    details: "Пополнение через Т-Банк SBP"
  },
  {
    id: "TXN002", 
    amount: -15000,
    currency: "RUB",
    type: "withdrawal",
    status: "completed",
    date: "2024-09-01 16:45",
    details: "Вывод на карту ВТБ"
  },
  {
    id: "TXN003",
    amount: 8500,
    currency: "RUB", 
    type: "reward",
    status: "completed",
    date: "2024-09-02 10:20",
    details: "Комиссия с сделки #1234567891"
  },
  {
    id: "TXN004",
    amount: -22000,
    currency: "RUB",
    type: "freeze",
    status: "pending",
    date: "2024-09-02 11:15",
    details: "Заморозка по сделке #1234567892"
  },
  {
    id: "TXN005",
    amount: 12000,
    currency: "RUB",
    type: "unfreeze", 
    status: "completed",
    date: "2024-09-02 15:30",
    details: "Разморозка по сделке #1234567890"
  },
  {
    id: "TXN006",
    amount: -5000,
    currency: "RUB",
    type: "fee",
    status: "completed", 
    date: "2024-09-02 18:45",
    details: "Комиссия за обслуживание"
  },
  {
    id: "TXN007",
    amount: 45000,
    currency: "RUB",
    type: "deposit",
    status: "processing",
    date: "2024-09-03 09:15",
    details: "Пополнение через Сбербанк"
  },
  {
    id: "TXN008",
    amount: -18500,
    currency: "RUB", 
    type: "withdrawal",
    status: "failed",
    date: "2024-09-03 12:30",
    details: "Неудачный вывод на карту Альфа"
  },
  {
    id: "TXN009",
    amount: 3200,
    currency: "RUB",
    type: "reward",
    status: "completed",
    date: "2024-09-03 14:20",
    details: "Бонус за активность"
  },
  {
    id: "TXN010",
    amount: -35000,
    currency: "RUB",
    type: "withdrawal",
    status: "completed", 
    date: "2024-09-03 16:10",
    details: "Вывод на карту Т-Банк"
  },
  {
    id: "TXN011",
    amount: 67000,
    currency: "RUB",
    type: "deposit",
    status: "completed",
    date: "2024-09-04 08:45", 
    details: "Крупное пополнение через ВТБ"
  },
  {
    id: "TXN012",
    amount: 750,
    currency: "RUB",
    type: "reward",
    status: "completed",
    date: "2024-09-04 13:25",
    details: "Микрокомиссия с сделки"
  }
];

function getTypeLabel(type) {
  const typeLabels = {
    deposit: "Пополнение",
    withdrawal: "Вывод",
    reward: "Награда", 
    freeze: "Заморозка",
    unfreeze: "Разморозка",
    fee: "Комиссия"
  };
  return typeLabels[type] || type;
}

function getStatusBadge(status) {
  const statusConfig = {
    completed: { variant: "default", label: "Завершено" },
    pending: { variant: "secondary", label: "В обработке" },
    processing: { variant: "secondary", label: "Обрабатывается" },
    failed: { variant: "destructive", label: "Ошибка" }
  };

  const config = statusConfig[status] || statusConfig.pending;
  
  return (
    <Badge variant={config.variant}>
      {config.label}
    </Badge>
  );
}

function getAmountColor(amount, type) {
  if (amount > 0 && (type === "deposit" || type === "reward" || type === "unfreeze")) {
    return "text-green-600 dark:text-green-400";
  }
  if (amount < 0 && (type === "withdrawal" || type === "fee" || type === "freeze")) {
    return "text-red-600 dark:text-red-400";
  }
  return "text-foreground";
}

export const TransactionHistoryPage = () => {
  const [itemsPerPage, setItemsPerPage] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(mockTransactions.length / parseInt(itemsPerPage));
  const startIndex = (currentPage - 1) * parseInt(itemsPerPage);
  const endIndex = startIndex + parseInt(itemsPerPage);
  const currentTransactions = mockTransactions.slice(startIndex, endIndex);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(value);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-text bg-clip-text text-transparent">
            История транзакций
          </h2>
          <p className="text-muted-foreground">
            Всего транзакций: {mockTransactions.length}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Показать:</span>
          <Select value={itemsPerPage} onValueChange={handleItemsPerPageChange}>
            <SelectTrigger className="w-20 bg-background/50 border-premium-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground">записей</span>
        </div>
      </div>

      <Card className="border shadow-premium bg-gradient-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Список транзакций</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="rounded-md border-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead className="font-semibold">ID</TableHead>
                  <TableHead className="font-semibold">Сумма</TableHead>
                  <TableHead className="font-semibold">Тип</TableHead>
                  <TableHead className="font-semibold">Статус</TableHead>
                  <TableHead className="font-semibold">Дата</TableHead>
                  <TableHead className="font-semibold">Детали</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentTransactions.map((transaction) => (
                  <TableRow key={transaction.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="font-mono text-sm">
                      {transaction.id}
                    </TableCell>
                    <TableCell className={`font-medium ${getAmountColor(transaction.amount, transaction.type)}`}>
                      {transaction.amount > 0 ? '+' : ''}{transaction.amount.toLocaleString('ru-RU')} {transaction.currency === 'RUB' ? '₽' : transaction.currency}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-premium-border">
                        {getTypeLabel(transaction.type)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(transaction.status)}
                    </TableCell>
                    <TableCell className="text-sm">
                      {transaction.date}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-[200px]">
                      <div className="truncate" title={transaction.details}>
                        {transaction.details}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card className="border shadow-premium bg-gradient-card">
        <CardContent className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>
              Показано {startIndex + 1}-{Math.min(endIndex, mockTransactions.length)} из {mockTransactions.length} записей
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(1)}
              disabled={currentPage === 1}
              className="border-premium-border hover:bg-premium-primary/10"
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="border-premium-border hover:bg-premium-primary/10"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNumber;
                if (totalPages <= 5) {
                  pageNumber = i + 1;
                } else if (currentPage <= 3) {
                  pageNumber = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNumber = totalPages - 4 + i;
                } else {
                  pageNumber = currentPage - 2 + i;
                }
                
                return (
                  <Button
                    key={pageNumber}
                    variant={currentPage === pageNumber ? "default" : "outline"}
                    size="sm"
                    onClick={() => goToPage(pageNumber)}
                    className={
                      currentPage === pageNumber
                        ? "bg-premium-primary hover:bg-premium-primary/90"
                        : "border-premium-border hover:bg-premium-primary/10"
                    }
                  >
                    {pageNumber}
                  </Button>
                );
              })}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="border-premium-border hover:bg-premium-primary/10"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(totalPages)}
              disabled={currentPage === totalPages}
              className="border-premium-border hover:bg-premium-primary/10"
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="text-sm text-muted-foreground">
            Страница {currentPage} из {totalPages}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};