import { FiltersData } from "./types";

export const createFilters = (query: any) => {
  const filters: FiltersData = {};

  if (Object.keys(query).length > 0) {
    Object.entries(query).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        filters[key] = {
          in: value as string[],
          mode: "insensitive",
        };
      } else {
        filters[key] = {
          equals: value as string,
          mode: "insensitive",
        };
      }
    });
  }

  return filters;
};
