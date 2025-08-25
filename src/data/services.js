// src/data/services.js
export const SERVICES = [
  {
    id: "viso-detox",
    title: "Trattamento Viso Detox",
    category: "viso",
    durationMin: 60,
    price: 60,
    images: ["/services/viso1.jpg"],
    short: "Pulizia profonda, detox e idratazione.",
    description: "Trattamento viso completo con detersione, esfoliazione, maschera specifica e massaggio.",
  },
  {
    id: "corpo-linfodrenante",
    title: "Massaggio Linfodrenante",
    category: "corpo",
    durationMin: 50,
    price: 55,
    images: ["/services/corpo1.jpg"],
    short: "Drenaggio e leggerezza per le gambe.",
    description: "Tecnica dolce per stimolare il sistema linfatico e ridurre i ristagni.",
  },
  {
    id: "sopracciglio-pmu",
    title: "Sopracciglia PMU",
    category: "tatuaggi",
    durationMin: 120,
    price: 250,
    images: ["/services/pmu1.jpg"],
    short: "Micro-pigmentazione sopracciglia.",
    description: "Definizione naturale con dermopigmentazione, consulenza forma/colore inclusa.",
  },
];

export const CATEGORIES = [
  { key: "all", label: "Tutti" },
  { key: "viso", label: "Viso" },
  { key: "corpo", label: "Corpo" },
  { key: "tatuaggi", label: "Tatuaggi" },
  { key: "makeup", label: "Makeup" },
];
