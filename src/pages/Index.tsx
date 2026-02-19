import { useState } from "react";
import { motion } from "framer-motion";
import { Pencil, PencilOff, Palette, Layout } from "lucide-react";
import Header from "@/components/Header";
import ContractCard from "@/components/ContractCard";
import ContractDetailEditable from "@/components/ContractDetailEditable";
import BrandingCustomizer from "@/components/BrandingCustomizer";
import TemplateSelector from "@/components/TemplateSelector";
import { useContractsData, ContractData } from "@/hooks/useContractsData";
import { useBranding, BrandingSettings } from "@/hooks/useBranding";
import { Button } from "@/components/ui/button";

type ContractType = "addition" | "expansion" | "licensing" | null;

const cardInfo = {
  addition: {
    title: "תוספת בניה",
    subtitle: "הוצאת היתר בניה לתוספת בניה למבנה מגורים קיים - גוש 6273",
    icon: "home" as const,
  },
  expansion: {
    title: "הרחבה צפונית",
    subtitle: "הוצאת היתר בניה ליחידת דיור אחת במגרש בהרחבה הצפונית - גוש 7311",
    icon: "building" as const,
  },
  licensing: {
    title: "רישוי בלבד",
    subtitle: "הוצאת היתר בניה עם קבלת תוכנית וגרמושקא מאדריכל מתכנן - גוש 7188",
    icon: "document" as const,
  },
};

const Index = () => {
  const [selectedContract, setSelectedContract] = useState<ContractType>(null);
  const [isBrandingOpen, setIsBrandingOpen] = useState(false);
  const [isTemplatesOpen, setIsTemplatesOpen] = useState(false);
  const {
    contractsData,
    isEditMode,
    setIsEditMode,
    updateContract,
    updateSectionItem,
    updateNote,
    addSectionItem,
    removeSectionItem,
    addNote,
    removeNote,
  } = useContractsData();
  const { branding, updateBranding } = useBranding();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Edit Mode Toggle */}
      <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-2">
        <Button
          onClick={() => setIsTemplatesOpen(true)}
          variant="outline"
          size="lg"
          className="shadow-lg gap-2"
        >
          <Layout className="w-4 h-4" />
          תבניות
        </Button>
        <Button
          onClick={() => setIsBrandingOpen(true)}
          variant="outline"
          size="lg"
          className="shadow-lg gap-2"
        >
          <Palette className="w-4 h-4" />
          התאמה אישית
        </Button>
        <Button
          onClick={() => setIsEditMode(!isEditMode)}
          variant={isEditMode ? "default" : "outline"}
          size="lg"
          className={`shadow-lg gap-2 ${isEditMode ? "bg-gold hover:bg-gold-dark text-white" : ""}`}
        >
          {isEditMode ? (
            <>
              <PencilOff className="w-4 h-4" />
              סיים עריכה
            </>
          ) : (
            <>
              <Pencil className="w-4 h-4" />
              מצב עריכה
            </>
          )}
        </Button>
      </div>
      
      {/* Edit Mode Indicator */}
      {isEditMode && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gold text-white text-center py-2 text-sm"
          dir="rtl"
        >
          🖊️ מצב עריכה פעיל - לחצו על טקסט כלשהו כדי לערוך אותו
        </motion.div>
      )}
      
      {/* Main Content */}
      <main className="container mx-auto px-6 py-16">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-16"
          dir="rtl"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            הצעות מחיר
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            בחרו את סוג השירות המתאים לכם
          </p>
        </motion.div>
        
        {/* Contract Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {(Object.keys(cardInfo) as Array<keyof typeof cardInfo>).map((type, index) => (
            <ContractCard
              key={type}
              title={cardInfo[type].title}
              subtitle={cardInfo[type].subtitle}
              price={contractsData[type].price}
              icon={cardInfo[type].icon}
              onClick={() => setSelectedContract(type)}
              delay={0.1 * (index + 1)}
              logo={branding.logo}
              companyName={branding.companyName}
              primaryColor={branding.primaryColor}
              secondaryColor={branding.secondaryColor}
            />
          ))}
        </div>
        
        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-20 text-center"
          dir="rtl"
        >
          <div className="bg-muted/50 rounded-3xl p-8 max-w-3xl mx-auto">
            <p className="text-muted-foreground">
              <span className="font-semibold text-foreground">בס״ד</span>
              {" | "}
              כל המחירים המצוינים אינם כוללים מע״מ כחוק
              {" | "}
              תוקף הצעת המחיר: 30 יום
            </p>
          </div>
        </motion.div>
      </main>
      
      {/* Footer */}
      <footer className="bg-muted/30 py-8 mt-16" dir="rtl">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Mali Tenenbaum Architecture & Design. כל הזכויות שמורות.
          </p>
        </div>
      </footer>
      
      {/* Contract Detail Modal */}
      {selectedContract && (
        <ContractDetailEditable
          isOpen={!!selectedContract}
          onClose={() => setSelectedContract(null)}
          contract={contractsData[selectedContract]}
          contractType={selectedContract}
          isEditMode={isEditMode}
          onUpdateField={(field, value) => updateContract(selectedContract, field, value)}
          onUpdateSectionItem={(sectionIndex, itemIndex, value) =>
            updateSectionItem(selectedContract, sectionIndex, itemIndex, value)
          }
          onUpdateNote={(noteIndex, value) => updateNote(selectedContract, noteIndex, value)}
          onAddSectionItem={(sectionIndex, value) => addSectionItem(selectedContract, sectionIndex, value)}
          onRemoveSectionItem={(sectionIndex, itemIndex) => removeSectionItem(selectedContract, sectionIndex, itemIndex)}
          onAddNote={(value) => addNote(selectedContract, value)}
          onRemoveNote={(noteIndex) => removeNote(selectedContract, noteIndex)}
          logo={branding.logo}
          companyName={branding.companyName}
          primaryColor={branding.primaryColor}
          secondaryColor={branding.secondaryColor}
          fontFamily={branding.fontFamily}
        />
      )}

      {/* Branding Customizer Modal */}
      <BrandingCustomizer
        isOpen={isBrandingOpen}
        onClose={() => setIsBrandingOpen(false)}
        settings={branding}
        onSave={updateBranding}
      />

      {/* Template Selector Modal */}
      <TemplateSelector
        isOpen={isTemplatesOpen}
        onClose={() => setIsTemplatesOpen(false)}
        onApply={(settings) => {
          updateBranding({ ...branding, ...settings });
        }}
      />
    </div>
  );
};

export default Index;
