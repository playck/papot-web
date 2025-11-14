export const CATEGORIES = {
  POTS: {
    id: 1,
    name: "화분",
    slug: "pot",
  },
  PLATE: {
    id: 2,
    name: "도자기 / 그릇",
    slug: "plate",
  },
} as const;

export type CategoryId = (typeof CATEGORIES)[keyof typeof CATEGORIES]["id"];
export type CategorySlug = (typeof CATEGORIES)[keyof typeof CATEGORIES]["slug"];
