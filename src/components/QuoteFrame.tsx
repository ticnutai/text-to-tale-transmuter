import { cn } from "@/lib/utils";

export const frameStyles: Record<string, { label: string; className: string }> = {
  none: { label: "ללא", className: "" },
  elegant: {
    label: "אלגנטי",
    className: "border-2 border-gold/40 shadow-[0_0_0_4px_hsl(var(--background)),0_0_0_6px_hsl(var(--gold)/0.3)]",
  },
  double: {
    label: "כפול",
    className: "border-[3px] border-double border-gold-dark/50",
  },
  rounded: {
    label: "מעוגל",
    className: "border border-gold/30 rounded-3xl shadow-xl",
  },
  modern: {
    label: "מודרני",
    className: "border-l-4 border-l-gold border-t-0 border-b-0 border-r-0 shadow-lg",
  },
};

interface QuoteFrameProps {
  frameStyle: string;
  children: React.ReactNode;
  className?: string;
}

const QuoteFrame = ({ frameStyle, children, className }: QuoteFrameProps) => {
  const style = frameStyles[frameStyle] || frameStyles.none;

  return (
    <div className={cn(style.className, className)}>
      {children}
    </div>
  );
};

export default QuoteFrame;
