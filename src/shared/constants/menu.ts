import { CATEGORIES } from "./categories";

export const MENU_ITEMS = [
  { name: "홈", href: "/" },
  {
    name: CATEGORIES.PLANTS.name,
    href: `/product/category/${CATEGORIES.PLANTS.slug}`,
  },
  {
    name: CATEGORIES.POTS.name,
    href: `/product/category/${CATEGORIES.POTS.slug}`,
  },
];
