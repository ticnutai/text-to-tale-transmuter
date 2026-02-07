import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Calendar, CreditCard, FileText, AlertCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import EditableText from "./EditableText";
import LogoDisplay from "./LogoDisplay";
import { ContractData } from "@/hooks/useContractsData";

interface ContractDetailEditableProps {
  isOpen: boolean;
  onClose: () => void;
  contract: ContractData;
  contractType: string;
  isEditMode: boolean;
  onUpdateField: (field: keyof ContractData, value: string) => void;
  onUpdateSectionItem: (sectionIndex: number, itemIndex: number, value: string) => void;
  onUpdateNote: (noteIndex: number, value: string) => void;
  logo?: string | null;
  companyName?: string;
  primaryColor?: string;
  secondaryColor?: string;
  fontFamily?: string;
}

const ContractDetailEditable = ({
  isOpen,
  onClose,
  contract,
  isEditMode,
  onUpdateField,
  onUpdateSectionItem,
  onUpdateNote,
  logo,
  companyName = "",
  primaryColor,
  secondaryColor,
  fontFamily,
}: ContractDetailEditableProps) => {
  const headerStyle = primaryColor && secondaryColor
    ? { background: `linear-gradient(to left, hsl(${secondaryColor}), hsl(${primaryColor}))` }
    : undefined;

  const fontStyle = fontFamily ? { fontFamily } : undefined;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 bottom-0 w-full max-w-3xl bg-background z-50 overflow-hidden shadow-2xl"
            style={fontStyle}
          >
            {/* Header */}
            <div 
              className="sticky top-0 bg-gradient-to-l from-gold-dark to-gold p-6 text-white z-10"
              style={headerStyle}
            >
              <div className="flex items-start justify-between" dir="rtl">
                <div className="flex items-start gap-4">
                  {/* Logo */}
                  {(logo || companyName) && (
                    <LogoDisplay 
                      logo={logo} 
                      companyName={companyName} 
                      size="md" 
                      className="bg-white/20 backdrop-blur-sm"
                    />
                  )}
                  <div>
                    <h2 className="text-2xl font-bold mb-2">
                      <EditableText
                        value={contract.title}
                        onChange={(v) => onUpdateField("title", v)}
                        isEditMode={isEditMode}
                      />
                    </h2>
                    <p className="text-white/80 text-sm">
                      <EditableText
                        value={contract.location}
                        onChange={(v) => onUpdateField("location", v)}
                        isEditMode={isEditMode}
                      />
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="mt-4 flex items-baseline gap-2" dir="rtl">
                <span className="text-3xl font-bold">
                  <EditableText
                    value={contract.price}
                    onChange={(v) => onUpdateField("price", v)}
                    isEditMode={isEditMode}
                  />
                </span>
                <span className="text-white/70">+ מע״מ</span>
              </div>
            </div>
            
            {/* Content */}
            <div className="overflow-y-auto h-[calc(100vh-200px)] p-6" dir="rtl">
              {/* Sections */}
              {contract.sections.map((section, sectionIndex) => (
                <motion.div
                  key={sectionIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: sectionIndex * 0.1 }}
                  className="mb-8"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center">
                      <FileText className="w-4 h-4 text-gold-dark" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">{section.title}</h3>
                  </div>
                  <div className="space-y-3 pr-11">
                    {section.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-gold mt-1 flex-shrink-0" />
                        <span className="text-muted-foreground text-sm leading-relaxed">
                          <EditableText
                            value={item}
                            onChange={(v) => onUpdateSectionItem(sectionIndex, itemIndex, v)}
                            isEditMode={isEditMode}
                          />
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
              
              {/* Payment Schedule */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center">
                    <CreditCard className="w-4 h-4 text-gold-dark" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">לוח תשלומים</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pr-11">
                  {contract.payments.map((payment, index) => (
                    <div key={index} className="bg-muted rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-gold-dark mb-2">{payment.percentage}</div>
                      <div className="text-xs text-muted-foreground">{payment.description}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              {/* Timeline */}
              {contract.timeline && contract.timeline.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mb-8"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-gold-dark" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">לוח זמנים</h3>
                  </div>
                  <div className="space-y-3 pr-11">
                    {contract.timeline.map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-gold/20 text-gold-dark text-xs font-bold flex items-center justify-center">
                          {index + 1}
                        </div>
                        <span className="text-muted-foreground text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
              
              {/* Notes */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center">
                    <AlertCircle className="w-4 h-4 text-gold-dark" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">הערות חשובות</h3>
                </div>
                <div className="space-y-3 pr-11">
                  {contract.notes.map((note, index) => (
                    <div key={index} className="flex items-start gap-3 bg-muted/50 rounded-lg p-3">
                      <ArrowRight className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground text-sm leading-relaxed">
                        <EditableText
                          value={note}
                          onChange={(v) => onUpdateNote(index, v)}
                          isEditMode={isEditMode}
                        />
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
            
            {/* Footer */}
            <div className="sticky bottom-0 bg-background border-t border-border p-4" dir="rtl">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  תוקף הצעת המחיר: 30 יום
                </div>
                <Button 
                  onClick={onClose}
                  className="bg-gradient-to-l from-gold-dark to-gold hover:from-gold hover:to-gold-dark text-white"
                >
                  סגור
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContractDetailEditable;
