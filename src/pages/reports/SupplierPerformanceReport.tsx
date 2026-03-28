import { useState } from "react";
import PageWrapper from "@/components/PageWrapper";
import DataTable from "@/components/DataTable";
import EmailReportModal from "@/components/EmailReportModal";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

const performanceData = [
  { id: 1, name: "TechSupply Co.", total_orders: 1, delivered_on_time: 1, avg_delivery_days: 15, total_value: 14400, rating: "Excellent" },
  { id: 2, name: "Office Essentials Ltd", total_orders: 1, delivered_on_time: 0, avg_delivery_days: 0, total_value: 3150, rating: "Pending" },
  { id: 3, name: "Furniture World", total_orders: 1, delivered_on_time: 0, avg_delivery_days: 0, total_value: 7000, rating: "Pending" },
];

const SupplierPerformanceReport = () => {
  const [emailOpen, setEmailOpen] = useState(false);

  const columns = [
    { key: "name", label: "Supplier" },
    { key: "total_orders", label: "Total Orders" },
    { key: "delivered_on_time", label: "On-Time Deliveries" },
    { key: "avg_delivery_days", label: "Avg Delivery (days)" },
    { key: "total_value", label: "Total Value", render: (r: any) => `$${r.total_value.toLocaleString()}` },
    { key: "rating", label: "Rating", render: (r: any) => (
      <span className={`font-medium ${r.rating === "Excellent" ? "text-success" : "text-muted-foreground"}`}>{r.rating}</span>
    )},
  ];

  return (
    <PageWrapper
      title="Supplier Performance Report"
      subtitle="Delivery and performance metrics"
      actions={<Button variant="outline" onClick={() => setEmailOpen(true)}><Mail className="w-4 h-4 mr-2" />Email Report</Button>}
    >
      <DataTable columns={columns} data={performanceData} />
      <EmailReportModal open={emailOpen} onClose={() => setEmailOpen(false)} reportName="Supplier Performance" />
    </PageWrapper>
  );
};

export default SupplierPerformanceReport;
