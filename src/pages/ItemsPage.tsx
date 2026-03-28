import { useState } from "react";
import PageWrapper from "@/components/PageWrapper";
import DataTable from "@/components/DataTable";
import FormModal, { FormField } from "@/components/FormModal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { mockItems, Item } from "@/lib/mock-data";
import { toast } from "sonner";

const fields: FormField[] = [
  { name: "name", label: "Item Name", type: "text", required: true },
  { name: "description", label: "Description", type: "textarea" },
  { name: "category", label: "Category", type: "select", options: [
    { value: "Electronics", label: "Electronics" },
    { value: "Furniture", label: "Furniture" },
    { value: "Stationery", label: "Stationery" },
    { value: "Lab Equipment", label: "Lab Equipment" },
    { value: "Maintenance", label: "Maintenance" },
  ]},
  { name: "unit", label: "Unit", type: "text", required: true, placeholder: "e.g. piece, ream, set" },
];

const ItemsPage = () => {
  const [data, setData] = useState<Item[]>(mockItems);
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<Record<string, string>>({});

  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "description", label: "Description" },
    { key: "category", label: "Category" },
    { key: "unit", label: "Unit" },
  ];

  const handleSubmit = () => {
    const newItem: Item = { id: data.length + 1, ...values as any };
    setData([...data, newItem]);
    setOpen(false);
    setValues({});
    toast.success("Item added");
  };

  return (
    <PageWrapper
      title="Items"
      subtitle="Manage purchasable items"
      actions={<Button onClick={() => setOpen(true)}><Plus className="w-4 h-4 mr-2" />Add Item</Button>}
    >
      <DataTable columns={columns} data={data} />
      <FormModal open={open} onClose={() => setOpen(false)} title="Add Item" fields={fields} values={values} onChange={(n, v) => setValues({ ...values, [n]: v })} onSubmit={handleSubmit} />
    </PageWrapper>
  );
};

export default ItemsPage;
