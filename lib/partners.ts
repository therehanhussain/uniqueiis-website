export interface PartnerOrg {
  id: string;
  name: string;
  shortName: string;
  category: "EPC & Contracting" | "Energy & Petrochemical" | "Infrastructure & Power" | "Industrial & Supply Chain" | "Specialized Fabrication";
  logo: string;
  aspectHint?: "wide" | "square" | "standard";
}

export const PARTNER_ORGANIZATIONS: PartnerOrg[] = [
  {
    id: "lamprell",
    name: "Lamprell",
    shortName: "Lamprell",
    category: "EPC & Contracting",
    logo: "/images/partners/partner_01.png",
    aspectHint: "standard"
  },
  {
    id: "nesma",
    name: "Nesma Co.",
    shortName: "NESMA",
    category: "EPC & Contracting",
    logo: "/images/partners/partner_02.png",
    aspectHint: "standard"
  },
  {
    id: "kalpataru",
    name: "Kalpa-Taru Power Transmission Limited",
    shortName: "Kalpataru",
    category: "Infrastructure & Power",
    logo: "/images/partners/partner_03.png",
    aspectHint: "wide"
  },
  {
    id: "mapa",
    name: "Mapa Insaat Ve Ticaret A.Ş.",
    shortName: "MAPA",
    category: "EPC & Contracting",
    logo: "/images/partners/partner_04.png",
    aspectHint: "standard"
  },
  {
    id: "nbtc",
    name: "NBTC Group",
    shortName: "NBTC",
    category: "Specialized Fabrication",
    logo: "/images/partners/partner_05.jpeg",
    aspectHint: "wide"
  },
  {
    id: "bin-quraya",
    name: "Bin Quraya",
    shortName: "Bin Quraya",
    category: "Energy & Petrochemical",
    logo: "/images/partners/partner_06.png",
    aspectHint: "standard"
  },
  {
    id: "enppi",
    name: "Enppi",
    shortName: "ENPPI",
    category: "Energy & Petrochemical",
    logo: "/images/partners/partner_07.png",
    aspectHint: "wide"
  },
  {
    id: "ali-al-nassar",
    name: "Ali Al-Nassar & Partners Co.",
    shortName: "Ali Al-Nassar",
    category: "Industrial & Supply Chain",
    logo: "/images/partners/partner_08.png",
    aspectHint: "standard"
  },
  {
    id: "gas-arabian",
    name: "GAS Arabian Services",
    shortName: "GAS Arabian",
    category: "Energy & Petrochemical",
    logo: "/images/partners/partner_09.jpeg",
    aspectHint: "square"
  },
  {
    id: "sisco",
    name: "SISCO (Specialized Industrial Services Co.)",
    shortName: "SISCO",
    category: "Industrial & Supply Chain",
    logo: "/images/partners/partner_10.png",
    aspectHint: "standard"
  },
  {
    id: "tecnimont",
    name: "Tecnimont",
    shortName: "Tecnimont",
    category: "EPC & Contracting",
    logo: "/images/partners/partner_11.jpeg",
    aspectHint: "square"
  },
  {
    id: "sicim",
    name: "SICIM S.p.A.",
    shortName: "SICIM",
    category: "Energy & Petrochemical",
    logo: "/images/partners/partner_12.png",
    aspectHint: "standard"
  },
  {
    id: "hyundai",
    name: "Hyundai Engineering & Construction",
    shortName: "Hyundai E&C",
    category: "EPC & Contracting",
    logo: "/images/partners/partner_13.jpeg",
    aspectHint: "square"
  },
  {
    id: "masco",
    name: "MASCO",
    shortName: "MASCO",
    category: "EPC & Contracting",
    logo: "/images/partners/partner_14.png",
    aspectHint: "standard"
  },
  {
    id: "technip",
    name: "Technip Energies",
    shortName: "Technip Energies",
    category: "Energy & Petrochemical",
    logo: "/images/partners/partner_15.jpeg",
    aspectHint: "standard"
  },
  {
    id: "samsung",
    name: "Samsung E&A",
    shortName: "Samsung E&A",
    category: "EPC & Contracting",
    logo: "/images/partners/partner_16.jpeg",
    aspectHint: "square"
  },
  {
    id: "shaw-group",
    name: "The Shaw Group",
    shortName: "Shaw Group",
    category: "Specialized Fabrication",
    logo: "/images/partners/partner_17.jpeg",
    aspectHint: "square"
  },
  {
    id: "denys-arabia",
    name: "Denys Arabia",
    shortName: "Denys Arabia",
    category: "Infrastructure & Power",
    logo: "/images/partners/partner_18.png",
    aspectHint: "standard"
  },
  {
    id: "nasser-al-hajri",
    name: "Nasser S. Al-Hajri Corp.",
    shortName: "NSH Corp",
    category: "EPC & Contracting",
    logo: "/images/partners/partner_19.jpeg",
    aspectHint: "square"
  },
  {
    id: "sepco",
    name: "SEPCO",
    shortName: "SEPCO",
    category: "Infrastructure & Power",
    logo: "/images/partners/partner_20.jpeg",
    aspectHint: "wide"
  },
  {
    id: "subsea-7",
    name: "Subsea 7",
    shortName: "Subsea 7",
    category: "Energy & Petrochemical",
    logo: "/images/partners/partner_21.png",
    aspectHint: "wide"
  },
  {
    id: "jgc",
    name: "JGC Gulf International Co. Ltd.",
    shortName: "JGC Gulf",
    category: "EPC & Contracting",
    logo: "/images/partners/partner_22.png",
    aspectHint: "square"
  },
  {
    id: "tecnicas-reunidas",
    name: "Técnicas Reunidas",
    shortName: "Técnicas Reunidas",
    category: "EPC & Contracting",
    logo: "/images/partners/partner_23.png",
    aspectHint: "standard"
  },
  {
    id: "larsen-toubro",
    name: "Larsen & Toubro",
    shortName: "L&T",
    category: "EPC & Contracting",
    logo: "/images/partners/partner_24.jpeg",
    aspectHint: "standard"
  },
  {
    id: "saipem",
    name: "Saipem",
    shortName: "Saipem",
    category: "Energy & Petrochemical",
    logo: "/images/partners/partner_25.jpeg",
    aspectHint: "standard"
  },
  {
    id: "cbi",
    name: "CB&I",
    shortName: "CB&I",
    category: "Specialized Fabrication",
    logo: "/images/partners/partner_26.png",
    aspectHint: "standard"
  },
  {
    id: "alkafaa",
    name: "Alkafaa Limited Company / KLC",
    shortName: "KLC",
    category: "Industrial & Supply Chain",
    logo: "/images/partners/partner_27.png",
    aspectHint: "square"
  },
  {
    id: "cat-group",
    name: "C.A.T. International Co. Limited",
    shortName: "C.A.T. Group",
    category: "EPC & Contracting",
    logo: "/images/partners/partner_28.png",
    aspectHint: "standard"
  },
  {
    id: "wison",
    name: "Wison",
    shortName: "Wison",
    category: "Energy & Petrochemical",
    logo: "/images/partners/partner_29.jpeg",
    aspectHint: "standard"
  },
  {
    id: "oilfields-supply",
    name: "Oilfields Supply Company Saudi",
    shortName: "OSC Saudi",
    category: "Industrial & Supply Chain",
    logo: "/images/partners/partner_30.png",
    aspectHint: "square"
  },
  {
    id: "sinopec",
    name: "Sinopec",
    shortName: "Sinopec",
    category: "Energy & Petrochemical",
    logo: "/images/partners/partner_31.png",
    aspectHint: "wide"
  }
];
