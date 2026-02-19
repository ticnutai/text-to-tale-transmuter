import { Layout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandingSettings } from "@/hooks/useBranding";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Template {
  id: string;
  name: string;
  description: string;
  preview: string;
  settings: Partial<BrandingSettings>;
}

const templates: Template[] = [
  {
    id: "minimal",
    name: "מינימליסטי",
    description: "עיצוב נקי ופשוט, מושלם למשרדים מודרניים",
    preview: "⬜",
    settings: {
      primaryColor: "220 15% 40%",
      secondaryColor: "220 10% 25%",
      fontFamily: "'Rubik', sans-serif",
    },
  },
  {
    id: "classic",
    name: "קלאסי",
    description: "סגנון זהב אלגנטי, מתאים לאדריכלות יוקרתית",
    preview: "🏛️",
    settings: {
      primaryColor: "40 85% 55%",
      secondaryColor: "35 80% 35%",
      fontFamily: "'Frank Ruhl Libre', serif",
    },
  },
  {
    id: "modern",
    name: "מודרני",
    description: "צבעים עזים ודינמיים, מתאים לסטודיו צעיר",
    preview: "🎨",
    settings: {
      primaryColor: "200 80% 45%",
      secondaryColor: "220 70% 35%",
      fontFamily: "'Rubik', sans-serif",
    },
  },
  {
    id: "earth",
    name: "טבעי",
    description: "גוונים חמים וארציים, מתאים לבנייה ירוקה",
    preview: "🌿",
    settings: {
      primaryColor: "25 60% 45%",
      secondaryColor: "15 50% 30%",
      fontFamily: "system-ui, sans-serif",
    },
  },
];

interface TemplateSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (settings: Partial<BrandingSettings>) => void;
}

const TemplateSelector = ({ isOpen, onClose, onApply }: TemplateSelectorProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg" dir="rtl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Layout className="w-5 h-5" />
            בחר תבנית עיצוב
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => {
                onApply(template.settings);
                onClose();
              }}
              className="text-right p-4 rounded-xl border border-border hover:border-gold hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
                  style={{
                    background: `linear-gradient(135deg, hsl(${template.settings.primaryColor}), hsl(${template.settings.secondaryColor}))`,
                  }}
                >
                  <span className="drop-shadow">{template.preview}</span>
                </div>
                <h4 className="font-bold text-foreground group-hover:text-gold-dark transition-colors">
                  {template.name}
                </h4>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {template.description}
              </p>
              <div className="mt-3 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(to left, hsl(${template.settings.primaryColor}), hsl(${template.settings.secondaryColor}))`,
                  }}
                />
              </div>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TemplateSelector;
