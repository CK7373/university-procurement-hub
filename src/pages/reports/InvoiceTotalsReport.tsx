import { useState } from "react";
import PageWrapper from "@/components/PageWrapper";
import DataTable from "@/components/DataTable";
import EmailReportModal from "@/components/EmailReportModal";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { mockInvoices } from "@/lib/mock-data";

const InvoiceTotalsReport = () => {
  const [emailOpen, setEmailOpen] = useState(false);
  const total = mockInvoices.reduce((s, i) => s + i.total_amount, 0);

  const columns = [
    { key: "id", label: "INV #" },
    { key: "supplier_name", label: "Supplier" },
    { key: "invoice_date", label: "Date" },
    { key: "total_amount", label: "Amount", render: (r: any) => `$${r.total_amount.toLocaleString()}` },
    { key: "status", label: "Status" },
  ];

  return (
    <PageWrapper
      title="Invoice Totals Report"
      subtitle={`Total: $${total.toLocaleString()}`}
      actions={<Button variant="outline" onClick={() => setEmailOpen(true)}><Mail className="w-4 h-4 mr-2" />Email Report</Button>}
    >
      <DataTable columns={columns} data={mockInvoices} />
      <EmailReportModal open={emailOpen} onClose={() => setEmailOpen(false)} reportName="Invoice Totals" />
    </PageWrapper>
  );
};

export default InvoiceTotalsReport;
