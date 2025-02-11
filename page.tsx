"use client"

import { Search, Settings, Bell } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

// Import chart components
import { Bar, Pie } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from "chart.js"

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend)

export default function Dashboard() {
  // Weekly activity chart data
  const barData = {
    labels: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "Deposit",
        data: [200, 120, 250, 350, 150, 300, 350],
        backgroundColor: "#16dbcc",
      },
      {
        label: "Withdraw",
        data: [150, 100, 200, 300, 200, 250, 300],
        backgroundColor: "#fe5c73",
      },
    ],
  }

  // Expense statistics chart data
  const pieData = {
    labels: ["Entertainment", "Bill Expense", "Others", "Investment"],
    datasets: [
      {
        data: [30, 15, 35, 20],
        backgroundColor: ["#343c6a", "#ef7925", "#1814f3", "#ff82ac"],
      },
    ],
  }

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <img src="/placeholder.svg?height=40&width=40" alt="Logo" className="h-10" />
            <h1 className="text-2xl font-semibold">Dashboard</h1>
          </div>

          <div className="flex-1 max-w-xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input placeholder="Search for something" className="pl-10 bg-[#f5f7fa]" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback>US</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Table Section */}
          <div className="col-span-12 bg-white rounded-lg p-6">
            <div className="flex gap-4 mb-6">
              <Select defaultValue="vendor">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Vendor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vendor">Vendor</SelectItem>
                  <SelectItem value="zebra">Zebra</SelectItem>
                </SelectContent>
              </Select>
              <Input placeholder="Selecione o informe o campo..." className="max-w-sm" />
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>On Hand</TableHead>
                    <TableHead>Dia Mais</TableHead>
                    <TableHead>Dia Atual</TableHead>
                    <TableHead>Lead Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array(7)
                    .fill(null)
                    .map((_, i) => (
                      <TableRow key={i}>
                        <TableCell>Zebra</TableCell>
                        <TableCell>Coletor com teclado</TableCell>
                        <TableCell>228</TableCell>
                        <TableCell>228</TableCell>
                        <TableCell>228</TableCell>
                        <TableCell>228</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Charts Section */}
          <div className="col-span-8">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <Bar data={barData} options={{ responsive: true }} />
              </CardContent>
            </Card>
          </div>

          <div className="col-span-4">
            <Card>
              <CardHeader>
                <CardTitle>Expense Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <Pie data={pieData} options={{ responsive: true }} />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

