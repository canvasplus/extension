export const toMs = (quantity: number, unit: "m" | "H" | "D"): number => {
  switch (unit) {
    case "m":
      return quantity * 60_000;
    case "H":
      return quantity * 60_000 * 60;
    case "D":
      return quantity * 60_000 * 60 * 24;
  }
};
