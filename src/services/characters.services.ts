import { prisma } from "../app";

export const getAllCharacters = async () => {
  const result = await prisma.character.findMany();

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

export const removeCharacterByID = async (id: number) => {
  await prisma.character.delete({
    where: {
      id,
    },
  });
};
