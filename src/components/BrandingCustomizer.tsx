import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Type, Image, Sparkles, Upload, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface BrandingSettings {
  logo: string | null;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  companyName: string;
}

interface BrandingCustomizerProps {
  isOpen: boolean;
  onClose: () => void;
  settings: BrandingSettings;
  onSave: (settings: BrandingSettings) => void;
}

const colorPresets = [
  { name: "זהב", primary: "40 85% 55%", secondary: "35 80% 35%" },
  { name: "כחול", primary: "210 80% 50%", secondary: "210 70% 35%" },
  { name: "ירוק", primary: "150 60% 45%", secondary: "150 50% 30%" },
  { name: "אדום", primary: "0 70% 55%", secondary: "0 60% 40%" },
  { name: "סגול", primary: "270 60% 55%", secondary: "270 50% 40%" },
  { name: "כתום", primary: "25 90% 55%", secondary: "25 80% 40%" },
];

const fontPresets = [
  { name: "רגיל", value: "system-ui, sans-serif" },
  { name: "מודרני", value: "'Rubik', sans-serif" },
  { name: "קלאסי", value: "'Frank Ruhl Libre', serif" },
  { name: "עגול", value: "'Varela Round', sans-serif" },
];

const BrandingCustomizer = ({
  isOpen,
  onClose,
  settings,
  onSave,
}: BrandingCustomizerProps) => {
  const [localSettings, setLocalSettings] = useState<BrandingSettings>(settings);
  const [aiPrompt, setAiPrompt] = useState("");

  const handleSave = () => {
    onSave(localSettings);
    onClose();
  };

  const handleColorSelect = (primary: string, secondary: string) => {
    setLocalSettings((prev) => ({
      ...prev,
      primaryColor: primary,
      secondaryColor: secondary,
    }));
  };

  const handleFontSelect = (font: string) => {
    setLocalSettings((prev) => ({
      ...prev,
      fontFamily: font,
    }));
  };

  const handleLogoUpload = () => {
    // Placeholder - will work when Cloud is enabled
    alert("העלאת לוגו תהיה זמינה לאחר הפעלת Lovable Cloud");
  };

  const handleGenerateLogo = () => {
    // Placeholder - will work when Cloud is enabled
    alert("יצירת לוגו עם AI תהיה זמינה לאחר הפעלת Lovable Cloud");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl md:max-h-[85vh] bg-background rounded-2xl z-50 overflow-hidden shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-l from-gold-dark to-gold p-5 text-white flex items-center justify-between" dir="rtl">
              <div className="flex items-center gap-3">
                <Palette className="w-6 h-6" />
                <h2 className="text-xl font-bold">התאמה אישית</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6" dir="rtl">
              <Tabs defaultValue="logo" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="logo" className="gap-2">
                    <Image className="w-4 h-4" />
                    לוגו
                  </TabsTrigger>
                  <TabsTrigger value="colors" className="gap-2">
                    <Palette className="w-4 h-4" />
                    צבעים
                  </TabsTrigger>
                  <TabsTrigger value="typography" className="gap-2">
                    <Type className="w-4 h-4" />
                    גופן
                  </TabsTrigger>
                </TabsList>

                {/* Logo Tab */}
                <TabsContent value="logo" className="space-y-6">
                  {/* Company Name */}
                  <div className="space-y-2">
                    <Label>שם החברה / העסק</Label>
                    <Input
                      value={localSettings.companyName}
                      onChange={(e) =>
                        setLocalSettings((prev) => ({
                          ...prev,
                          companyName: e.target.value,
                        }))
                      }
                      placeholder="הזינו את שם העסק"
                      className="text-right"
                    />
                  </div>

                  {/* Current Logo Preview */}
                  <div className="space-y-2">
                    <Label>לוגו נוכחי</Label>
                    <div className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center bg-muted/30">
                      {localSettings.logo ? (
                        <img
                          src={localSettings.logo}
                          alt="Logo"
                          className="max-h-24 object-contain"
                        />
                      ) : (
                        <div className="text-center text-muted-foreground">
                          <Image className="w-12 h-12 mx-auto mb-2 opacity-40" />
                          <p className="text-sm">לא הוגדר לוגו</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Upload Logo */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button
                      variant="outline"
                      className="h-auto py-4 flex flex-col gap-2"
                      onClick={handleLogoUpload}
                    >
                      <Upload className="w-6 h-6 text-gold" />
                      <span className="font-medium">העלאת לוגו</span>
                      <span className="text-xs text-muted-foreground">
                        PNG, JPG, SVG
                      </span>
                    </Button>

                    <Button
                      variant="outline"
                      className="h-auto py-4 flex flex-col gap-2"
                      onClick={handleGenerateLogo}
                    >
                      <Sparkles className="w-6 h-6 text-gold" />
                      <span className="font-medium">יצירה עם AI</span>
                      <span className="text-xs text-muted-foreground">
                        תאר את הלוגו הרצוי
                      </span>
                    </Button>
                  </div>

                  {/* AI Logo Generation Prompt */}
                  <div className="space-y-2">
                    <Label>תיאור לוגו ליצירה עם AI</Label>
                    <Input
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      placeholder='לדוגמה: "לוגו מינימליסטי לאדריכל עם בית מודרני"'
                      className="text-right"
                    />
                    <p className="text-xs text-muted-foreground">
                      💡 יצירת לוגו תהיה זמינה לאחר הפעלת Lovable Cloud
                    </p>
                  </div>
                </TabsContent>

                {/* Colors Tab */}
                <TabsContent value="colors" className="space-y-6">
                  <div className="space-y-2">
                    <Label>בחר ערכת צבעים</Label>
                    <div className="grid grid-cols-3 gap-3">
                      {colorPresets.map((preset) => (
                        <button
                          key={preset.name}
                          onClick={() =>
                            handleColorSelect(preset.primary, preset.secondary)
                          }
                          className={`relative p-4 rounded-xl border-2 transition-all ${
                            localSettings.primaryColor === preset.primary
                              ? "border-gold ring-2 ring-gold/30"
                              : "border-border hover:border-gold/50"
                          }`}
                        >
                          <div className="flex gap-2 justify-center mb-2">
                            <div
                              className="w-8 h-8 rounded-full shadow-inner"
                              style={{
                                backgroundColor: `hsl(${preset.primary})`,
                              }}
                            />
                            <div
                              className="w-8 h-8 rounded-full shadow-inner"
                              style={{
                                backgroundColor: `hsl(${preset.secondary})`,
                              }}
                            />
                          </div>
                          <span className="text-sm font-medium">
                            {preset.name}
                          </span>
                          {localSettings.primaryColor === preset.primary && (
                            <div className="absolute top-1 left-1 w-5 h-5 bg-gold rounded-full flex items-center justify-center">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Preview */}
                  <div className="space-y-2">
                    <Label>תצוגה מקדימה</Label>
                    <div
                      className="rounded-xl p-6 text-white"
                      style={{
                        background: `linear-gradient(to left, hsl(${localSettings.secondaryColor}), hsl(${localSettings.primaryColor}))`,
                      }}
                    >
                      <h3 className="text-xl font-bold mb-2">
                        {localSettings.companyName || "שם העסק"}
                      </h3>
                      <p className="text-white/80 text-sm">
                        הצעת מחיר לתוספת בניה
                      </p>
                      <div className="mt-4 text-2xl font-bold">₪35,000</div>
                    </div>
                  </div>
                </TabsContent>

                {/* Typography Tab */}
                <TabsContent value="typography" className="space-y-6">
                  <div className="space-y-2">
                    <Label>בחר גופן</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {fontPresets.map((font) => (
                        <button
                          key={font.name}
                          onClick={() => handleFontSelect(font.value)}
                          className={`relative p-4 rounded-xl border-2 transition-all text-right ${
                            localSettings.fontFamily === font.value
                              ? "border-gold ring-2 ring-gold/30"
                              : "border-border hover:border-gold/50"
                          }`}
                          style={{ fontFamily: font.value }}
                        >
                          <div className="text-lg font-bold mb-1">
                            {font.name}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            הצעת מחיר לאדריכלות
                          </div>
                          {localSettings.fontFamily === font.value && (
                            <div className="absolute top-2 left-2 w-5 h-5 bg-gold rounded-full flex items-center justify-center">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Preview */}
                  <div className="space-y-2">
                    <Label>תצוגה מקדימה</Label>
                    <div
                      className="rounded-xl p-6 bg-muted"
                      style={{ fontFamily: localSettings.fontFamily }}
                    >
                      <h3 className="text-xl font-bold mb-2 text-foreground">
                        {localSettings.companyName || "שם העסק"}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        הצעת מחיר להוצאת היתר בניה
                      </p>
                      <ul className="space-y-2 text-sm">
                        <li>• בדיקת היתכנות ותכנון</li>
                        <li>• הגשת בקשה לוועדה</li>
                        <li>• פיקוח עליון</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Footer */}
            <div className="border-t border-border p-4 flex items-center justify-between" dir="rtl">
              <Button variant="outline" onClick={onClose}>
                ביטול
              </Button>
              <Button
                onClick={handleSave}
                className="bg-gradient-to-l from-gold-dark to-gold hover:from-gold hover:to-gold-dark text-white"
              >
                שמור שינויים
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BrandingCustomizer;
