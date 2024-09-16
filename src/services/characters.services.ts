import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import { CharacterData, FiltersData } from "../utils/types";
import { prisma } from "../app";
import { ERROR } from "../utils/errors";

export const getAllCharacters = async (filters: FiltersData) => {
  try {
    const result = await prisma.character.findMany({
      where: filters,
    });

    return result;
  } catch (error) {
    console.error(`An error has occurred: `);
    console.log(error);
    throw new Error(ERROR.FETCH_MANY);
  }
};

export const getCharacterByID = async (id: string) => {
  try {
    const normalizedID = Number(id);

    if (isNaN(normalizedID)) {
      throw new Error(ERROR.NOT_FOUND);
    }

    const result = await prisma.character.findUnique({
      where: {
        id: normalizedID,
      },
    });

    if (!result) {
      throw new Error(ERROR.NOT_FOUND);
    }

    return result;
  } catch (error) {
    if (error instanceof Error && error.message === ERROR.NOT_FOUND) {
      console.error(`An error has occurred: `);
      console.log(error);
      throw new Error(ERROR.NOT_FOUND);
    }

    console.error(`An error has occurred: `);
    console.log(error);
    throw new Error(ERROR.FETCH_ONE);
  }
};

export const addCharacter = async (characterData: CharacterData) => {
  try {
    const result = await prisma.character.create({
      data: characterData,
    });

    return result;
  } catch (error) {
    if (error instanceof PrismaClientValidationError) {
      console.error(`An error has occurred: `);
      console.log(error);
      throw new Error(ERROR.INVALID_DATA);
    }

    console.error(`An error has occurred: `);
    console.log(error);
    throw new Error(ERROR.ADD);
  }
};

export const removeCharacterByID = async (id: string) => {
  try {
    const normalizedID = Number(id);

    if (isNaN(normalizedID)) {
      throw new Error(ERROR.NOT_FOUND);
    }

    await prisma.character.delete({
      where: {
        id: normalizedID,
      },
    });
  } catch (error) {
    if (
      (error instanceof Error && error.message === ERROR.NOT_FOUND) ||
      (error instanceof PrismaClientKnownRequestError && error.code === "P2025")
    ) {
      console.error(`An error has occurred: `);
      console.log(error);
      throw new Error(ERROR.NOT_FOUND);
    }

    console.error(`An error has occurred: `);
    console.log(error);
    throw new Error(ERROR.DELETE);
  }
};

export const updateCharacterByID = async (
  id: string,
  data: Partial<CharacterData>
) => {
  try {
    const normalizedID = Number(id);

    if (isNaN(normalizedID)) {
      throw new Error(ERROR.NOT_FOUND);
    }

    const result = await prisma.character.update({
      where: {
        id: normalizedID,
      },
      data: {
        ...data,
      },
    });

    return result;
  } catch (error) {
    if (
      (error instanceof Error && error.message === ERROR.NOT_FOUND) ||
      (error instanceof PrismaClientKnownRequestError && error.code === "P2025")
    ) {
      console.error(`An error has occurred: `);
      console.log(error);
      throw new Error(ERROR.NOT_FOUND);
    }

    if (error instanceof PrismaClientValidationError) {
      console.error(`An error has occurred: `);
      console.log(error);
      throw new Error(ERROR.INVALID_DATA);
    }

    console.error(`An error has occurred: `);
    console.log(error);
    throw new Error(ERROR.UPDATE);
  }
};
