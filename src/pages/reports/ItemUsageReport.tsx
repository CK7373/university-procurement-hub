import { useState } from "react";
import PageWrapper from "@/components/PageWrapper";
import DataTable from "@/components/DataTable";
import EmailReportModal from "@/components/EmailReportModal";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

const itemUsageData = [
  { id: 1, name: "Laptop Computer", category: "Electronics", total_ordered: 10, total_value: 12000 },
  { id: 2, name: "Projector", category: "Electronics", total_ordered: 3, total_value: 2400 },
  { id: 3, name: "Printer Paper", category: "Stationery", total_ordered: 150, total_value: 2250 },
  { id: 4, name: "Whiteboard Marker", category: "Stationery", total_ordered: 75, total_value: 600 },
  { id: 5, name: "Office Chair", category: "Furniture", total_ordered: 20, total_value: 7000 },
];

const ItemUsageReport = () => {
  const [emailOpen, setEmailOpen] = useState(false);

  const columns = [
    { key: "name", label: "Item" },
    { key: "category", label: "Category" },
    { key: "total_ordered", label: "Qty Ordered" },
    { key: "total_value", label: "Total Value", render: (r: any) => `$${r.total_value.toLocaleString()}` },
  ];

  return (
    <PageWrapper
      title="Item Usage Report"
      subtitle="Usage breakdown by item"
      actions={<Button variant="outline" onClick={() => setEmailOpen(true)}><Mail className="w-4 h-4 mr-2" />Email Report</Button>}
    >
      <DataTable columns={columns} data={itemUsageData} />
      <EmailReportModal open={emailOpen} onClose={() => setEmailOpen(false)} reportName="Item Usage" />
    </PageWrapper>
  );
};

export default ItemUsageReport;
