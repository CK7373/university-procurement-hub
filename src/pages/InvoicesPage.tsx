import { useState } from "react";
import PageWrapper from "@/components/PageWrapper";
import DataTable from "@/components/DataTable";
import StatusBadge from "@/components/StatusBadge";
import FormModal, { FormField } from "@/components/FormModal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { mockInvoices, Invoice, mockPurchaseOrders } from "@/lib/mock-data";
import { toast } from "sonner";

const fields: FormField[] = [
  { name: "order_id", label: "Purchase Order", type: "select", required: true, options: mockPurchaseOrders.map(o => ({ value: String(o.id), label: `PO #${o.id} - ${o.supplier_name}` })) },
  { name: "invoice_date", label: "Invoice Date", type: "date", required: true },
  { name: "due_date", label: "Due Date", type: "date", required: true },
  { name: "total_amount", label: "Total Amount ($)", type: "number", required: true },
];

const InvoicesPage = () => {
  const [data, setData] = useState<Invoice[]>(mockInvoices);
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<Record<string, string>>({});

  const columns = [
    { key: "id", label: "INV #" },
    { key: "supplier_name", label: "Supplier" },
    { key: "invoice_date", label: "Date" },
    { key: "due_date", label: "Due Date" },
    { key: "total_amount", label: "Amount", render: (r: Invoice) => `$${r.total_amount.toLocaleString()}` },
    { key: "status", label: "Status", render: (r: Invoice) => <StatusBadge status={r.status} /> },
  ];

  const handleSubmit = () => {
    const order = mockPurchaseOrders.find(o => o.id === Number(values.order_id));
    const newInvoice: Invoice = {
      id: data.length + 1,
      order_id: Number(values.order_id),
      supplier_name: order?.supplier_name || "",
      invoice_date: values.invoice_date,
      due_date: values.due_date,
      total_amount: Number(values.total_amount),
      status: "unpaid",
    };
    setData([...data, newInvoice]);
    setOpen(false);
    setValues({});
    toast.success("Invoice added");
  };

  return (
    <PageWrapper
      title="Invoices"
      subtitle="Track supplier invoices"
      actions={<Button onClick={() => setOpen(true)}><Plus className="w-4 h-4 mr-2" />Add Invoice</Button>}
    >
      <DataTable columns={columns} data={data} />
      <FormModal open={open} onClose={() => setOpen(false)} title="Add Invoice" fields={fields} values={values} onChange={(n, v) => setValues({ ...values, [n]: v })} onSubmit={handleSubmit} />
    </PageWrapper>
  );
};

export default InvoicesPage;
