import { CATEGORIES } from "./categories";

export const MENU_ITEMS = [
  { name: "홈", href: "/" },
  {
    name: CATEGORIES.POTS.name,
    href: `/product/category/${CATEGORIES.POTS.slug}`,
  },
  {
    name: CATEGORIES.CERAMIC.name,
    href: `/product/category/${CATEGORIES.CERAMIC.slug}`,
  },
];
