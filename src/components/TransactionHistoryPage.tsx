import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight,
  ExternalLink
} from "lucide-react";

interface Transaction {
  id: number;
  amount: number;
  currency: string;
  type: "reward" | "freeze" | "unfreeze" | "deposit" | "withdraw";
  status: "confirmed" | "processing" | "rejected";
  date: string;
  details?: string;
}

const mockTransactions: Transaction[] = [
  {
    id: 12930,
    amount: 0.000000,
    currency: "USDT",
    type: "reward",
    status: "confirmed",
    date: "01.09.2025, 17:13:33",
    details: ""
  },
  {
    id: 12929,
    amount: -68.322522,
    currency: "USDT",
    type: "unfreeze",
    status: "confirmed",
    date: "01.09.2025, 17:13:33",
    details: "Order: 02e530a2-363d-4bcc-b7b2-ff1af21b534f"
  },
  {
    id: 12928,
    amount: 68.322522,
    currency: "USDT",
    type: "freeze",
    status: "processing",
    date: "01.09.2025, 17:11:28",
    details: "Order: 02e530a2-363d-4bcc-b7b2-ff1af21b534f"
  },
  {
    id: 12927,
    amount: 70.000000,
    currency: "USDT",
    type: "deposit",
    status: "confirmed",
    date: "01.09.2025, 17:09:31",
    details: "Ссылка"
  },
  {
    id: 12501,
    amount: 0.000000,
    currency: "USDT",
    type: "reward",
    status: "confirmed",
    date: "30.08.2025, 20:59:40",
    details: ""
  }
];

const getTypeLabel = (type: Transaction["type"]) => {
  const types = {
    reward: "Награда",
    freeze: "Заморозка",
    unfreeze: "Разморозка",
    deposit: "Пополнение",
    withdraw: "Вывод"
  };
  return types[type] || type;
};

const getStatusBadge = (status: Transaction["status"]) => {
  switch (status) {
    case "confirmed":
      return <Badge className="bg-success text-success-foreground">Подтверждено</Badge>;
    case "processing":
      return <Badge className="bg-warning text-warning-foreground">В обработке</Badge>;
    case "rejected":
      return <Badge variant="destructive">Отклонено</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const getAmountColor = (amount: number, type: Transaction["type"]) => {
  if (amount > 0) return "text-success";
  if (amount < 0) return "text-destructive";
  return "text-foreground";
};

export const TransactionHistoryPage = () => {
  const [itemsPerPage, setItemsPerPage] = useState("50");
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalItems = mockTransactions.length;
  const totalPages = Math.ceil(totalItems / parseInt(itemsPerPage));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">История транзакций</h2>
          <p className="text-muted-foreground">
            Показано: {Math.min(parseInt(itemsPerPage), totalItems)} из {totalItems}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Элементов на странице:</span>
          <Select value={itemsPerPage} onValueChange={setItemsPerPage}>
            <SelectTrigger className="w-20">
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

      <Card className="border shadow-soft">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">ID</TableHead>
                  <TableHead className="font-semibold">Сумма</TableHead>
                  <TableHead className="font-semibold">Тип</TableHead>
                  <TableHead className="font-semibold">Статус</TableHead>
                  <TableHead className="font-semibold">Дата</TableHead>
                  <TableHead className="font-semibold">Детали</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTransactions.map((transaction) => (
                  <TableRow key={transaction.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="font-mono text-sm">{transaction.id}</TableCell>
                    <TableCell>
                      <span className={`font-semibold ${getAmountColor(transaction.amount, transaction.type)}`}>
                        {transaction.amount >= 0 ? "+" : ""}{transaction.amount.toFixed(6)} {transaction.currency}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-foreground">{getTypeLabel(transaction.type)}</span>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(transaction.status)}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {transaction.date}
                    </TableCell>
                    <TableCell>
                      {transaction.details && (
                        <div className="flex items-center gap-1">
                          <span className="text-sm text-muted-foreground">{transaction.details}</span>
                          {transaction.details.includes("Order:") && (
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <ExternalLink className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm text-muted-foreground">
          Страница {currentPage} из {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};