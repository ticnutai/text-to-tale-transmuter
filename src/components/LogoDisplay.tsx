import { Building2 } from "lucide-react";

interface LogoDisplayProps {
  logo: string | null;
  companyName: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "w-10 h-10 text-xs",
  md: "w-16 h-16 text-sm",
  lg: "w-24 h-24 text-base",
};

const iconSizes = {
  sm: "w-5 h-5",
  md: "w-8 h-8",
  lg: "w-12 h-12",
};

const LogoDisplay = ({ 
  logo, 
  companyName, 
  size = "md",
  className = "" 
}: LogoDisplayProps) => {
  if (logo) {
    return (
      <img
        src={logo}
        alt={companyName}
        className={`object-contain ${sizeClasses[size]} ${className}`}
      />
    );
  }

  // Generate initials from company name
  const initials = companyName
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className={`rounded-xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center shadow-lg ${sizeClasses[size]} ${className}`}
    >
      {initials ? (
        <span className="font-bold text-white">{initials}</span>
      ) : (
        <Building2 className={`text-white ${iconSizes[size]}`} />
      )}
    </div>
  );
};

export default LogoDisplay;
