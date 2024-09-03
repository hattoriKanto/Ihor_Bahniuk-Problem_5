import { CharacterData, FiltersData } from "../utils/types";
import { prisma } from "../app";

export const getAllCharacters = async (filters: FiltersData) => {
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
