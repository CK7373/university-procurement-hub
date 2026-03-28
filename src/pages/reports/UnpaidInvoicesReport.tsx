import { useState } from "react";
import PageWrapper from "@/components/PageWrapper";
import DataTable from "@/components/DataTable";
import EmailReportModal from "@/components/EmailReportModal";
import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { mockInvoices } from "@/lib/mock-data";

const UnpaidInvoicesReport = () => {
  const [emailOpen, setEmailOpen] = useState(false);
  const unpaid = mockInvoices.filter(i => i.status !== "paid");
  const total = unpaid.reduce((s, i) => s + i.total_amount, 0);

  const columns = [
    { key: "id", label: "INV #" },
    { key: "supplier_name", label: "Supplier" },
    { key: "invoice_date", label: "Date" },
    { key: "due_date", label: "Due Date" },
    { key: "total_amount", label: "Amount", render: (r: any) => `$${r.total_amount.toLocaleString()}` },
    { key: "status", label: "Status", render: (r: any) => <StatusBadge status={r.status} /> },
  ];

  return (
    <PageWrapper
      title="Unpaid Invoices Report"
      subtitle={`Total unpaid: $${total.toLocaleString()}`}
      actions={<Button variant="outline" onClick={() => setEmailOpen(true)}><Mail className="w-4 h-4 mr-2" />Email Report</Button>}
    >
      <DataTable columns={columns} data={unpaid} />
      <EmailReportModal open={emailOpen} onClose={() => setEmailOpen(false)} reportName="Unpaid Invoices" />
    </PageWrapper>
  );
};

export default UnpaidInvoicesReport;
