import { useState } from "react";
import PageWrapper from "@/components/PageWrapper";
import DataTable from "@/components/DataTable";
import StatusBadge from "@/components/StatusBadge";
import FormModal, { FormField } from "@/components/FormModal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { mockApplications, SupplierApplication } from "@/lib/mock-data";
import { toast } from "sonner";

const fields: FormField[] = [
  { name: "company_name", label: "Company Name", type: "text", required: true },
  { name: "contact_person", label: "Contact Person", type: "text", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "phone", label: "Phone", type: "text", required: true },
  { name: "description", label: "Description", type: "textarea", required: true },
];

const ApplicationsPage = () => {
  const [data, setData] = useState<SupplierApplication[]>(mockApplications);
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<Record<string, string>>({});

  const columns = [
    { key: "id", label: "ID" },
    { key: "company_name", label: "Company" },
    { key: "contact_person", label: "Contact" },
    { key: "email", label: "Email" },
    { key: "submitted_at", label: "Submitted" },
    { key: "status", label: "Status", render: (r: SupplierApplication) => <StatusBadge status={r.status} /> },
  ];

  const handleSubmit = () => {
    const newApp: SupplierApplication = {
      id: data.length + 1,
      ...values as any,
      status: "pending",
      submitted_at: new Date().toISOString().split("T")[0],
    };
    setData([...data, newApp]);
    setOpen(false);
    setValues({});
    toast.success("Application submitted");
  };

  return (
    <PageWrapper
      title="Supplier Applications"
      subtitle="Review supplier applications"
      actions={<Button onClick={() => setOpen(true)}><Plus className="w-4 h-4 mr-2" />New Application</Button>}
    >
      <DataTable columns={columns} data={data} />
      <FormModal open={open} onClose={() => setOpen(false)} title="Supplier Application" fields={fields} values={values} onChange={(n, v) => setValues({ ...values, [n]: v })} onSubmit={handleSubmit} />
    </PageWrapper>
  );
};

export default ApplicationsPage;
