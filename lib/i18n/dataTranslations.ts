import type { DishAdaptation } from "@/lib/data";

export const restaurantTranslationsEn: Record<
  string,
  {
    city?: string;
    cuisine?: string;
    description?: string;
    openingHours?: string;
    features?: string[];
    restrictions?: string[];
    safetyProcedures?: string[];
    dishes?: Record<
      string,
      {
        name?: string;
        description?: string;
        ingredients?: string[];
        adaptations?: DishAdaptation[];
        restrictions?: string[];
        crossContaminationPrep?: string;
      }
    >;
    reviews?: Record<string, { tags?: string[]; comment?: string }>;
  }
> = {
  // ── Le Manjue Organique ──────────────────────────────────────
  "1": {
    cuisine: "Organic / Gluten-Free",
    openingHours: "Mon–Fri 12pm–3pm · 7pm–10:30pm · Sat 12pm–11pm",
    features: ["100% gluten-free", "Organic ingredients", "ACELBRA certified"],
    restrictions: ["Gluten-free", "Dairy-free", "Vegan", "Vegetarian"],
    safetyProcedures: [
      "Kitchen dedicated to gluten-free preparation (per the restaurant)",
      "Certified organic ingredients",
      "Staff trained in celiac disease",
      "ACELBRA certified since 2015",
    ],
    description:
      "A pioneer in São Paulo, Le Manjue is 100% gluten-free and organic. The entire kitchen was designed to never come into contact with gluten, and ingredients are tracked from farm to plate.",
    dishes: {
      d1: {
        name: "Wild Mushroom Risotto",
        description: "Arborio rice with a mix of mushrooms, parmesan and black truffle",
        ingredients: ["Arborio rice", "Porcini mushrooms", "Shiitake", "Parmesan", "Black truffle", "White wine"],
        crossContaminationPrep:
          "Prepared in a 100% gluten-free kitchen: pots, utensils and counters are dedicated, with no contact with wheat flour or other gluten-containing ingredients.",
      },
      d2: {
        name: "Rice Tagliatelle with Pesto",
        description: "Handmade rice pasta with fresh basil pesto and pine nuts",
        ingredients: ["Rice flour", "Organic eggs", "Basil", "Pine nuts", "Olive oil", "Parmesan"],
        adaptations: [{ original: "Wheat flour", replacement: "Whole rice flour" }],
        crossContaminationPrep:
          "The rice pasta is made with dedicated utensils and a separate counter, kept apart from gluten-containing ingredients. Staff change gloves at every step of preparation.",
      },
    },
    reviews: {
      r1: {
        tags: ["No contamination", "Knowledgeable staff", "Felt safe"],
        comment:
          "I've been coming here for 4 years. Never had a single reaction. The staff truly understands celiac disease — it's not just marketing. My favorite dish: the rice tagliatelle.",
      },
      r2: {
        tags: ["Would definitely return", "Clear menu"],
        comment:
          "I took my celiac mom here for her birthday. It was so moving to see her able to eat anything on the menu without worrying!",
      },
    },
  },

  // ── Haus Hiltl ───────────────────────────────────────────────
  "5": {
    city: "Zurich",
    cuisine: "Vegetarian / International",
    openingHours: "Mon–Wed 7am–10pm · Thu–Fri 7am–11pm · Sat 8am–11pm · Sun 10am–10pm",
    features: ["100% vegetarian buffet", "GF labels on every dish", "Swiss GF certified"],
    restrictions: ["Gluten-free", "Vegan", "Vegetarian", "Dairy-free", "Egg-free"],
    safetyProcedures: [
      "All GF dishes are clearly labeled",
      "Staff trained in food allergies",
      "Swiss Coeliac Society certification",
      "Buffet with separate trays by dietary restriction",
    ],
    description:
      "Founded in 1898, Hiltl is the oldest vegetarian restaurant still operating in the world. Its buffet in Zurich features clear allergen labeling and dozens of certified gluten-free options.",
    dishes: {
      d7: {
        name: "Rösti with Raclette Cheese",
        description: "Swiss potato rösti with melted raclette and pickled cucumber",
        ingredients: ["Potato", "Swiss raclette", "Clarified butter", "Pickled cucumber", "Caramelized onion"],
        crossContaminationPrep:
          "Cooked on a dedicated griddle that is sanitized before use, with separate utensils for gluten-free dishes and clear labeling on the buffet.",
      },
      d8: {
        name: "Chickpea Curry",
        description: "Chickpeas with coconut milk, spices and basmati rice",
        ingredients: ["Chickpeas", "Coconut milk", "Tomato", "Spinach", "Turmeric", "Cumin", "Basmati rice"],
        crossContaminationPrep:
          "Cooked in a pot reserved for gluten-free dishes, with ingredients weighed and stored separately from items containing gluten.",
      },
      d11: {
        name: "Hiltl Burger",
        description:
          "Vegan plant-based burger with baby lettuce, tomato, red onion, burger sauce and spiced ketchup, served on a traditional brioche bun. Swiss cheese option available.",
        ingredients: ["Hiltl plant-based patty", "Brioche bun", "Baby lettuce", "Tomato", "Red onion", "Burger sauce", "Spiced ketchup"],
        restrictions: ["Vegan", "Vegetarian"],
        crossContaminationPrep:
          "The traditional brioche bun contains gluten. The restaurant can offer a gluten-free bun on request, but does not guarantee zero cross-contamination in the kitchen for this item.",
      },
    },
    reviews: {
      r6: {
        tags: ["No contamination", "Knowledgeable staff", "Felt safe"],
        comment:
          "I visited during an exchange program in Zurich. Hiltl is amazing — every item on the buffet has an allergen label and the staff talk about celiac disease so naturally.",
      },
    },
  },

  // ── Tibits ───────────────────────────────────────────────────
  "6": {
    city: "Zurich",
    cuisine: "Vegetarian / Buffet",
    openingHours: "Mon–Thu 6:30am–11pm · Fri–Sat 6:30am–midnight · Sun 9am–11pm",
    features: ["Pay-by-weight buffet", "GF labeled on every dish", "Seasonal ingredients"],
    restrictions: ["Gluten-free", "Vegan", "Vegetarian"],
    safetyProcedures: [
      "Allergen labeling on every tray",
      "Staff trained in dietary restrictions",
      "Organic, seasonal ingredients",
    ],
    description:
      "Tibits is a chain of Swiss vegetarian buffets with rigorous allergen labeling. At the lakeside Seefeld location, gluten-free dishes are clearly marked.",
    dishes: {
      d9: {
        name: "Puy Lentil Salad",
        description: "Green lentils with mustard vinaigrette, herbs and crisp vegetables",
        ingredients: ["Puy lentils", "Carrot", "Celery", "GF Dijon mustard", "Balsamic vinegar", "Parsley"],
        crossContaminationPrep:
          "Assembled at a separate buffet station, with dedicated serving utensils and gloves changed between preparations to avoid cross-contact.",
      },
    },
    reviews: {
      r7: {
        tags: ["Clear menu", "Felt safe", "Would definitely return"],
        comment:
          "Every dish has a list of ingredients and allergens. I went with my celiac wife and she ate with complete peace of mind.",
      },
    },
  },

  // ── Marktküche ───────────────────────────────────────────────
  "7": {
    city: "Zurich",
    cuisine: "Contemporary European",
    openingHours: "Wed–Fri 5:30pm–11:30pm · Sat 12pm–3pm · 5:30pm–11:30pm",
    features: ["Seasonal menu", "GF dishes labeled", "Local produce"],
    restrictions: ["Gluten-free", "Adaptable dishes"],
    safetyProcedures: [
      "GF dishes labeled on the menu",
      "Chef informed about celiac disease",
      "Local ingredients from the weekly market",
    ],
    description:
      "A contemporary restaurant in the historic Niederdorf neighborhood, with a menu built around the local weekly market. Gluten-free dishes are labeled and the chef adapts orders with advance notice.",
    dishes: {
      d10: {
        name: "Creamy Polenta with Funghi",
        description: "Creamy Swiss polenta with a mix of mushrooms and fresh herbs",
        ingredients: ["Fine polenta", "Porcini mushrooms", "Chanterelle", "Garlic", "Thyme", "Sbrinz cheese"],
        crossContaminationPrep:
          "Prepared in a pot reserved for gluten-free dishes, with the chef notified in advance to reinforce the use of separate utensils and cutting boards.",
      },
    },
    reviews: {
      r8: {
        tags: ["Clear menu", "Welcoming atmosphere"],
        comment:
          "Really great experience. I told the waiter about my celiac disease and he brought the chef over to confirm the ingredients. The polenta is divine.",
      },
    },
  },

  // ── Healthy Bites Atelier ────────────────────────────────────
  "healthy-bites-atelier": {
    cuisine: "Patisserie",
    features: ["Gluten-free", "Dairy-free", "Sugar-free", "Fit"],
    restrictions: ["Gluten-free", "Dairy-free", "Sugar-free"],
    safetyProcedures: [
      "Uses gluten-free ingredients in specific products",
      "No clear confirmation of dedicated celiac-safe operations",
    ],
    description: "Healthy patisserie with gluten-free, dairy-free and sugar-free treats.",
    dishes: {
      "hba-d1": { name: "Fit cocoa cake with nuts" },
      "hba-d2": { name: "Brownie with hazelnut sauce" },
      "hba-d3": { name: "Fit banoffee" },
      "hba-d4": { name: "Functional Easter eggs" },
    },
  },

  // ── Grão Fino ────────────────────────────────────────────────
  "grao-fino": {
    cuisine: "Bakery / Café / Functional Restaurant",
    features: ["100% gluten-free", "Dairy-free", "Functional", "Brunch"],
    restrictions: ["Gluten-free", "Dairy-free"],
    safetyProcedures: [
      "Production focused on dietary restrictions",
      "Strong focus on alternative ingredients and preparation control",
    ],
    description: "A functional bakery with gluten-free and dairy-free production, focused on healthy eating.",
    dishes: {
      "grao-fino-d1": { name: "French-style bread" },
      "grao-fino-d2": { name: "Pumpkin bread" },
      "grao-fino-d3": { name: "Gluten-free ciabatta" },
      "grao-fino-d4": { name: "Low-carb almond bread" },
      "grao-fino-d5": { name: "Tapioca with creamy chicken" },
      "grao-fino-d6": { name: "Burger on a gluten-free bun" },
      "grao-fino-d7": { name: "Gluten-free waffle" },
    },
  },

  // ── Pandan ───────────────────────────────────────────────────
  pandan: {
    cuisine: "Restaurant / Bakery / Patisserie",
    features: ["100% gluten-free", "Bakery", "Patisserie", "Comfort food"],
    restrictions: ["Gluten-free"],
    safetyProcedures: [
      "Focus on safe dining for celiacs",
      "Concept dedicated to gluten-free guests",
    ],
    description: "A restaurant and lab specializing in gluten-free food, with a focus on safety and warmth.",
    dishes: {
      "pandan-d1": { name: "Chicken stroganoff with rice and shoestring potatoes" },
      "pandan-d2": { name: "Ham and cheese rondelli" },
      "pandan-d3": { name: "Chicken thigh with rosemary sauce and pumpkin cream" },
      "pandan-d4": { name: "Gluten-free French bread" },
      "pandan-d5": { name: "Gluten-free brioche" },
      "pandan-d6": { name: "Mixed berry cheesecake" },
    },
  },

  // ── Pizza For Fun ────────────────────────────────────────────
  "pizza-for-fun": {
    cuisine: "Pizzeria",
    features: ["100% gluten-free", "No cross-contamination", "Dedicated kitchen"],
    restrictions: ["Gluten-free"],
    safetyProcedures: [
      "Dedicated environment, no gluten enters the premises",
      "Explicit communication about the absence of cross-contamination",
    ],
    description: "A pizzeria specializing in 100% gluten-free pizzas.",
    dishes: {
      "pff-d1": { name: "Margherita" },
      "pff-d2": { name: "Caprese" },
      "pff-d3": { name: "Tre Funghi" },
      "pff-d4": { name: "Pepperoni" },
      "pff-d5": { name: "Bergamo" },
      "pff-d6": { name: "Chocolate with banana" },
    },
  },

  // ── Jampa Nutrileve ──────────────────────────────────────────
  "jampa-nutrileve": {
    cuisine: "Restaurant / Pizzeria",
    features: ["100% gluten-free", "No cross-contamination", "Inclusive"],
    restrictions: ["Gluten-free"],
    safetyProcedures: [
      "States gluten-free operations with no cross-contamination",
      "Focus on food inclusion",
    ],
    description: "A gluten-free restaurant and pizzeria with a light, inclusive concept.",
    dishes: {
      "jnl-d1": { name: "Shrimp pizza" },
      "jnl-d2": { name: "Large gluten-free pizzas" },
      "jnl-d3": { name: "Flour-free protein dishes" },
      "jnl-d4": { name: "Combo meals with a drink" },
    },
  },

  // ── Lola Paleo ───────────────────────────────────────────────
  "lola-paleo": {
    cuisine: "Bakery / Patisserie / Functional Café",
    features: ["Gluten-free", "Dairy-free", "Sugar-free", "Paleo"],
    restrictions: ["Gluten-free", "Dairy-free", "Sugar-free"],
    safetyProcedures: [
      "Good range of gluten-free products",
      "No clear evidence of strict cross-contamination control",
    ],
    description: "A functional bakery and patisserie with gluten-free, sugar-free and dairy-free products.",
    dishes: {
      "lp-d1": { name: "Almond breads" },
      "lp-d2": { name: "Pistachio breads" },
      "lp-d3": { name: "Croissants" },
      "lp-d4": { name: "Pies" },
      "lp-d5": { name: "Low-carb pizzas" },
      "lp-d6": { name: "Frozen meal prep" },
    },
  },

  // ── Juro de Dedinho ──────────────────────────────────────────
  "juro-de-dedinho": {
    city: "Porto Alegre / São Paulo",
    cuisine: "Confectionery / Patisserie",
    features: ["100% gluten-free", "Dairy-free", "Sugar-free", "Vegan option"],
    restrictions: ["Gluten-free", "Dairy-free", "Sugar-free"],
    safetyProcedures: [
      "Gluten-free kitchen",
      "Explicit communication of safety for celiacs",
    ],
    description: "An inclusive confectionery with gluten-free, dairy-free and sugar-free treats.",
    dishes: {
      "jdd-d1": { name: "Cookies and cream truffle" },
      "jdd-d2": { name: "Mixed berry truffle" },
      "jdd-d3": { name: "Pistachio truffle" },
      "jdd-d4": { name: "Brownie" },
      "jdd-d5": { name: "Alfajor" },
      "jdd-d6": { name: "Jarred sweets" },
    },
  },

  // ── Libera ───────────────────────────────────────────────────
  libera: {
    city: "Zurich",
    cuisine: "Café / Bistro",
    features: ["100% gluten-free", "Vegan option", "Dairy-free option", "Brunch"],
    restrictions: ["Gluten-free"],
    safetyProcedures: [
      "Concept built to serve people who need zero gluten contamination",
    ],
    description: "A café and bistro in Zurich with a gluten-free menu and a focus on safety.",
    dishes: {
      "lib-d1": { name: "Gluten-free croissants" },
      "lib-d2": { name: "Nutritious bowls" },
      "lib-d3": { name: "Light dishes" },
      "lib-d4": { name: "Vegetarian options", restrictions: ["Gluten-free", "Vegetarian"] },
      "lib-d5": { name: "Vegan options", restrictions: ["Gluten-free", "Vegan"] },
    },
  },

  // ── Zufreeden ────────────────────────────────────────────────
  zufreeden: {
    city: "Zurich",
    cuisine: "Café / Bakery / Patisserie",
    features: ["100% gluten-free", "Artisan bakery", "Brunch", "Sweets"],
    restrictions: ["Gluten-free"],
    safetyProcedures: [
      "Ingredients, environment and equipment dedicated to safe celiac preparation",
    ],
    description: "An artisan café and bakery with a 100% gluten-free operation.",
    dishes: {
      "zuf-d1": { name: "Buckwheat bread" },
      "zuf-d2": { name: "Pretzels" },
      "zuf-d3": { name: "Sandwiches" },
      "zuf-d4": { name: "Quiches" },
      "zuf-d5": { name: "Brownies" },
      "zuf-d6": { name: "Cheesecake" },
      "zuf-d7": { name: "Banana bread" },
    },
  },

  // ── À VIE Baked Goods ────────────────────────────────────────
  "a-vie": {
    city: "Zurich",
    cuisine: "Patisserie / Bakery",
    features: ["100% gluten-free", "Patisserie", "Premium", "Sweets"],
    restrictions: ["Gluten-free"],
    safetyProcedures: [
      "Business born from real experience with celiac disease",
      "Focus on safety and sophistication",
    ],
    description: "An artisan patisserie in Zurich with gluten-free products inspired by French pastry-making.",
    dishes: {
      "avie-d1": { name: "Artisan brioches" },
      "avie-d2": { name: "French tarts" },
      "avie-d3": { name: "Modern pâtisserie" },
      "avie-d4": { name: "Refined sweets" },
    },
  },

  // ── Jackie's ─────────────────────────────────────────────────
  jackies: {
    city: "Kemptthal",
    cuisine: "Bakery / Patisserie",
    features: ["100% gluten-free", "Artisan bakery", "Frozen goods", "Vegan option"],
    restrictions: ["Gluten-free"],
    safetyProcedures: [
      "Dedicated production with in-house recipes",
      "Focus on safe consumption at home or on the go",
    ],
    description: "An artisan bakery with fully gluten-free production and everyday products.",
    dishes: {
      "jck-d1": { name: "Artisan gluten-free breads" },
      "jck-d2": { name: "Adapted traditional sweets" },
      "jck-d3": { name: "Frozen products" },
    },
  },

  // ── Granò ────────────────────────────────────────────────────
  grano: {
    city: "Zurich",
    cuisine: "Italian Restaurant / Pizzeria",
    features: ["100% gluten-free", "Italian", "Pizza", "Dairy-free option"],
    restrictions: ["Gluten-free"],
    safetyProcedures: [
      "Dedicated kitchen and exclusive oven",
      "Operation with no risk of cross-contamination",
    ],
    description: "An Italian restaurant in Zurich with a 100% gluten-free kitchen.",
    dishes: {
      "grano-d1": { name: "Classic Italian pizzas" },
      "grano-d2": { name: "Weekly special pizzas" },
      "grano-d3": { name: "Italian desserts" },
      "grano-d4": { name: "Gluten-free beers" },
    },
  },
};

