export const orders = ["asc", "desc"] as const;
export type Order = (typeof orders)[number];
export const orderFromStr = (str: string): Order | undefined => {
  switch (str) {
    case "asc":
      return "asc";
    case "desc":
      return "desc";
    default:
      return undefined;
  }
};
