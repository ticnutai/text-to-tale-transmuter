import { Share2, Download, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContractData } from "@/hooks/useContractsData";
import { useToast } from "@/hooks/use-toast";

interface ShareActionsProps {
  contract: ContractData;
  companyName?: string;
}

const ShareActions = ({ contract, companyName = "" }: ShareActionsProps) => {
  const { toast } = useToast();

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsApp = () => {
    const text = `${companyName ? companyName + "\n" : ""}${contract.title}\n${contract.location}\nמחיר: ${contract.price} + מע״מ\n\nלפרטים נוספים צרו קשר`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({ title: "הקישור הועתק!", description: "ניתן להדביק ולשלוח" });
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={handlePrint}
        className="gap-1.5 text-xs"
        title="הדפסה / שמירה כ-PDF"
      >
        <Download className="w-3.5 h-3.5" />
        PDF
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleWhatsApp}
        className="gap-1.5 text-xs text-green-600 hover:text-green-700"
        title="שתף בוואטסאפ"
      >
        <MessageCircle className="w-3.5 h-3.5" />
        WhatsApp
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleCopyLink}
        className="gap-1.5 text-xs"
        title="העתק קישור"
      >
        <Share2 className="w-3.5 h-3.5" />
        העתק
      </Button>
    </div>
  );
};

export default ShareActions;
