import { useState } from "react";
import PageWrapper from "@/components/PageWrapper";
import DataTable from "@/components/DataTable";
import StatusBadge from "@/components/StatusBadge";
import FormModal, { FormField } from "@/components/FormModal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { mockPurchaseOrders, PurchaseOrder, mockSuppliers } from "@/lib/mock-data";
import { toast } from "sonner";

const fields: FormField[] = [
  { name: "supplier_id", label: "Supplier", type: "select", required: true, options: mockSuppliers.filter(s => s.status === "approved").map(s => ({ value: String(s.id), label: s.name })) },
  { name: "order_date", label: "Order Date", type: "date", required: true },
  { name: "expected_delivery", label: "Expected Delivery", type: "date", required: true },
  { name: "total_amount", label: "Total Amount ($)", type: "number", required: true },
];

const PurchaseOrdersPage = () => {
  const [data, setData] = useState<PurchaseOrder[]>(mockPurchaseOrders);
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<Record<string, string>>({});

  const columns = [
    { key: "id", label: "PO #" },
    { key: "supplier_name", label: "Supplier" },
    { key: "order_date", label: "Order Date" },
    { key: "expected_delivery", label: "Expected Delivery" },
    { key: "total_amount", label: "Amount", render: (r: PurchaseOrder) => `$${r.total_amount.toLocaleString()}` },
    { key: "status", label: "Status", render: (r: PurchaseOrder) => <StatusBadge status={r.status} /> },
  ];

  const handleSubmit = () => {
    const supplier = mockSuppliers.find(s => s.id === Number(values.supplier_id));
    const newOrder: PurchaseOrder = {
      id: data.length + 1,
      supplier_id: Number(values.supplier_id),
      supplier_name: supplier?.name || "",
      order_date: values.order_date,
      expected_delivery: values.expected_delivery,
      total_amount: Number(values.total_amount),
      status: "pending",
      items: [],
    };
    setData([...data, newOrder]);
    setOpen(false);
    setValues({});
    toast.success("Purchase order created");
  };

  return (
    <PageWrapper
      title="Purchase Orders"
      subtitle="Manage purchase orders"
      actions={<Button onClick={() => setOpen(true)}><Plus className="w-4 h-4 mr-2" />New Order</Button>}
    >
      <DataTable columns={columns} data={data} />
      <FormModal open={open} onClose={() => setOpen(false)} title="New Purchase Order" fields={fields} values={values} onChange={(n, v) => setValues({ ...values, [n]: v })} onSubmit={handleSubmit} />
    </PageWrapper>
  );
};

export default PurchaseOrdersPage;
