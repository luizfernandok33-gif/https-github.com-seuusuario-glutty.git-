import { type SafetyLevel } from "@/lib/data";

function IconEscudo({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M8 16L4.35009 13.3929C2.24773 11.8912 1 9.46667 1 6.88306V3L8 0L15 3V6.88306C15 9.46667 13.7523 11.8912 11.6499 13.3929L8 16ZM12.2071 5.70711L10.7929 4.29289L7 8.08579L5.20711 6.29289L3.79289 7.70711L7 10.9142L12.2071 5.70711Z" fill="currentColor"/>
    </svg>
  );
}

function IconCheck({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L12.7348 11.2045L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z" fill="currentColor"/>
    </svg>
  );
}

function IconPerigo({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21.7605 15.92L15.3605 4.4C14.5005 2.85 13.3105 2 12.0005 2C10.6905 2 9.50047 2.85 8.64047 4.4L2.24047 15.92C1.43047 17.39 1.34047 18.8 1.99047 19.91C2.64047 21.02 3.92047 21.63 5.60047 21.63H18.4005C20.0805 21.63 21.3605 21.02 22.0105 19.91C22.6605 18.8 22.5705 17.38 21.7605 15.92ZM11.2505 9C11.2505 8.59 11.5905 8.25 12.0005 8.25C12.4105 8.25 12.7505 8.59 12.7505 9V14C12.7505 14.41 12.4105 14.75 12.0005 14.75C11.5905 14.75 11.2505 14.41 11.2505 14V9ZM12.7105 17.71C12.6605 17.75 12.6105 17.79 12.5605 17.83C12.5005 17.87 12.4405 17.9 12.3805 17.92C12.3205 17.95 12.2605 17.97 12.1905 17.98C12.1305 17.99 12.0605 18 12.0005 18C11.9405 18 11.8705 17.99 11.8005 17.98C11.7405 17.97 11.6805 17.95 11.6205 17.92C11.5605 17.9 11.5005 17.87 11.4405 17.83C11.3905 17.79 11.3405 17.75 11.2905 17.71C11.1105 17.52 11.0005 17.26 11.0005 17C11.0005 16.74 11.1105 16.48 11.2905 16.29C11.3405 16.25 11.3905 16.21 11.4405 16.17C11.5005 16.13 11.5605 16.1 11.6205 16.08C11.6805 16.05 11.7405 16.03 11.8005 16.02C11.9305 15.99 12.0705 15.99 12.1905 16.02C12.2605 16.03 12.3205 16.05 12.3805 16.08C12.4405 16.1 12.5005 16.13 12.5605 16.17C12.6105 16.21 12.6605 16.25 12.7105 16.29C12.8905 16.48 13.0005 16.74 13.0005 17C13.0005 17.26 12.8905 17.52 12.7105 17.71Z" fill="currentColor"/>
    </svg>
  );
}

const config: Record<
  SafetyLevel,
  { label: string; bg: string; text: string; Icon: React.ElementType }
> = {
  muito_seguro: {
    label: "Muito seguro",
    bg: "#1F5D3B",
    text: "#C6F59D",
    Icon: IconEscudo,
  },
  seguro: {
    label: "Seguro",
    bg: "#4CAF50",
    text: "#FFFFFF",
    Icon: IconCheck,
  },
  certificado: {
    label: "Bem avaliado por celíacos",
    bg: "#3B82F6",
    text: "#FFFFFF",
    Icon: IconEscudo,
  },
  moderado: {
    label: "Adaptável",
    bg: "#F59E0B",
    text: "#FFFFFF",
    Icon: IconPerigo,
  },
  cuidado: {
    label: "Cuidado",
    bg: "#C0392B",
    text: "#FFFFFF",
    Icon: IconPerigo,
  },
  verificado: {
    label: "Seguro",
    bg: "#4CAF50",
    text: "#FFFFFF",
    Icon: IconCheck,
  },
  novo: {
    label: "Bem avaliado por celíacos",
    bg: "#3B82F6",
    text: "#FFFFFF",
    Icon: IconEscudo,
  },
  recomendado: {
    label: "Muito seguro",
    bg: "#1F5D3B",
    text: "#C6F59D",
    Icon: IconEscudo,
  },
};

const sizes = {
  sm: { px: "10px", py: "5px", gap: "5px", fontSize: "10px", iconSize: 12 },
  md: { px: "12px", py: "6px", gap: "6px", fontSize: "12px", iconSize: 14 },
  lg: { px: "14px", py: "8px", gap: "7px", fontSize: "13px", iconSize: 16 },
};

interface SafetyBadgeProps {
  level: SafetyLevel;
  size?: "sm" | "md" | "lg";
}

export default function SafetyBadge({ level, size = "md" }: SafetyBadgeProps) {
  const { label, bg, text, Icon } = config[level];
  const { px, py, gap, fontSize, iconSize } = sizes[size];

  return (
    <span
      className="inline-flex items-center font-bold whitespace-nowrap rounded-full"
      style={{ backgroundColor: bg, color: text, paddingLeft: px, paddingRight: px, paddingTop: py, paddingBottom: py, gap }}
    >
      <Icon size={iconSize} />
      <span style={{ fontSize, letterSpacing: "0.04em", textTransform: "uppercase" }}>{label}</span>
    </span>
  );
}
