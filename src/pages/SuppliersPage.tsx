import { useState } from "react";
import PageWrapper from "@/components/PageWrapper";
import DataTable from "@/components/DataTable";
import StatusBadge from "@/components/StatusBadge";
import FormModal, { FormField } from "@/components/FormModal";
import { Button } from "@/components/ui/button";
import { Plus, CheckCircle, XCircle } from "lucide-react";
import { mockSuppliers, Supplier } from "@/lib/mock-data";
import { toast } from "sonner";

const fields: FormField[] = [
  { name: "name", label: "Company Name", type: "text", required: true },
  { name: "contact_person", label: "Contact Person", type: "text", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "phone", label: "Phone", type: "text", required: true },
  { name: "address", label: "Address", type: "text", required: true },
];

const SuppliersPage = () => {
  const [data, setData] = useState<Supplier[]>(mockSuppliers);
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<Record<string, string>>({});

  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Company Name" },
    { key: "contact_person", label: "Contact" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "status", label: "Status", render: (r: Supplier) => <StatusBadge status={r.status} /> },
    { key: "actions", label: "Actions", render: (r: Supplier) => (
      <div className="flex gap-1">
        {r.status === "pending" && (
          <>
            <Button size="sm" variant="ghost" className="text-success" onClick={(e) => { e.stopPropagation(); approve(r.id); }}>
              <CheckCircle className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost" className="text-destructive" onClick={(e) => { e.stopPropagation(); reject(r.id); }}>
              <XCircle className="w-4 h-4" />
            </Button>
          </>
        )}
      </div>
    )},
  ];

  const approve = (id: number) => {
    setData((d) => d.map((s) => s.id === id ? { ...s, status: "approved" as const } : s));
    toast.success("Supplier approved");
  };

  const reject = (id: number) => {
    setData((d) => d.map((s) => s.id === id ? { ...s, status: "rejected" as const } : s));
    toast.success("Supplier rejected");
  };

  const handleSubmit = () => {
    const newSupplier: Supplier = {
      id: data.length + 1,
      ...values as any,
      status: "pending",
      created_at: new Date().toISOString().split("T")[0],
    };
    setData([...data, newSupplier]);
    setOpen(false);
    setValues({});
    toast.success("Supplier added");
  };

  return (
    <PageWrapper
      title="Suppliers"
      subtitle="Manage supplier information"
      actions={<Button onClick={() => setOpen(true)}><Plus className="w-4 h-4 mr-2" />Add Supplier</Button>}
    >
      <DataTable columns={columns} data={data} />
      <FormModal open={open} onClose={() => setOpen(false)} title="Add Supplier" fields={fields} values={values} onChange={(n, v) => setValues({ ...values, [n]: v })} onSubmit={handleSubmit} />
    </PageWrapper>
  );
};

export default SuppliersPage;
