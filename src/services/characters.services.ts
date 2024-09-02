import { prisma } from "../../api";

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
