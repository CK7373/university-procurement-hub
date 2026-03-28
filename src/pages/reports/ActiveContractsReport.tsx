import { useState } from "react";
import PageWrapper from "@/components/PageWrapper";
import DataTable from "@/components/DataTable";
import EmailReportModal from "@/components/EmailReportModal";
import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { mockContracts } from "@/lib/mock-data";

const ActiveContractsReport = () => {
  const [emailOpen, setEmailOpen] = useState(false);
  const active = mockContracts.filter(c => c.status === "active");

  const columns = [
    { key: "id", label: "Contract #" },
    { key: "supplier_name", label: "Supplier" },
    { key: "start_date", label: "Start" },
    { key: "end_date", label: "End" },
    { key: "total_value", label: "Value", render: (r: any) => `$${r.total_value.toLocaleString()}` },
    { key: "status", label: "Status", render: (r: any) => <StatusBadge status={r.status} /> },
  ];

  return (
    <PageWrapper
      title="Active Contracts Report"
      subtitle={`${active.length} active contracts`}
      actions={<Button variant="outline" onClick={() => setEmailOpen(true)}><Mail className="w-4 h-4 mr-2" />Email Report</Button>}
    >
      <DataTable columns={columns} data={active} />
      <EmailReportModal open={emailOpen} onClose={() => setEmailOpen(false)} reportName="Active Contracts" />
    </PageWrapper>
  );
};

export default ActiveContractsReport;
