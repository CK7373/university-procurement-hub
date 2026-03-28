import { useState } from "react";
import PageWrapper from "@/components/PageWrapper";
import DataTable from "@/components/DataTable";
import FormModal, { FormField } from "@/components/FormModal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { mockPayments, Payment, mockInvoices } from "@/lib/mock-data";
import { toast } from "sonner";

const fields: FormField[] = [
  { name: "invoice_id", label: "Invoice", type: "select", required: true, options: mockInvoices.filter(i => i.status !== "paid").map(i => ({ value: String(i.id), label: `INV #${i.id} - ${i.supplier_name} ($${i.total_amount})` })) },
  { name: "payment_date", label: "Payment Date", type: "date", required: true },
  { name: "amount", label: "Amount ($)", type: "number", required: true },
  { name: "method", label: "Method", type: "select", options: [
    { value: "Bank Transfer", label: "Bank Transfer" },
    { value: "Check", label: "Check" },
    { value: "Credit Card", label: "Credit Card" },
  ]},
  { name: "reference", label: "Reference", type: "text", required: true },
];

const PaymentsPage = () => {
  const [data, setData] = useState<Payment[]>(mockPayments);
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<Record<string, string>>({});

  const columns = [
    { key: "id", label: "ID" },
    { key: "supplier_name", label: "Supplier" },
    { key: "payment_date", label: "Date" },
    { key: "amount", label: "Amount", render: (r: Payment) => `$${r.amount.toLocaleString()}` },
    { key: "method", label: "Method" },
    { key: "reference", label: "Reference" },
  ];

  const handleSubmit = () => {
    const invoice = mockInvoices.find(i => i.id === Number(values.invoice_id));
    const newPayment: Payment = {
      id: data.length + 1,
      invoice_id: Number(values.invoice_id),
      supplier_name: invoice?.supplier_name || "",
      payment_date: values.payment_date,
      amount: Number(values.amount),
      method: values.method,
      reference: values.reference,
    };
    setData([...data, newPayment]);
    setOpen(false);
    setValues({});
    toast.success("Payment recorded");
  };

  return (
    <PageWrapper
      title="Payments"
      subtitle="Record and track payments"
      actions={<Button onClick={() => setOpen(true)}><Plus className="w-4 h-4 mr-2" />Record Payment</Button>}
    >
      <DataTable columns={columns} data={data} />
      <FormModal open={open} onClose={() => setOpen(false)} title="Record Payment" fields={fields} values={values} onChange={(n, v) => setValues({ ...values, [n]: v })} onSubmit={handleSubmit} />
    </PageWrapper>
  );
};

export default PaymentsPage;
