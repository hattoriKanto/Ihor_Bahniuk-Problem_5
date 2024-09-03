import { CharacterData } from "../utils/types";
import { prisma } from "../app";
import QueryString from "qs";

export const getAllCharacters = async (filters: QueryString.ParsedQs) => {
  const result = await prisma.character.findMany({
    where: filters,
  });

  return result;
};

export const getCharacterByID = async (id: number) => {
  const result = await prisma.character.findUnique({
    where: {
      id,
    },
  });

  return result;
};

export const addCharacter = async (characterData: CharacterData) => {
  const result = await prisma.character.create({
    data: characterData,
  });

  return result;
};

export const removeCharacterByID = async (id: number) => {
  await prisma.character.delete({
    where: {
      id,
    },
  });
};
