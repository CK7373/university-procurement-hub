import { Badge } from "@/components/ui/badge";

const statusStyles: Record<string, string> = {
  active: "bg-success/10 text-success border-success/20",
  approved: "bg-success/10 text-success border-success/20",
  delivered: "bg-success/10 text-success border-success/20",
  paid: "bg-success/10 text-success border-success/20",
  pending: "bg-warning/10 text-warning border-warning/20",
  unpaid: "bg-warning/10 text-warning border-warning/20",
  expired: "bg-muted text-muted-foreground border-border",
  terminated: "bg-destructive/10 text-destructive border-destructive/20",
  rejected: "bg-destructive/10 text-destructive border-destructive/20",
  overdue: "bg-destructive/10 text-destructive border-destructive/20",
  cancelled: "bg-muted text-muted-foreground border-border",
};

const StatusBadge = ({ status }: { status: string }) => (
  <Badge variant="outline" className={`capitalize ${statusStyles[status] || ""}`}>
    {status}
  </Badge>
);

export default StatusBadge;
