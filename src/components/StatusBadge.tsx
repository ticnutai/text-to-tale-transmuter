import { QuoteStatus } from "@/hooks/useContractsData";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileEdit, Send, CheckCircle2, XCircle } from "lucide-react";

const statusConfig: Record<QuoteStatus, { label: string; icon: React.ReactNode; className: string }> = {
  draft: {
    label: "טיוטה",
    icon: <FileEdit className="w-3 h-3" />,
    className: "bg-muted text-muted-foreground border-border",
  },
  sent: {
    label: "נשלחה",
    icon: <Send className="w-3 h-3" />,
    className: "bg-blue-500/10 text-blue-600 border-blue-200 dark:border-blue-800",
  },
  approved: {
    label: "אושרה",
    icon: <CheckCircle2 className="w-3 h-3" />,
    className: "bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:border-emerald-800",
  },
  rejected: {
    label: "נדחתה",
    icon: <XCircle className="w-3 h-3" />,
    className: "bg-destructive/10 text-destructive border-destructive/20",
  },
};

interface StatusBadgeProps {
  status: QuoteStatus;
  isEditMode?: boolean;
  onChange?: (status: QuoteStatus) => void;
}

const StatusBadge = ({ status, isEditMode, onChange }: StatusBadgeProps) => {
  const config = statusConfig[status];

  if (isEditMode && onChange) {
    return (
      <Select value={status} onValueChange={(v) => onChange(v as QuoteStatus)}>
        <SelectTrigger className="w-[120px] h-7 text-xs" dir="rtl">
          <SelectValue />
        </SelectTrigger>
        <SelectContent dir="rtl">
          {(Object.keys(statusConfig) as QuoteStatus[]).map((s) => (
            <SelectItem key={s} value={s} className="text-xs">
              <span className="flex items-center gap-1.5">
                {statusConfig[s].icon}
                {statusConfig[s].label}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  return (
    <Badge variant="outline" className={`gap-1 text-xs ${config.className}`}>
      {config.icon}
      {config.label}
    </Badge>
  );
};

export default StatusBadge;
