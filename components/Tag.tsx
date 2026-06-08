import { tagSizes, selectedStyle, type TagSize, type TagColor } from "@/lib/tags";

interface TagProps {
  label: string;
  colorConfig: TagColor;
  size?: TagSize;
  selected?: boolean;
  strikethrough?: boolean;   // for substituted ingredients
  arrow?: string;            // for adapted ingredients: shows "→ replacement"
  onClick?: () => void;
}

export default function Tag({
  label,
  colorConfig,
  size = "md",
  selected = false,
  strikethrough = false,
  arrow,
  onClick,
}: TagProps) {
  const { fontSize, px, py } = tagSizes[size];
  const { color, bg } = selected ? selectedStyle : colorConfig;

  const Tag = onClick ? "button" : "span";

  return (
    <span className="inline-flex items-center gap-1.5 flex-wrap">
      <Tag
        onClick={onClick}
        className="inline-flex items-center rounded-full transition-all active:scale-95"
        style={{
          fontSize,
          fontFamily: "var(--font-nunito), 'Nunito', sans-serif",
          fontWeight: 900,
          paddingLeft: px,
          paddingRight: px,
          paddingTop: py,
          paddingBottom: py,
          backgroundColor: bg,
          color,
          textDecoration: strikethrough ? "line-through" : "none",
          opacity: strikethrough ? 0.7 : 1,
          cursor: onClick ? "pointer" : "default",
        }}
      >
        {label}
      </Tag>

      {/* Adapted ingredient: show arrow + replacement */}
      {arrow && (
        <>
          <span style={{ fontSize: "10px", color: "#B7791F" }}>→</span>
          <span
            className="inline-flex items-center rounded-full"
            style={{
              fontSize,
              fontFamily: "var(--font-nunito), 'Nunito', sans-serif",
              fontWeight: 900,
              paddingLeft: px,
              paddingRight: px,
              paddingTop: py,
              paddingBottom: py,
              backgroundColor: "#FFFBEB",
              color: "#B7791F",
            }}
          >
            {arrow}
          </span>
        </>
      )}
    </span>
  );
}
