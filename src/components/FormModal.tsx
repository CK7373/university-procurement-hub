import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ReactNode } from "react";

export interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "number" | "date" | "select" | "textarea";
  options?: { value: string; label: string }[];
  required?: boolean;
  placeholder?: string;
}

interface FormModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  fields: FormField[];
  values: Record<string, string>;
  onChange: (name: string, value: string) => void;
  onSubmit: () => void;
  submitLabel?: string;
  children?: ReactNode;
}

const FormModal = ({ open, onClose, title, fields, values, onChange, onSubmit, submitLabel = "Save" }: FormModalProps) => (
  <Dialog open={open} onOpenChange={onClose}>
    <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <form
        onSubmit={(e) => { e.preventDefault(); onSubmit(); }}
        className="space-y-4 mt-2"
      >
        {fields.map((field) => (
          <div key={field.name} className="space-y-1.5">
            <Label htmlFor={field.name}>{field.label}</Label>
            {field.type === "select" ? (
              <Select value={values[field.name] || ""} onValueChange={(v) => onChange(field.name, v)}>
                <SelectTrigger><SelectValue placeholder={field.placeholder || "Select..."} /></SelectTrigger>
                <SelectContent>
                  {field.options?.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : field.type === "textarea" ? (
              <Textarea
                id={field.name}
                value={values[field.name] || ""}
                onChange={(e) => onChange(field.name, e.target.value)}
                placeholder={field.placeholder}
                required={field.required}
              />
            ) : (
              <Input
                id={field.name}
                type={field.type}
                value={values[field.name] || ""}
                onChange={(e) => onChange(field.name, e.target.value)}
                placeholder={field.placeholder}
                required={field.required}
              />
            )}
          </div>
        ))}
        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit">{submitLabel}</Button>
        </div>
      </form>
    </DialogContent>
  </Dialog>
);

export default FormModal;
