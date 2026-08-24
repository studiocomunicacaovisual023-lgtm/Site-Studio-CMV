import { company } from "../config/company";

export const buildWhatsAppUrl = (message: string) =>
  `https://wa.me/${company.whatsapp.number}?text=${encodeURIComponent(message)}`;
