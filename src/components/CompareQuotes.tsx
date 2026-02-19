import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ContractData } from "@/hooks/useContractsData";
import { Check } from "lucide-react";

interface CompareQuotesProps {
  isOpen: boolean;
  onClose: () => void;
  quotes: { key: string; label: string; data: ContractData }[];
}

const CompareQuotes = ({ isOpen, onClose, quotes }: CompareQuotesProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto" dir="rtl">
        <DialogHeader>
          <DialogTitle>השוואת הצעות מחיר</DialogTitle>
        </DialogHeader>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="p-3 text-right font-bold text-muted-foreground w-32"></th>
                {quotes.map((q) => (
                  <th key={q.key} className="p-3 text-center font-bold text-foreground">
                    {q.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="p-3 font-medium text-muted-foreground">מחיר</td>
                {quotes.map((q) => (
                  <td key={q.key} className="p-3 text-center font-bold text-gold-dark text-lg">
                    {q.data.price}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-border">
                <td className="p-3 font-medium text-muted-foreground">מיקום</td>
                {quotes.map((q) => (
                  <td key={q.key} className="p-3 text-center text-muted-foreground text-xs">
                    {q.data.location}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-border">
                <td className="p-3 font-medium text-muted-foreground">שלבים</td>
                {quotes.map((q) => (
                  <td key={q.key} className="p-3 text-center">
                    {q.data.sections.length}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-border">
                <td className="p-3 font-medium text-muted-foreground">סעיפים</td>
                {quotes.map((q) => (
                  <td key={q.key} className="p-3 text-center">
                    {q.data.sections.reduce((sum, s) => sum + s.items.length, 0)}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-border">
                <td className="p-3 font-medium text-muted-foreground">תשלומים</td>
                {quotes.map((q) => (
                  <td key={q.key} className="p-3 text-center">
                    {q.data.payments.length} תשלומים
                  </td>
                ))}
              </tr>
              <tr className="border-b border-border">
                <td className="p-3 font-medium text-muted-foreground">לו״ז</td>
                {quotes.map((q) => (
                  <td key={q.key} className="p-3 text-center">
                    {q.data.timeline ? (
                      <Check className="w-4 h-4 text-gold mx-auto" />
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                ))}
              </tr>
              {/* Section details */}
              {quotes[0]?.data.sections.map((_, sIdx) => (
                <tr key={`section-${sIdx}`} className="border-b border-border bg-muted/30">
                  <td className="p-3 font-medium text-muted-foreground text-xs">
                    שלב {sIdx + 1}
                  </td>
                  {quotes.map((q) => (
                    <td key={q.key} className="p-3 text-xs">
                      {q.data.sections[sIdx] ? (
                        <div>
                          <div className="font-bold mb-1">{q.data.sections[sIdx].title}</div>
                          <div className="text-muted-foreground">
                            {q.data.sections[sIdx].items.length} סעיפים
                          </div>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CompareQuotes;
