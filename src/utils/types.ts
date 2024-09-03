import { Prisma } from "@prisma/client";

export type CharacterData = Prisma.CharacterCreateInput;

export type FiltersData = {
  [key: string]: Prisma.StringFilter | Prisma.StringNullableListFilter;
};
