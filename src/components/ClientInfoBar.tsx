import { User, MapPin, Hash, Calendar } from "lucide-react";
import EditableText from "./EditableText";

interface ClientInfo {
  clientName: string;
  clientAddress: string;
  quoteNumber: string;
  quoteDate: string;
}

interface ClientInfoBarProps {
  info: ClientInfo;
  isEditMode: boolean;
  onUpdate: (field: keyof ClientInfo, value: string) => void;
}

const ClientInfoBar = ({ info, isEditMode, onUpdate }: ClientInfoBarProps) => {
  return (
    <div className="bg-muted/50 rounded-xl p-4 mb-6 grid grid-cols-2 gap-4" dir="rtl">
      <div className="flex items-center gap-2">
        <User className="w-4 h-4 text-gold-dark flex-shrink-0" />
        <div className="text-sm">
          <span className="text-muted-foreground text-xs">לכבוד:</span>
          <div className="font-medium text-foreground">
            <EditableText
              value={info.clientName}
              onChange={(v) => onUpdate("clientName", v)}
              isEditMode={isEditMode}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <MapPin className="w-4 h-4 text-gold-dark flex-shrink-0" />
        <div className="text-sm">
          <span className="text-muted-foreground text-xs">כתובת:</span>
          <div className="font-medium text-foreground">
            <EditableText
              value={info.clientAddress}
              onChange={(v) => onUpdate("clientAddress", v)}
              isEditMode={isEditMode}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Hash className="w-4 h-4 text-gold-dark flex-shrink-0" />
        <div className="text-sm">
          <span className="text-muted-foreground text-xs">מס׳ הצעה:</span>
          <div className="font-medium text-foreground">
            <EditableText
              value={info.quoteNumber}
              onChange={(v) => onUpdate("quoteNumber", v)}
              isEditMode={isEditMode}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Calendar className="w-4 h-4 text-gold-dark flex-shrink-0" />
        <div className="text-sm">
          <span className="text-muted-foreground text-xs">תאריך:</span>
          <div className="font-medium text-foreground">
            <EditableText
              value={info.quoteDate}
              onChange={(v) => onUpdate("quoteDate", v)}
              isEditMode={isEditMode}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientInfoBar;
