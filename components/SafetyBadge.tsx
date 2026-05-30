import { Check, Settings, AlertCircle, Star, Heart, ShieldCheck } from "lucide-react";
import { type SafetyLevel } from "@/lib/data";

const config: Record<
  SafetyLevel,
  { label: string; gradient: string; Icon: React.ElementType }
> = {
  novo: {
    label: "Novo",
    gradient: "linear-gradient(135deg, #FF6B9D 0%, #FF8C42 100%)",
    Icon: Star,
  },
  muito_seguro: {
    label: "Muito seguro",
    gradient: "linear-gradient(135deg, #2EC4B6 0%, #3A86FF 100%)",
    Icon: Check,
  },
  seguro: {
    label: "Adaptável",
    gradient: "linear-gradient(135deg, #FFB347 0%, #FF6B35 100%)",
    Icon: Settings,
  },
  moderado: {
    label: "Atenção",
    gradient: "linear-gradient(135deg, #FF8C42 0%, #FF3C3C 100%)",
    Icon: AlertCircle,
  },
  cuidado: {
    label: "Cuidado",
    gradient: "linear-gradient(135deg, #FF3C3C 0%, #C0392B 100%)",
    Icon: AlertCircle,
  },
  verificado: {
    label: "Verificado",
    gradient: "linear-gradient(135deg, #667EEA 0%, #764BA2 100%)",
    Icon: Check,
  },
  certificado: {
    label: "Bem avaliado por celíacos",
    gradient: "linear-gradient(135deg, #11998E 0%, #38EF7D 100%)",
    Icon: ShieldCheck,
  },
  recomendado: {
    label: "Recomendado",
    gradient: "linear-gradient(135deg, #FF6B9D 0%, #FF8C42 100%)",
    Icon: Heart,
  },
};

const sizes = {
  sm: { px: "10px", py: "5px", gap: "5px", fontSize: "10px", iconBox: 14, iconSize: 8  },
  md: { px: "12px", py: "6px", gap: "6px", fontSize: "12px", iconBox: 16, iconSize: 9  },
  lg: { px: "14px", py: "8px", gap: "7px", fontSize: "13px", iconBox: 18, iconSize: 10 },
};

interface SafetyBadgeProps {
  level: SafetyLevel;
  size?: "sm" | "md" | "lg";
}

export default function SafetyBadge({ level, size = "md" }: SafetyBadgeProps) {
  const { label, gradient, Icon } = config[level];
  const { px, py, gap, fontSize, iconBox, iconSize } = sizes[size];

  return (
    <span
      className="inline-flex items-center font-bold text-white whitespace-nowrap rounded-full"
      style={{ background: gradient, paddingLeft: px, paddingRight: px, paddingTop: py, paddingBottom: py, gap }}
    >
      <span
        className="rounded-full flex items-center justify-center shrink-0"
        style={{
          width: iconBox,
          height: iconBox,
          backgroundColor: "rgba(255,255,255,0.25)",
        }}
      >
        <Icon size={iconSize} strokeWidth={2.5} color="white" />
      </span>
      <span style={{ fontSize, letterSpacing: "0.04em", textTransform: "uppercase" }}>{label}</span>
    </span>
  );
}
