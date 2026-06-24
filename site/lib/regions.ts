export type RegionCode = "BR" | "US" | "CH";

export interface RegionConfig {
  code: RegionCode;
  currencySymbol: string;
  pricePeriod: string;
  whatsappDisplay: string;
  whatsappDial: string;
}

export const regions: RegionConfig[] = [
  {
    code: "BR",
    currencySymbol: "R$",
    pricePeriod: "/mês",
    whatsappDisplay: "+55 00 00000-0000",
    whatsappDial: "5500000000000",
  },
  {
    code: "US",
    currencySymbol: "US$",
    pricePeriod: "/mo",
    whatsappDisplay: "+1 000-000-0000",
    whatsappDial: "10000000000",
  },
  {
    code: "CH",
    currencySymbol: "CHF",
    pricePeriod: "/mo",
    whatsappDisplay: "+41 00 000 00 00",
    whatsappDial: "410000000000",
  },
];

export const defaultRegion: RegionCode = "BR";
