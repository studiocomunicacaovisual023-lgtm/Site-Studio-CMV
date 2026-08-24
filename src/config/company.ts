export const company = {
  name: "Studio Comunicação Visual",
  shortName: "Studio",
  foundingYear: 2012,
  phoneDisplay: "(86) 98883-8917",
  phoneHref: "+5586988838917",
  email: "studiocmv@hotmail.com",
  instagramUrl: "https://www.instagram.com/studio_comunicacao_visual/",
  instagramHandle: "@studio_comunicacao_visual",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Av.%20Prof.%20Valter%20Alencar%2C%201415%2C%20Monte%20Castelo%2C%20Teresina%20-%20PI",
  address: {
    street: "Av. Prof. Valter Alencar, 1415",
    district: "Monte Castelo",
    city: "Teresina",
    region: "PI",
    postalCode: "64019-625",
    country: "BR",
  },
  whatsapp: {
    number: "5586988838917",
    message:
      "Olá! Vi o site da Studio e gostaria de solicitar um orçamento.",
  },
} as const;

export const whatsappUrl = `https://wa.me/${company.whatsapp.number}?text=${encodeURIComponent(company.whatsapp.message)}`;
