import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface EmailReportModalProps {
  open: boolean;
  onClose: () => void;
  reportName: string;
}

const EmailReportModal = ({ open, onClose, reportName }: EmailReportModalProps) => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (!email) return;
    // Mock send
    setSent(true);
    toast.success(`Report "${reportName}" sent to ${email}`);
    setTimeout(() => {
      setSent(false);
      setEmail("");
      onClose();
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={() => { setSent(false); setEmail(""); onClose(); }}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-primary" />
            Email Report
          </DialogTitle>
        </DialogHeader>
        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center py-6 text-success"
            >
              <CheckCircle className="w-12 h-12 mb-3" />
              <p className="font-medium">Report sent successfully!</p>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Send the <strong>{reportName}</strong> report to an email address.
              </p>
              <div className="space-y-1.5">
                <Label htmlFor="report-email">Email Address</Label>
                <Input
                  id="report-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="recipient@example.com"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={onClose}>Cancel</Button>
                <Button onClick={handleSend} disabled={!email}>
                  <Mail className="w-4 h-4 mr-2" />Send
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default EmailReportModal;
