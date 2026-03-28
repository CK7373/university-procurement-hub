import { useState } from "react";
import PageWrapper from "@/components/PageWrapper";
import DataTable from "@/components/DataTable";
import EmailReportModal from "@/components/EmailReportModal";
import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { mockPurchaseOrders } from "@/lib/mock-data";

const OpenOrdersReport = () => {
  const [emailOpen, setEmailOpen] = useState(false);
  const pending = mockPurchaseOrders.filter(o => o.status === "pending").map(o => {
    const expected = new Date(o.expected_delivery);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - expected.getTime()) / (1000 * 60 * 60 * 24));
    return { ...o, overdue_days: diffDays > 0 ? diffDays : 0 };
  });

  const columns = [
    { key: "id", label: "PO #" },
    { key: "supplier_name", label: "Supplier" },
    { key: "order_date", label: "Order Date" },
    { key: "expected_delivery", label: "Expected Delivery" },
    { key: "total_amount", label: "Amount", render: (r: any) => `$${r.total_amount.toLocaleString()}` },
    { key: "overdue_days", label: "Overdue Days", render: (r: any) => (
      <span className={r.overdue_days > 0 ? "text-destructive font-medium" : "text-muted-foreground"}>
        {r.overdue_days > 0 ? `${r.overdue_days} days` : "On time"}
      </span>
    )},
    { key: "status", label: "Status", render: (r: any) => <StatusBadge status={r.status} /> },
  ];

  return (
    <PageWrapper
      title="Open Orders Report"
      subtitle={`${pending.length} open orders`}
      actions={<Button variant="outline" onClick={() => setEmailOpen(true)}><Mail className="w-4 h-4 mr-2" />Email Report</Button>}
    >
      <DataTable columns={columns} data={pending} />
      <EmailReportModal open={emailOpen} onClose={() => setEmailOpen(false)} reportName="Open Orders" />
    </PageWrapper>
  );
};

export default OpenOrdersReport;
