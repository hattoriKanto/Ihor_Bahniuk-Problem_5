import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as services from "../services/characters.services";
import { prisma } from "../app";

export const getAllCharacters = async (
  request: Request,
  response: Response
) => {
  try {
    const result = await services.getAllCharacters();

    response.status(StatusCodes.OK).send(result);
  } catch (error) {
    console.error(
      "An error has occurred while trying to get characters: ",
      error
    );
    response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: { message: "Internal Server Error" } });
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
      .send({ error: { message: "Internal Server Error" } });
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

    response.status(StatusCodes.NO_CONTENT);
  } catch (error) {
    console.error(
      "An error has occurred while trying to delete character by id: ",
      error
    );
    response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: { message: "Internal Server Error" } });
  } finally {
    prisma.$disconnect();
  }
};
