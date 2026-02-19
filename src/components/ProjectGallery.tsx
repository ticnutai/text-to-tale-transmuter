import { useState } from "react";
import { ImagePlus, X, Camera } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectGalleryProps {
  images: string[];
  isEditMode: boolean;
  onAddImage?: (url: string) => void;
  onRemoveImage?: (index: number) => void;
}

const ProjectGallery = ({ images, isEditMode, onRemoveImage }: ProjectGalleryProps) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (images.length === 0 && !isEditMode) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="mb-8"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center">
          <Camera className="w-4 h-4 text-gold-dark" />
        </div>
        <h3 className="text-lg font-bold text-foreground">גלריית פרויקטים</h3>
      </div>
      <div className="grid grid-cols-3 gap-3 pr-11">
        {images.map((img, index) => (
          <div
            key={index}
            className="relative group aspect-[4/3] rounded-xl overflow-hidden bg-muted cursor-pointer"
            onClick={() => setLightboxIndex(index)}
          >
            <img
              src={img}
              alt={`פרויקט ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {isEditMode && onRemoveImage && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveImage(index);
                }}
                className="absolute top-2 left-2 p-1 rounded-full bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        ))}
        {isEditMode && (
          <div className="aspect-[4/3] rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-gold hover:text-gold transition-colors cursor-pointer">
            <ImagePlus className="w-6 h-6" />
            <span className="text-xs">הוסף תמונה</span>
            <span className="text-[10px] text-muted-foreground/60">(דורש Cloud)</span>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-8"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-4 left-4 p-2 text-white/80 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={images[lightboxIndex]}
              alt=""
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProjectGallery;