export const restaurantTranslationsDe: Record<
  string,
  {
    city?: string;
    cuisine?: string;
    description?: string;
    openingHours?: string;
    features?: string[];
    restrictions?: string[];
    safetyProcedures?: string[];
    dishes?: Record<
      string,
      {
        name?: string;
        description?: string;
        ingredients?: string[];
        adaptations?: DishAdaptation[];
        restrictions?: string[];
        crossContaminationPrep?: string;
      }
    >;
    reviews?: Record<string, { tags?: string[]; comment?: string }>;
  }
> = {
  // ── Le Manjue Organique ──────────────────────────────────────
  "1": {
    cuisine: "Bio / Glutenfrei",
    openingHours: "Mo–Fr 12–15 Uhr · 19–22:30 Uhr · Sa 12–23 Uhr",
    features: ["100% glutenfrei", "Bio-Zutaten", "ACELBRA-zertifiziert"],
    restrictions: ["Glutenfrei", "Laktosefrei", "Vegan", "Vegetarisch"],
    safetyProcedures: [
      "Küche ausschließlich für glutenfreie Zubereitung (laut Restaurant)",
      "Zertifizierte Bio-Zutaten",
      "Personal in Zöliakie geschult",
      "ACELBRA-zertifiziert seit 2015",
    ],
    description:
      "Ein Pionier in São Paulo, Le Manjue ist 100% glutenfrei und bio. Die gesamte Küche wurde so gestaltet, dass sie nie mit Gluten in Kontakt kommt, und die Zutaten werden vom Hof bis zum Teller nachverfolgt.",
    dishes: {
      d1: {
        name: "Risotto mit wilden Pilzen",
        description: "Arborio-Reis mit einer Pilzmischung, Parmesan und schwarzem Trüffel",
        ingredients: ["Arborio-Reis", "Steinpilze", "Shiitake", "Parmesan", "Schwarzer Trüffel", "Weißwein"],
        crossContaminationPrep:
          "Zubereitet in einer 100% glutenfreien Küche: Töpfe, Utensilien und Arbeitsflächen sind ausschließlich dafür bestimmt, ohne Kontakt zu Weizenmehl oder anderen glutenhaltigen Zutaten.",
      },
      d2: {
        name: "Reis-Tagliatelle mit Pesto",
        description: "Handgemachte Reisnudeln mit frischem Basilikum-Pesto und Pinienkernen",
        ingredients: ["Reismehl", "Bio-Eier", "Basilikum", "Pinienkerne", "Olivenöl", "Parmesan"],
        adaptations: [{ original: "Weizenmehl", replacement: "Vollkorn-Reismehl" }],
        crossContaminationPrep:
          "Die Reisnudeln werden mit eigenen Utensilien und auf einer separaten Arbeitsfläche zubereitet, getrennt von glutenhaltigen Zutaten. Das Personal wechselt bei jedem Zubereitungsschritt die Handschuhe.",
      },
    },
    reviews: {
      r1: {
        tags: ["Keine Kontamination", "Kompetentes Personal", "Fühlte mich sicher"],
        comment:
          "Ich komme seit 4 Jahren hierher. Nie eine einzige Reaktion gehabt. Das Personal versteht Zöliakie wirklich — das ist keine reine Marketingaussage. Mein Lieblingsgericht: die Reis-Tagliatelle.",
      },
      r2: {
        tags: ["Würde definitiv wiederkommen", "Klare Speisekarte"],
        comment:
          "Ich war hier mit meiner zöliakiebetroffenen Mutter zum Geburtstag. Es war so bewegend zu sehen, wie sie alles auf der Speisekarte ohne Sorge essen konnte!",
      },
    },
  },

  // ── Haus Hiltl ───────────────────────────────────────────────
  "5": {
    city: "Zürich",
    cuisine: "Vegetarisch / International",
    openingHours: "Mo–Mi 7–22 Uhr · Do–Fr 7–23 Uhr · Sa 8–23 Uhr · So 10–22 Uhr",
    features: ["100% vegetarisches Buffet", "GF-Kennzeichnung bei jedem Gericht", "Schweizer GF-zertifiziert"],
    restrictions: ["Glutenfrei", "Vegan", "Vegetarisch", "Laktosefrei", "Eifrei"],
    safetyProcedures: [
      "Alle GF-Gerichte sind klar gekennzeichnet",
      "Personal in Lebensmittelallergien geschult",
      "Zertifizierung der Schweizerischen Zöliakiegesellschaft",
      "Buffet mit getrennten Tabletts nach Ernährungseinschränkung",
    ],
    description:
      "1898 gegründet, ist Hiltl das älteste noch betriebene vegetarische Restaurant der Welt. Sein Buffet in Zürich bietet eine klare Allergenkennzeichnung und Dutzende zertifizierte glutenfreie Optionen.",
    dishes: {
      d7: {
        name: "Rösti mit Raclette-Käse",
        description: "Schweizer Kartoffelrösti mit geschmolzenem Raclette und eingelegter Gurke",
        ingredients: ["Kartoffel", "Schweizer Raclette", "Geklärte Butter", "Eingelegte Gurke", "Karamellisierte Zwiebel"],
        crossContaminationPrep:
          "Auf einer eigenen Grillplatte zubereitet, die vor Gebrauch desinfiziert wird, mit separaten Utensilien für glutenfreie Gerichte und klarer Kennzeichnung am Buffet.",
      },
      d8: {
        name: "Kichererbsen-Curry",
        description: "Kichererbsen mit Kokosmilch, Gewürzen und Basmatireis",
        ingredients: ["Kichererbsen", "Kokosmilch", "Tomate", "Spinat", "Kurkuma", "Kreuzkümmel", "Basmatireis"],
        crossContaminationPrep:
          "Zubereitet in einem für glutenfreie Gerichte reservierten Topf, mit Zutaten, die separat von glutenhaltigen Produkten abgewogen und gelagert werden.",
      },
      d11: {
        name: "Hiltl Burger",
        description:
          "Veganer Pflanzen-Patty mit Babysalat, Tomate, roter Zwiebel, Burgersauce und würzigem Ketchup, serviert auf einem traditionellen Brioche-Brötchen. Schweizer-Käse-Option erhältlich.",
        ingredients: ["Hiltl Pflanzen-Patty", "Brioche-Brötchen", "Babysalat", "Tomate", "Rote Zwiebel", "Burgersauce", "Würziges Ketchup"],
        restrictions: ["Vegan", "Vegetarisch"],
        crossContaminationPrep:
          "Das traditionelle Brioche-Brötchen enthält Gluten. Das Restaurant kann auf Anfrage ein glutenfreies Brötchen anbieten, garantiert aber für dieses Gericht keine völlig kontaminationsfreie Küche.",
      },
    },
    reviews: {
      r6: {
        tags: ["Keine Kontamination", "Kompetentes Personal", "Fühlte mich sicher"],
        comment:
          "Ich war während eines Austauschprogramms in Zürich dort. Hiltl ist großartig — jedes Buffet-Gericht hat eine Allergenkennzeichnung und das Personal spricht ganz natürlich über Zöliakie.",
      },
    },
  },

  // ── Tibits ───────────────────────────────────────────────────
  "6": {
    city: "Zürich",
    cuisine: "Vegetarisch / Buffet",
    openingHours: "Mo–Do 6:30–23 Uhr · Fr–Sa 6:30–0 Uhr · So 9–23 Uhr",
    features: ["Buffet nach Gewicht", "GF-Kennzeichnung bei jedem Gericht", "Saisonale Zutaten"],
    restrictions: ["Glutenfrei", "Vegan", "Vegetarisch"],
    safetyProcedures: [
      "Allergenkennzeichnung auf jedem Tablett",
      "Personal in Ernährungseinschränkungen geschult",
      "Bio-, saisonale Zutaten",
    ],
    description:
      "Tibits ist eine Kette von Schweizer vegetarischen Buffets mit strenger Allergenkennzeichnung. Am Standort Seefeld am See sind glutenfreie Gerichte klar markiert.",
    dishes: {
      d9: {
        name: "Puy-Linsen-Salat",
        description: "Grüne Linsen mit Senfvinaigrette, Kräutern und knackigem Gemüse",
        ingredients: ["Puy-Linsen", "Karotte", "Sellerie", "GF-Dijon-Senf", "Balsamico-Essig", "Petersilie"],
        crossContaminationPrep:
          "Wird an einer separaten Buffetstation zusammengestellt, mit eigenem Servierbesteck und gewechselten Handschuhen zwischen den Zubereitungen, um Kreuzkontakt zu vermeiden.",
      },
    },
    reviews: {
      r7: {
        tags: ["Klare Speisekarte", "Fühlte mich sicher", "Würde definitiv wiederkommen"],
        comment:
          "Jedes Gericht hat eine Liste der Zutaten und Allergene. Ich war mit meiner zöliakiebetroffenen Frau dort und sie konnte völlig unbesorgt essen.",
      },
    },
  },

  // ── Marktküche ───────────────────────────────────────────────
  "7": {
    city: "Zürich",
    cuisine: "Zeitgenössisch europäisch",
    openingHours: "Mi–Fr 17:30–23:30 Uhr · Sa 12–15 Uhr · 17:30–23:30 Uhr",
    features: ["Saisonale Speisekarte", "GF-Gerichte gekennzeichnet", "Lokale Produkte"],
    restrictions: ["Glutenfrei", "Anpassbare Gerichte"],
    safetyProcedures: [
      "GF-Gerichte auf der Speisekarte gekennzeichnet",
      "Küchenchef über Zöliakie informiert",
      "Lokale Zutaten vom Wochenmarkt",
    ],
    description:
      "Ein zeitgenössisches Restaurant im historischen Niederdorf, mit einer Speisekarte rund um den lokalen Wochenmarkt. Glutenfreie Gerichte sind gekennzeichnet und der Küchenchef passt Bestellungen mit Vorankündigung an.",
    dishes: {
      d10: {
        name: "Cremige Polenta mit Pilzen",
        description: "Cremige Schweizer Polenta mit einer Pilzmischung und frischen Kräutern",
        ingredients: ["Feine Polenta", "Steinpilze", "Pfifferlinge", "Knoblauch", "Thymian", "Sbrinz-Käse"],
        crossContaminationPrep:
          "Zubereitet in einem für glutenfreie Gerichte reservierten Topf, wobei der Küchenchef vorab informiert wird, um den Einsatz separater Utensilien und Schneidebretter zu verstärken.",
      },
    },
    reviews: {
      r8: {
        tags: ["Klare Speisekarte", "Einladende Atmosphäre"],
        comment:
          "Wirklich tolle Erfahrung. Ich erzählte dem Kellner von meiner Zöliakie und er holte den Küchenchef, um die Zutaten zu bestätigen. Die Polenta ist himmlisch.",
      },
    },
  },

  // ── Healthy Bites Atelier ────────────────────────────────────
  "healthy-bites-atelier": {
    cuisine: "Konditorei",
    features: ["Glutenfrei", "Laktosefrei", "Zuckerfrei", "Fit"],
    restrictions: ["Glutenfrei", "Laktosefrei", "Zuckerfrei"],
    safetyProcedures: [
      "Verwendet glutenfreie Zutaten bei bestimmten Produkten",
      "Keine klare Bestätigung eines speziell für Zöliakie ausgelegten Betriebs",
    ],
    description: "Gesunde Konditorei mit glutenfreien, laktosefreien und zuckerfreien Köstlichkeiten.",
    dishes: {
      "hba-d1": { name: "Fit-Kakaokuchen mit Nüssen" },
      "hba-d2": { name: "Brownie mit Haselnusssauce" },
      "hba-d3": { name: "Fit-Banoffee" },
      "hba-d4": { name: "Functional-Ostereier" },
    },
  },

  // ── Grão Fino ────────────────────────────────────────────────
  "grao-fino": {
    cuisine: "Bäckerei / Café / Functional-Restaurant",
    features: ["100% glutenfrei", "Laktosefrei", "Functional", "Brunch"],
    restrictions: ["Glutenfrei", "Laktosefrei"],
    safetyProcedures: [
      "Produktion auf Ernährungseinschränkungen ausgerichtet",
      "Starker Fokus auf alternative Zutaten und Zubereitungskontrolle",
    ],
    description: "Eine Functional-Bäckerei mit glutenfreier und laktosefreier Produktion, fokussiert auf gesunde Ernährung.",
    dishes: {
      "grao-fino-d1": { name: "Französisches Brot" },
      "grao-fino-d2": { name: "Kürbisbrot" },
      "grao-fino-d3": { name: "Glutenfreie Ciabatta" },
      "grao-fino-d4": { name: "Low-Carb-Mandelbrot" },
      "grao-fino-d5": { name: "Tapioka mit cremigem Hühnchen" },
      "grao-fino-d6": { name: "Burger im glutenfreien Brötchen" },
      "grao-fino-d7": { name: "Glutenfreie Waffel" },
    },
  },

  // ── Pandan ───────────────────────────────────────────────────
  pandan: {
    cuisine: "Restaurant / Bäckerei / Konditorei",
    features: ["100% glutenfrei", "Bäckerei", "Konditorei", "Comfort Food"],
    restrictions: ["Glutenfrei"],
    safetyProcedures: [
      "Fokus auf sicheres Essen für Zöliakiebetroffene",
      "Konzept speziell für glutenfreie Gäste",
    ],
    description: "Ein Restaurant und Labor, das sich auf glutenfreie Küche spezialisiert hat, mit Fokus auf Sicherheit und Herzlichkeit.",
    dishes: {
      "pandan-d1": { name: "Hühnchen-Stroganoff mit Reis und Kartoffelstroh" },
      "pandan-d2": { name: "Schinken-Käse-Rondelli" },
      "pandan-d3": { name: "Hühnerschenkel mit Rosmarinsauce und Kürbiscreme" },
      "pandan-d4": { name: "Glutenfreies französisches Brot" },
      "pandan-d5": { name: "Glutenfreie Brioche" },
      "pandan-d6": { name: "Beeren-Cheesecake" },
    },
  },

  // ── Pizza For Fun ────────────────────────────────────────────
  "pizza-for-fun": {
    cuisine: "Pizzeria",
    features: ["100% glutenfrei", "Keine Kreuzkontamination", "Eigene Küche"],
    restrictions: ["Glutenfrei"],
    safetyProcedures: [
      "Eigener Bereich, kein Gluten gelangt in die Räumlichkeiten",
      "Ausdrückliche Kommunikation über die Abwesenheit von Kreuzkontamination",
    ],
    description: "Eine Pizzeria, die sich auf 100% glutenfreie Pizzen spezialisiert hat.",
    dishes: {
      "pff-d1": { name: "Margherita" },
      "pff-d2": { name: "Caprese" },
      "pff-d3": { name: "Tre Funghi" },
      "pff-d4": { name: "Peperoni" },
      "pff-d5": { name: "Bergamo" },
      "pff-d6": { name: "Schokolade mit Banane" },
    },
  },

  // ── Jampa Nutrileve ──────────────────────────────────────────
  "jampa-nutrileve": {
    cuisine: "Restaurant / Pizzeria",
    features: ["100% glutenfrei", "Keine Kreuzkontamination", "Inklusiv"],
    restrictions: ["Glutenfrei"],
    safetyProcedures: [
      "Erklärt glutenfreien Betrieb ohne Kreuzkontamination",
      "Fokus auf Ernährungsinklusion",
    ],
    description: "Ein glutenfreies Restaurant und Pizzeria mit einem leichten, inklusiven Konzept.",
    dishes: {
      "jnl-d1": { name: "Garnelen-Pizza" },
      "jnl-d2": { name: "Große glutenfreie Pizzen" },
      "jnl-d3": { name: "Mehlfreie Proteingerichte" },
      "jnl-d4": { name: "Kombimenüs mit Getränk" },
    },
  },

  // ── Lola Paleo ───────────────────────────────────────────────
  "lola-paleo": {
    cuisine: "Bäckerei / Konditorei / Functional-Café",
    features: ["Glutenfrei", "Laktosefrei", "Zuckerfrei", "Paleo"],
    restrictions: ["Glutenfrei", "Laktosefrei", "Zuckerfrei"],
    safetyProcedures: [
      "Gute Auswahl an glutenfreien Produkten",
      "Keine klaren Belege für strenge Kreuzkontaminationskontrolle",
    ],
    description: "Eine Functional-Bäckerei und Konditorei mit glutenfreien, zuckerfreien und laktosefreien Produkten.",
    dishes: {
      "lp-d1": { name: "Mandelbrote" },
      "lp-d2": { name: "Pistazienbrote" },
      "lp-d3": { name: "Croissants" },
      "lp-d4": { name: "Kuchen" },
      "lp-d5": { name: "Low-Carb-Pizzen" },
      "lp-d6": { name: "Tiefkühl-Fertiggerichte" },
    },
  },

  // ── Juro de Dedinho ──────────────────────────────────────────
  "juro-de-dedinho": {
    city: "Porto Alegre / São Paulo",
    cuisine: "Konditorei / Süßwaren",
    features: ["100% glutenfrei", "Laktosefrei", "Zuckerfrei", "Vegane Option"],
    restrictions: ["Glutenfrei", "Laktosefrei", "Zuckerfrei"],
    safetyProcedures: [
      "Glutenfreie Küche",
      "Ausdrückliche Kommunikation der Sicherheit für Zöliakiebetroffene",
    ],
    description: "Eine inklusive Konditorei mit glutenfreien, laktosefreien und zuckerfreien Köstlichkeiten.",
    dishes: {
      "jdd-d1": { name: "Cookies-and-Cream-Trüffel" },
      "jdd-d2": { name: "Beerenmix-Trüffel" },
      "jdd-d3": { name: "Pistazien-Trüffel" },
      "jdd-d4": { name: "Brownie" },
      "jdd-d5": { name: "Alfajor" },
      "jdd-d6": { name: "Süßigkeiten im Glas" },
    },
  },

  // ── Libera ───────────────────────────────────────────────────
  libera: {
    city: "Zürich",
    cuisine: "Café / Bistro",
    features: ["100% glutenfrei", "Vegane Option", "Laktosefreie Option", "Brunch"],
    restrictions: ["Glutenfrei"],
    safetyProcedures: [
      "Konzept entwickelt für Menschen, die null Glutenkontamination benötigen",
    ],
    description: "Ein Café und Bistro in Zürich mit glutenfreier Speisekarte und Fokus auf Sicherheit.",
    dishes: {
      "lib-d1": { name: "Glutenfreie Croissants" },
      "lib-d2": { name: "Nahrhafte Bowls" },
      "lib-d3": { name: "Leichte Gerichte" },
      "lib-d4": { name: "Vegetarische Optionen", restrictions: ["Glutenfrei", "Vegetarisch"] },
      "lib-d5": { name: "Vegane Optionen", restrictions: ["Glutenfrei", "Vegan"] },
    },
  },

  // ── Zufreeden ────────────────────────────────────────────────
  zufreeden: {
    city: "Zürich",
    cuisine: "Café / Bäckerei / Konditorei",
    features: ["100% glutenfrei", "Handwerksbäckerei", "Brunch", "Süßigkeiten"],
    restrictions: ["Glutenfrei"],
    safetyProcedures: [
      "Zutaten, Umgebung und Geräte für sichere Zöliakie-Zubereitung bestimmt",
    ],
    description: "Ein handwerkliches Café und Bäckerei mit einem 100% glutenfreien Betrieb.",
    dishes: {
      "zuf-d1": { name: "Buchweizenbrot" },
      "zuf-d2": { name: "Brezeln" },
      "zuf-d3": { name: "Sandwiches" },
      "zuf-d4": { name: "Quiches" },
      "zuf-d5": { name: "Brownies" },
      "zuf-d6": { name: "Cheesecake" },
      "zuf-d7": { name: "Bananenbrot" },
    },
  },

  // ── À VIE Baked Goods ────────────────────────────────────────
  "a-vie": {
    city: "Zürich",
    cuisine: "Konditorei / Bäckerei",
    features: ["100% glutenfrei", "Konditorei", "Premium", "Süßigkeiten"],
    restrictions: ["Glutenfrei"],
    safetyProcedures: [
      "Unternehmen aus echter Erfahrung mit Zöliakie entstanden",
      "Fokus auf Sicherheit und Raffinesse",
    ],
    description: "Eine handwerkliche Konditorei in Zürich mit glutenfreien Produkten, inspiriert von der französischen Patisserie.",
    dishes: {
      "avie-d1": { name: "Handwerkliche Brioches" },
      "avie-d2": { name: "Französische Tartes" },
      "avie-d3": { name: "Moderne Patisserie" },
      "avie-d4": { name: "Raffinierte Süßigkeiten" },
    },
  },

  // ── Jackie's ─────────────────────────────────────────────────
  jackies: {
    city: "Kemptthal",
    cuisine: "Bäckerei / Konditorei",
    features: ["100% glutenfrei", "Handwerksbäckerei", "Tiefkühlware", "Vegane Option"],
    restrictions: ["Glutenfrei"],
    safetyProcedures: [
      "Eigene Produktion mit hausgemachten Rezepten",
      "Fokus auf sicheren Konsum zu Hause oder unterwegs",
    ],
    description: "Eine handwerkliche Bäckerei mit vollständig glutenfreier Produktion und Produkten für den Alltag.",
    dishes: {
      "jck-d1": { name: "Handwerkliche glutenfreie Brote" },
      "jck-d2": { name: "Angepasste traditionelle Süßigkeiten" },
      "jck-d3": { name: "Tiefkühlprodukte" },
    },
  },

  // ── Granò ────────────────────────────────────────────────────
  grano: {
    city: "Zürich",
    cuisine: "Italienisches Restaurant / Pizzeria",
    features: ["100% glutenfrei", "Italienisch", "Pizza", "Laktosefreie Option"],
    restrictions: ["Glutenfrei"],
    safetyProcedures: [
      "Eigene Küche und exklusiver Ofen",
      "Betrieb ohne Risiko von Kreuzkontamination",
    ],
    description: "Ein italienisches Restaurant in Zürich mit einer 100% glutenfreien Küche.",
    dishes: {
      "grano-d1": { name: "Klassische italienische Pizzen" },
      "grano-d2": { name: "Wöchentliche Spezialpizzen" },
      "grano-d3": { name: "Italienische Desserts" },
      "grano-d4": { name: "Glutenfreie Biere" },
    },
  },
};

