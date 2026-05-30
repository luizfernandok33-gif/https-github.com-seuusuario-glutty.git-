// ── Glútty Tag System ────────────────────────────────────────────────────────
// Tom-sobre-Tom palette: each allergen/category has its own color family.
// Background = light tint, text = deep shade of the same hue.
// Selected state → brand orange (#FC6904) background + white text.

export type TagSize = "sm" | "md" | "lg";

export interface TagColor {
  color: string;  // text color
  bg: string;     // background
}

// Tom-sobre-Tom palette
export const palette = {
  laranja:   { color: "#C8440A", bg: "#FFF0E6" },
  vermelho:  { color: "#C0392B", bg: "#FDECEA" },
  amarelo:   { color: "#B7791F", bg: "#FFFBEB" },
  verde:     { color: "#2E7D32", bg: "#E8F5E9" },
  azul:      { color: "#1565C0", bg: "#E3F2FD" },
  roxo:      { color: "#6A1B9A", bg: "#F3E5F5" },
  rosa:      { color: "#AD1457", bg: "#FCE4EC" },
  teal:      { color: "#00695C", bg: "#E0F2F1" },
  marrom:    { color: "#5D4037", bg: "#EFEBE9" },
  cinza:     { color: "#616161", bg: "#F5F5F5" },
} satisfies Record<string, TagColor>;

// Allergen → color mapping
export const allergenConfig: { tag: string; icon?: string } & TagColor extends never
  ? never
  : Record<string, TagColor & { tag: string; icon?: string }> = {
  gluten:        { tag: "Glúten",           icon: "🌾", ...palette.laranja  },
  lactose:       { tag: "Lactose",          icon: "🥛", ...palette.azul     },
  frutose:       { tag: "Frutose",          icon: "🍬", ...palette.amarelo  },
  caseina:       { tag: "Caseína",          icon: "🧀", ...palette.rosa     },
  oleaginosas:   { tag: "Oleaginosas",      icon: "🥜", ...palette.verde    },
  histamina:     { tag: "Histamina",        icon: "⚗️", ...palette.roxo     },
  sulfitos:      { tag: "Sulfitos",         icon: "🍷", ...palette.teal     },
  ovos:          { tag: "Ovos",             icon: "🥚", ...palette.amarelo  },
  amendoim:      { tag: "Amendoim",         icon: "🥜", ...palette.marrom   },
  soja:          { tag: "Soja",             icon: "🫘", ...palette.verde    },
  frutos_do_mar: { tag: "Frutos do Mar",    icon: "🦐", ...palette.teal     },
  mostarda:      { tag: "Mostarda",         icon: "🌻", ...palette.amarelo  },
  gergelim:      { tag: "Gergelim",         icon: "🌿", ...palette.marrom   },
  tremoco:       { tag: "Tremoço",          icon: "🟡", ...palette.laranja  },
  outras:        { tag: "Outras",                       ...palette.cinza    },
  proteina_veg:  { tag: "Proteína vegetal",             ...palette.verde    },
};

// User restriction tags (Profile)
export const restrictionConfig: Record<string, TagColor & { tag: string }> = {
  sem_gluten:    { tag: "Sem glúten",    ...palette.laranja  },
  sem_lactose:   { tag: "Sem lactose",   ...palette.azul     },
  sem_nozes:     { tag: "Sem nozes",     ...palette.vermelho },
  sem_ovo:       { tag: "Sem ovo",       ...palette.amarelo  },
  vegano:        { tag: "Vegano",        ...palette.verde    },
  vegetariano:   { tag: "Vegetariano",   ...palette.verde    },
};

// Cereal/Category tags (Alérgenos por Categoria)
export const categoryAllergens: Record<string, { label: string; items: string[]; palette: TagColor }> = {
  cereais:       { label: "Cereais",      items: ["Trigo","Centeio","Cevada","Aveia","Espelta","Kamut"],  palette: palette.azul    },
  laticinios:    { label: "Laticínios",   items: ["Leite","Queijo","Manteiga","Creme de leite","Iogurte"], palette: palette.azul   },
  ovos:          { label: "Ovos",         items: ["Ovo inteiro","Clara","Gema","Ovo de codorna"],          palette: palette.amarelo},
  oleaginosas:   { label: "Oleaginosas",  items: ["Amendoim","Castanha","Nozes","Amêndoa","Pistache","Avelã"], palette: palette.verde  },
  frutos_do_mar: { label: "Frutos do Mar",items: ["Camarão","Caranguejo","Lagosta","Mariscos","Ostras"],   palette: palette.teal   },
  soja:          { label: "Soja",         items: ["Soja","Tofu","Missô","Edamame","Proteína de soja"],     palette: palette.verde  },
};

// Tag size → font + padding
export const tagSizes: Record<TagSize, { fontSize: string; px: string; py: string }> = {
  sm: { fontSize: "10px", px: "10px", py: "4px"  },
  md: { fontSize: "12px", px: "12px", py: "5px"  },
  lg: { fontSize: "14px", px: "14px", py: "7px"  },
};

// Brand selected state
export const selectedStyle = { color: "#FFFFFF", bg: "#FC6904" };

// Maps restriction label strings → palette color (for restaurant "Restrições atendidas")
const restrictionLabelMap: Record<string, TagColor> = {
  "sem glúten":       palette.laranja,
  "sem lactose":      palette.azul,
  "sem nozes":        palette.vermelho,
  "sem ovo":          palette.amarelo,
  "vegano":           palette.verde,
  "vegetariano":      palette.verde,
  "pratos adaptáveis":palette.teal,
  "sem amendoim":     palette.marrom,
  "sem soja":         palette.verde,
  "sem frutos do mar":palette.teal,
};

export function getRestrictionColor(label: string): TagColor {
  return restrictionLabelMap[label.toLowerCase()] ?? palette.cinza;
}

// Maps ingredient keywords → allergen color (for prohibited ingredient display with strikethrough)
const ingredientColorMap: Array<{ keywords: string[]; color: TagColor }> = [
  { keywords: ["trigo", "farinha de trigo", "glúten", "gluten", "cevada", "centeio", "espelta", "kamut"], color: palette.vermelho },
  { keywords: ["aveia"],                                                                                    color: palette.laranja  },
  { keywords: ["leite", "lactose", "manteiga", "creme de leite", "iogurte", "caseína", "caseina"],         color: palette.azul     },
  { keywords: ["queijo"],                                                                                   color: palette.azul     },
  { keywords: ["ovo", "clara", "gema"],                                                                    color: palette.amarelo  },
  { keywords: ["amendoim"],                                                                                 color: palette.marrom   },
  { keywords: ["soja", "tofu", "missô", "edamame"],                                                       color: palette.verde    },
  { keywords: ["camarão", "caranguejo", "lagosta", "marisco", "ostra", "frutos do mar"],                  color: palette.teal     },
  { keywords: ["mostarda"],                                                                                 color: palette.amarelo  },
  { keywords: ["gergelim"],                                                                                 color: palette.marrom   },
  { keywords: ["nozes", "castanha", "amêndoa", "pistache", "avelã", "oleaginosa"],                       color: palette.verde    },
];

export function getIngredientColor(ingredient: string): TagColor {
  const lower = ingredient.toLowerCase();
  for (const entry of ingredientColorMap) {
    if (entry.keywords.some((kw) => lower.includes(kw))) return entry.color;
  }
  return palette.cinza;
}
