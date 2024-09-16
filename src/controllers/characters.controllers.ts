import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as services from "../services/characters.services";
import { createFilters, ERROR, CharacterData } from "../utils";

export const getAllCharacters = async (
  request: Request,
  response: Response
) => {
  try {
    const query = request.query;
    const filters = createFilters(query);

    const result = await services.getAllCharacters(filters);

    response.status(StatusCodes.OK).send(result);
  } catch (error) {
    console.error(
      "An error has occurred while trying to get characters: ",
      error
    );
    response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: { message: "Internal Server Error" } });
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
      throw new Error(ERROR.NOT_FOUND);
    }

    const result = await services.getCharacterByID(normalizedID);

    response.status(StatusCodes.OK).send(result);
  } catch (error) {
    if (error instanceof Error && error.message === ERROR.NOT_FOUND) {
      return response
        .status(StatusCodes.NOT_FOUND)
        .send({ error: { message: ERROR.NOT_FOUND } });
    }

    console.error(
      "An error has occurred while trying to find character by id: ",
      error
    );
    response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: { message: "Internal Server Error" } });
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
    if (error instanceof Error && error.message === ERROR.INVALID_DATA) {
      return response.status(StatusCodes.BAD_REQUEST).send({
        error: {
          message: ERROR.INVALID_DATA,
        },
      });
    }

    console.error(
      "An error has occurred while trying to create character: ",
      error
    );
    response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: { message: "Internal Server Error" } });
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
      throw new Error(ERROR.NOT_FOUND);
    }

    await services.removeCharacterByID(normalizedID);

    response.status(StatusCodes.NO_CONTENT).send();
  } catch (error) {
    if (error instanceof Error && error.message === ERROR.NOT_FOUND) {
      return response
        .status(StatusCodes.NOT_FOUND)
        .send({ error: { message: ERROR.NOT_FOUND } });
    }

    console.error(
      "An error has occurred while trying to delete character by id: ",
      error
    );
    response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: { message: "Internal Server Error" } });
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
      throw new Error(ERROR.NOT_FOUND);
    }

    const result = await services.updateCharacterByID(normalizedID, data);

    response.status(StatusCodes.OK).send(result);
  } catch (error) {
    console.log(error);
    if (error instanceof Error && error.message === ERROR.NOT_FOUND) {
      return response
        .status(StatusCodes.NOT_FOUND)
        .send({ error: { message: ERROR.NOT_FOUND } });
    }

    console.error(
      "An error has occurred while trying to update character by id: ",
      error
    );
    response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: { message: "Internal Server Error" } });
  }
};
