import { useState } from "react";
import PageWrapper from "@/components/PageWrapper";
import EmailReportModal from "@/components/EmailReportModal";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { dashboardStats } from "@/lib/mock-data";

const MonthlyExpenditureReport = () => {
  const [emailOpen, setEmailOpen] = useState(false);
  const total = dashboardStats.monthlyExpenditure.reduce((s, m) => s + m.amount, 0);

  return (
    <PageWrapper
      title="Monthly Expenditure Report"
      subtitle={`YTD Total: $${total.toLocaleString()}`}
      actions={<Button variant="outline" onClick={() => setEmailOpen(true)}><Mail className="w-4 h-4 mr-2" />Email Report</Button>}
    >
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card border rounded-lg shadow-sm p-6">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={dashboardStats.monthlyExpenditure}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,20%,88%)" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(v: number) => `$${v.toLocaleString()}`} />
            <Bar dataKey="amount" fill="hsl(220,60%,25%)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
      <EmailReportModal open={emailOpen} onClose={() => setEmailOpen(false)} reportName="Monthly Expenditure" />
    </PageWrapper>
  );
};

export default MonthlyExpenditureReport;