export const safetyLevelLabelsDe: Record<string, { label: string; description: string }> = {
  muito_seguro: { label: "Sehr sicher", description: "Küche ausschließlich für glutenfreie Zubereitung (laut Restaurant)" },
  seguro: { label: "Sicherer", description: "Strenges Anti-Kontaminationsprotokoll" },
  moderado: { label: "Vorsicht", description: "Glutenfreie Optionen verfügbar" },
  cuidado: { label: "Vorsicht geboten", description: "Risiko von Kreuzkontamination" },
  novo: { label: "Neu", description: "Kürzlich zur Community hinzugefügt" },
  verificado: { label: "Geprüft", description: "Von der Community geprüft" },
  certificado: { label: "Von Zöliakiebetroffenen sehr gut bewertet", description: "Von der Zöliakie-Community sehr gut bewertet" },
  recomendado: { label: "Empfohlen", description: "Sehr empfohlen" },
};

export const safetyLevelLabelsEn: Record<string, { label: string; description: string }> = {
  muito_seguro: { label: "Very safe", description: "Kitchen dedicated to gluten-free preparation (per the restaurant)" },
  seguro: { label: "Safer", description: "Strict anti-contamination protocol" },
  moderado: { label: "Caution", description: "Gluten-free options available" },
  cuidado: { label: "Careful", description: "Risk of cross-contamination" },
  novo: { label: "New", description: "Recently added to the community" },
  verificado: { label: "Verified", description: "Verified by the community" },
  certificado: { label: "Highly rated by celiacs", description: "Highly rated by the celiac community" },
  recomendado: { label: "Recommended", description: "Highly recommended" },
};
