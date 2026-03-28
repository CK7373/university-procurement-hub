import { useState } from "react";
import PageWrapper from "@/components/PageWrapper";
import DataTable from "@/components/DataTable";
import StatusBadge from "@/components/StatusBadge";
import FormModal, { FormField } from "@/components/FormModal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { mockContracts, Contract, mockSuppliers } from "@/lib/mock-data";
import { toast } from "sonner";

const fields: FormField[] = [
  { name: "supplier_id", label: "Supplier", type: "select", required: true, options: mockSuppliers.filter(s => s.status === "approved").map(s => ({ value: String(s.id), label: s.name })) },
  { name: "start_date", label: "Start Date", type: "date", required: true },
  { name: "end_date", label: "End Date", type: "date", required: true },
  { name: "total_value", label: "Total Value ($)", type: "number", required: true },
];

const ContractsPage = () => {
  const [data, setData] = useState<Contract[]>(mockContracts);
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<Record<string, string>>({});

  const columns = [
    { key: "id", label: "ID" },
    { key: "supplier_name", label: "Supplier" },
    { key: "start_date", label: "Start" },
    { key: "end_date", label: "End" },
    { key: "total_value", label: "Value", render: (r: Contract) => `$${r.total_value.toLocaleString()}` },
    { key: "status", label: "Status", render: (r: Contract) => <StatusBadge status={r.status} /> },
  ];

  const handleSubmit = () => {
    const supplier = mockSuppliers.find(s => s.id === Number(values.supplier_id));
    const newContract: Contract = {
      id: data.length + 1,
      supplier_id: Number(values.supplier_id),
      supplier_name: supplier?.name || "",
      start_date: values.start_date,
      end_date: values.end_date,
      total_value: Number(values.total_value),
      status: "active",
      items: [],
    };
    setData([...data, newContract]);
    setOpen(false);
    setValues({});
    toast.success("Contract created");
  };

  return (
    <PageWrapper
      title="Contracts"
      subtitle="Manage supplier contracts"
      actions={<Button onClick={() => setOpen(true)}><Plus className="w-4 h-4 mr-2" />New Contract</Button>}
    >
      <DataTable columns={columns} data={data} />
      <FormModal open={open} onClose={() => setOpen(false)} title="New Contract" fields={fields} values={values} onChange={(n, v) => setValues({ ...values, [n]: v })} onSubmit={handleSubmit} />
    </PageWrapper>
  );
};

export default ContractsPage;
