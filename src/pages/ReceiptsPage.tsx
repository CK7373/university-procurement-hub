import { useState } from "react";
import PageWrapper from "@/components/PageWrapper";
import DataTable from "@/components/DataTable";
import FormModal, { FormField } from "@/components/FormModal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { mockReceipts, Receipt, mockPayments } from "@/lib/mock-data";
import { toast } from "sonner";

const fields: FormField[] = [
  { name: "payment_id", label: "Payment", type: "select", required: true, options: mockPayments.map(p => ({ value: String(p.id), label: `PAY #${p.id} - ${p.supplier_name} ($${p.amount})` })) },
  { name: "receipt_date", label: "Receipt Date", type: "date", required: true },
  { name: "receipt_number", label: "Receipt Number", type: "text", required: true },
];

const ReceiptsPage = () => {
  const [data, setData] = useState<Receipt[]>(mockReceipts);
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<Record<string, string>>({});

  const columns = [
    { key: "id", label: "ID" },
    { key: "receipt_number", label: "Receipt #" },
    { key: "supplier_name", label: "Supplier" },
    { key: "receipt_date", label: "Date" },
    { key: "amount", label: "Amount", render: (r: Receipt) => `$${r.amount.toLocaleString()}` },
  ];

  const handleSubmit = () => {
    const payment = mockPayments.find(p => p.id === Number(values.payment_id));
    const newReceipt: Receipt = {
      id: data.length + 1,
      payment_id: Number(values.payment_id),
      supplier_name: payment?.supplier_name || "",
      receipt_date: values.receipt_date,
      amount: payment?.amount || 0,
      receipt_number: values.receipt_number,
    };
    setData([...data, newReceipt]);
    setOpen(false);
    setValues({});
    toast.success("Receipt recorded");
  };

  return (
    <PageWrapper
      title="Receipts"
      subtitle="Track supplier receipts"
      actions={<Button onClick={() => setOpen(true)}><Plus className="w-4 h-4 mr-2" />Add Receipt</Button>}
    >
      <DataTable columns={columns} data={data} />
      <FormModal open={open} onClose={() => setOpen(false)} title="Add Receipt" fields={fields} values={values} onChange={(n, v) => setValues({ ...values, [n]: v })} onSubmit={handleSubmit} />
    </PageWrapper>
  );
};

export default ReceiptsPage;
