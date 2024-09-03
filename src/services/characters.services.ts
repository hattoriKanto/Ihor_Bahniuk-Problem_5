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
    console.error(`${ERROR.FETCH_MANY}: `, error);
    throw new Error(ERROR.FETCH_MANY);
  }
};

export const getCharacterByID = async (id: number) => {
  try {
    const result = await prisma.character.findUnique({
      where: {
        id,
      },
    });

    return result;
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      console.error(`${ERROR.NOT_FOUND}: `, error);
      throw new Error(ERROR.NOT_FOUND);
    }

    console.error(`${ERROR.FETCH_ONE}: `, error);
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
      console.error(`${ERROR.INVALID_DATA}: `, error);
      throw new Error(ERROR.INVALID_DATA);
    }

    console.error(`${ERROR.ADD}: `, error);
    throw new Error(ERROR.ADD);
  }
};

export const removeCharacterByID = async (id: number) => {
  try {
    await prisma.character.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      console.error(`${ERROR.NOT_FOUND}: `, error);
      throw new Error(ERROR.NOT_FOUND);
    }

    console.error(`${ERROR.DELETE}: `, error);
    throw new Error(ERROR.DELETE);
  }
};

export const updateCharacterByID = async (
  id: number,
  data: Partial<CharacterData>
) => {
  try {
    const result = await prisma.character.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });

    return result;
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      console.error(`${ERROR.NOT_FOUND}: `, error);
      throw new Error(ERROR.NOT_FOUND);
    }

    console.error(`${ERROR.UPDATE}: `, error);
    throw new Error(ERROR.UPDATE);
  }
};
