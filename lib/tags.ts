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
  primaria:  { color: "#1F3D34", bg: "#D4EDD4" },
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
  gluten:        { tag: "Glúten",           icon: "🌾", ...palette.primaria },
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
  sem_gluten:    { tag: "Sem glúten",    ...palette.primaria },
  sem_lactose:   { tag: "Sem lactose",   ...palette.azul     },
  sem_nozes:     { tag: "Sem nozes",     ...palette.vermelho },
  sem_ovo:       { tag: "Sem ovo",       ...palette.amarelo  },
  vegano:        { tag: "Vegano",        ...palette.verde    },
  vegetariano:   { tag: "Vegetariano",   ...palette.verde    },
};

// Cereal/Category tags (Alérgenos por Categoria)
export const categoryAllergens: Record<string, { label: string; items: string[]; palette: TagColor }> = {
  cereais:       { label: "Cereais",      items: ["Trigo","Centeio","Cevada","Aveia","Espelta","Kamut","Malte"],  palette: palette.primaria },
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

// Maps ingredient keywords → allergen color.
// Rule: each ingredient maps to the SAME color as its parent allergen in allergenConfig.
const ingredientColorMap: Array<{ keywords: string[]; color: TagColor }> = [
  // ── Glúten (primaria) ────────────────────────────────────────────────────
  { keywords: ["trigo", "farinha de trigo", "glúten", "gluten", "cevada", "centeio", "espelta", "kamut", "malte", "aveia"], color: palette.primaria },
  // ── Lactose (azul) ───────────────────────────────────────────────────────
  { keywords: ["leite", "lactose", "manteiga", "creme de leite", "iogurte", "queijo"], color: palette.azul },
  // ── Caseína (rosa) ───────────────────────────────────────────────────────
  { keywords: ["caseína", "caseina", "proteína do leite"],                     color: palette.rosa    },
  // ── Ovos (amarelo) ───────────────────────────────────────────────────────
  { keywords: ["ovo", "clara", "gema"],                                        color: palette.amarelo },
  // ── Amendoim (marrom) — alérgeno separado das oleaginosas ────────────────
  { keywords: ["amendoim"],                                                     color: palette.marrom  },
  // ── Oleaginosas / nozes (verde) ──────────────────────────────────────────
  { keywords: ["nozes", "castanha", "amêndoa", "pistache", "avelã", "oleaginosa"], color: palette.verde },
  // ── Soja (verde) ─────────────────────────────────────────────────────────
  { keywords: ["soja", "tofu", "missô", "edamame", "proteína de soja"],        color: palette.verde   },
  // ── Frutos do Mar (teal) ─────────────────────────────────────────────────
  { keywords: ["camarão", "caranguejo", "lagosta", "marisco", "ostra", "frutos do mar", "peixe", "atum", "sardinha", "salmão", "bacalhau"], color: palette.teal },
  // ── Mostarda (amarelo) ───────────────────────────────────────────────────
  { keywords: ["mostarda"],                                                     color: palette.amarelo },
  // ── Gergelim (marrom) ────────────────────────────────────────────────────
  { keywords: ["gergelim", "sésamo"],                                           color: palette.marrom  },
  // ── Histamina (roxo) — tomate, vinagre, vinho, embutidos ─────────────────
  { keywords: ["histamina", "tomate", "vinagre", "vinho", "espinafre", "atum enlatado", "embutido", "salsicha", "linguiça"], color: palette.roxo },
  // ── Sulfitos (teal) — conservantes à base de enxofre ─────────────────────
  { keywords: ["sulfito", "dióxido de enxofre", "bissulfito", "metabissulfito"], color: palette.teal  },
  // ── Frutose (amarelo) — frutas e vegetais ricos em frutose ───────────────
  { keywords: ["frutose", "mel", "maçã", "pera", "manga", "uva", "cebola", "alho"], color: palette.amarelo },
  // ── Tremoço (laranja) ────────────────────────────────────────────────────
  { keywords: ["tremoço", "tremoco", "lupino"],                                 color: palette.laranja },
  // ── Proteína vegetal (verde) ─────────────────────────────────────────────
  { keywords: ["proteína vegetal", "proteína veg", "glúten de trigo vital"],   color: palette.verde   },
  // ── Pimenta (laranja) — irritante mas não alérgeno ───────────────────────
  { keywords: ["pimenta"],                                                      color: palette.laranja },
];

export function getIngredientColor(ingredient: string): TagColor {
  const lower = ingredient.toLowerCase();
  for (const entry of ingredientColorMap) {
    if (entry.keywords.some((kw) => lower.includes(kw))) return entry.color;
  }
  return palette.cinza;
}
