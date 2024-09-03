import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as services from "../services/characters.services";
import { prisma } from "../app";
import { CharacterData, FiltersData } from "../utils/types";

export const getAllCharacters = async (
  request: Request,
  response: Response
) => {
  try {
    const query = request.query;
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

    const result = await services.getAllCharacters(filters);

    response.status(StatusCodes.OK).send(result);
  } catch (error) {
    console.error(
      "An error has occurred while trying to get characters: ",
      error
    );
    response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: { message: "Internal Server Error", error } });
  } finally {
    prisma.$disconnect();
  }
};

export const getCharacterByID = async (
  request: Request,
  response: Response
) => {
  try {
    const { id } = request.params;
    const normalizedID = Number(id);
    if (isNaN(normalizedID)) {
      return response
        .status(StatusCodes.NOT_FOUND)
        .send({ error: { message: "Character with this id was not found" } });
    }

    const result = await services.getCharacterByID(normalizedID);
    if (!result) {
      return response
        .status(StatusCodes.NOT_FOUND)
        .send({ error: { message: "Character with this id was not found" } });
    }

    response.status(StatusCodes.OK).send(result);
  } catch (error) {
    console.error(
      "An error has occurred while trying to find character by id: ",
      error
    );
    response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: { message: "Internal Server Error", error } });
  } finally {
    prisma.$disconnect();
  }
};

export const addCharacter = async (request: Request, response: Response) => {
  try {
    const data = request.body as CharacterData;

    const result = await services.addCharacter(data);

    response
      .status(StatusCodes.CREATED)
      .header("Location", `/characters/${result.id}`)
      .send(result);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientValidationError) {
      return response.status(StatusCodes.BAD_REQUEST).send({
        error: {
          message: "Data validation failed. Please check your data.",
        },
      });
    }

    console.error(
      "An error has occurred while trying to create character: ",
      error
    );
    response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: { message: "Internal Server Error", error } });
  } finally {
    prisma.$disconnect();
  }
};

export const removeCharacterByID = async (
  request: Request,
  response: Response
) => {
  try {
    const { id } = request.params;
    const normalizedID = Number(id);
    if (isNaN(normalizedID)) {
      return response
        .status(StatusCodes.NOT_FOUND)
        .send({ error: { message: "Character with this id was not found" } });
    }

    await services.removeCharacterByID(normalizedID);

    response.status(StatusCodes.NO_CONTENT).send();
  } catch (error) {
    console.error(
      "An error has occurred while trying to delete character by id: ",
      error
    );
    response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: { message: "Internal Server Error", error } });
  } finally {
    prisma.$disconnect();
  }
};

export const updateCharacterByID = async (
  request: Request,
  response: Response
) => {
  try {
    const { id } = request.params;
    const data = request.body as Partial<CharacterData>;
    const normalizedID = Number(id);
    if (isNaN(normalizedID)) {
      return response
        .status(StatusCodes.NOT_FOUND)
        .send({ error: { message: "Character with this id was not found" } });
    }

    const result = await services.updateCharacterByID(normalizedID, data);

    response.status(StatusCodes.OK).send(result);
  } catch (error) {
    console.error(
      "An error has occurred while trying to update character by id: ",
      error
    );
    response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: { message: "Internal Server Error", error } });
  }
};
