export const CATEGORIES = {
  PLANTS: {
    id: 1,
    name: "식물",
    slug: "plant",
  },
  POTS: {
    id: 2,
    name: "화분",
    slug: "pot",
  },
} as const;

export type CategoryId = (typeof CATEGORIES)[keyof typeof CATEGORIES]["id"];
export type CategorySlug = (typeof CATEGORIES)[keyof typeof CATEGORIES]["slug"];
