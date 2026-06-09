"use client";
import { type SafetyLevel } from "@/lib/data";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

function IconAdaptavel({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M48.5,2h-3C44.7,2,44,2.7,44,3.5v7c0,0.9-1,1.5-1.6,0.8l0,0C37.7,6.1,31,3.4,23.7,4.1c-2.6,0.2-5.1,1-7.4,2.2c-1.2,0.6-2.4,1.3-3.4,2.1c-0.7,0.5-0.8,1.6-0.2,2.3l2.1,2.1c0.5,0.5,1.3,0.6,1.9,0.2c1.2-0.8,2.5-1.5,3.9-2.1c0.6-0.2,1.3-0.4,2-0.6c6.3-1.2,12.3,1.3,15.7,5.4c1.2,1.4,0.3,2.3-0.7,2.3h-7c-0.8,0-1.6,0.7-1.6,1.5v3c0,0.8,0.8,1.5,1.6,1.5h18.2c0.7,0,1.2-0.6,1.2-1.3V3.5C50,2.7,49.3,2,48.5,2z" fill="currentColor"/>
      <path d="M39.4,37.4c-0.6-0.6-1.5-0.6-2.1,0c-1.6,1.6-3.6,2.9-5.8,3.7c-0.6,0.2-1.3,0.4-2,0.6c-6.3,1.2-12.3-1.3-15.7-5.4c-1.2-1.4-0.3-2.3,0.7-2.3h7c0.8,0,1.5-0.7,1.5-1.5v-3c0-0.8-0.7-1.5-1.5-1.5H3.3C2.6,28,2,28.6,2,29.3v19.2C2,49.3,2.7,50,3.5,50h3C7.3,50,8,49.3,8,48.5v-7c0-0.9,1-1.5,1.6-0.8l0,0c4.6,5.2,11.4,7.9,18.7,7.2c2.6-0.2,5.1-1,7.4-2.2c2.2-1.1,4.1-2.5,5.7-4.1c0.6-0.6,0.6-1.6,0-2.1L39.4,37.4z" fill="currentColor"/>
    </svg>
  );
}

function IconEstrela({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.153 5.408C10.42 3.136 11.053 2 12 2c.947 0 1.58 1.136 2.847 3.408l.327.588c.36.645.54.968.821 1.181.28.213.63.292 1.328.45l.637.144C20.42 8.329 21.65 8.607 21.943 9.548c.292.94-.547 1.92-2.224 3.881l-.433.507c-.477.557-.715.836-.822 1.18-.107.345-.071.717.001 1.46l.065.677c.254 2.616.38 3.924-.385 4.506-.767.581-1.918.051-4.221-1.009l-.596-.274A2.819 2.819 0 0 0 12 20.025a2.819 2.819 0 0 0-1.329.451l-.595.274c-2.303 1.06-3.454 1.59-4.221 1.009-.767-.582-.64-1.89-.385-4.506l.065-.677c.072-.743.108-1.115.001-1.46-.107-.344-.345-.623-.822-1.18l-.433-.507C2.665 11.47 1.826 10.488 2.119 9.548 2.411 8.607 3.64 8.33 6.1 7.772l.636-.143c.7-.159 1.049-.238 1.33-.451.28-.213.46-.536.82-1.182l.327-.588Z" fill="currentColor"/>
    </svg>
  );
}

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
      <path d="M4 14L9 19L20 8M6 8.88889L9.07692 12L16 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
  { bg: string; text: string; Icon: React.ElementType }
> = {
  muito_seguro: { bg: "#1F5D3B", text: "#C6F59D", Icon: IconEscudo },
  seguro: { bg: "#4CAF50", text: "#FFFFFF", Icon: IconCheck },
  certificado: { bg: "#3B82F6", text: "#FFFFFF", Icon: IconEstrela },
  moderado: { bg: "#F59E0B", text: "#FFFFFF", Icon: IconAdaptavel },
  cuidado: { bg: "#C0392B", text: "#FFFFFF", Icon: IconPerigo },
  verificado: { bg: "#4CAF50", text: "#FFFFFF", Icon: IconCheck },
  novo: { bg: "#3B82F6", text: "#FFFFFF", Icon: IconEstrela },
  recomendado: { bg: "#1F5D3B", text: "#C6F59D", Icon: IconEscudo },
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
  const { t } = useLanguage();
  const { bg, text, Icon } = config[level];
  const { label, labelSm } = t.safetyBadge[level];
  const { px, py, gap, fontSize, iconSize } = sizes[size];
  const displayLabel = size === "sm" && labelSm ? labelSm : label;

  return (
    <span
      className="inline-flex items-center font-bold whitespace-nowrap rounded-full"
      style={{ backgroundColor: bg, color: text, paddingLeft: px, paddingRight: px, paddingTop: py, paddingBottom: py, gap }}
    >
      <Icon size={iconSize} />
      <span style={{ fontSize, letterSpacing: "0.04em", textTransform: "uppercase" }}>{displayLabel}</span>
    </span>
  );
}
