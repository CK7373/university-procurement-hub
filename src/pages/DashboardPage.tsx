import PageWrapper from "@/components/PageWrapper";
import StatCard from "@/components/StatCard";
import { dashboardStats } from "@/lib/mock-data";
import { Users, FileText, ShoppingCart, Receipt, DollarSign } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { motion } from "framer-motion";

const COLORS = ["hsl(145,60%,40%)", "hsl(38,92%,50%)", "hsl(210,20%,88%)"];

const DashboardPage = () => {
  const { totalSuppliers, activeContracts, pendingOrders, unpaidInvoices, totalSpent, monthlyExpenditure, ordersByStatus, topSuppliers } = dashboardStats;

  return (
    <PageWrapper title="Dashboard" subtitle="Overview of your procurement activities">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <StatCard title="Total Suppliers" value={totalSuppliers} icon={Users} color="primary" delay={0} />
        <StatCard title="Active Contracts" value={activeContracts} icon={FileText} color="success" delay={0.05} />
        <StatCard title="Pending Orders" value={pendingOrders} icon={ShoppingCart} color="warning" delay={0.1} />
        <StatCard title="Unpaid Invoices" value={unpaidInvoices} icon={Receipt} color="destructive" delay={0.15} />
        <StatCard title="Total Spent" value={`$${totalSpent.toLocaleString()}`} icon={DollarSign} color="secondary" delay={0.2} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="lg:col-span-2 bg-card border rounded-lg shadow-sm p-5"
        >
          <h2 className="text-lg font-semibold text-foreground mb-4">Monthly Expenditure</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthlyExpenditure}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,20%,88%)" />
              <XAxis dataKey="month" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip formatter={(v: number) => `$${v.toLocaleString()}`} />
              <Bar dataKey="amount" fill="hsl(220,60%,25%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card border rounded-lg shadow-sm p-5"
        >
          <h2 className="text-lg font-semibold text-foreground mb-4">Orders by Status</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={ordersByStatus} dataKey="count" nameKey="status" cx="50%" cy="50%" outerRadius={70} label={(e) => e.status}>
                {ordersByStatus.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <h3 className="text-sm font-semibold text-foreground mt-4 mb-2">Top Suppliers</h3>
          <div className="space-y-2">
            {topSuppliers.map((s, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{s.name}</span>
                <span className="font-medium text-foreground">${s.total.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  );
};

export default DashboardPage;
