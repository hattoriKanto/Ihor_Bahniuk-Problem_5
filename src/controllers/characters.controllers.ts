import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as services from "../services/characters.services";
import { createFilters, ERROR, CharacterData } from "../utils";

export const getAPIDocs = async (request: Request, response: Response) => {
  try {
    const result = await services.getAPIDocs();

    response.status(StatusCodes.OK).send(result);
  } catch (error) {
    response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: { message: "Internal Server Error" } });
  }
};

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
    const result = await services.getCharacterByID(id);

    response.status(StatusCodes.OK).send(result);
  } catch (error) {
    if (error instanceof Error && error.message === ERROR.NOT_FOUND) {
      return response
        .status(StatusCodes.NOT_FOUND)
        .send({ error: { message: ERROR.NOT_FOUND } });
    }

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
    await services.removeCharacterByID(id);

    response.status(StatusCodes.NO_CONTENT).send();
  } catch (error) {
    if (error instanceof Error && error.message === ERROR.NOT_FOUND) {
      return response
        .status(StatusCodes.NOT_FOUND)
        .send({ error: { message: ERROR.NOT_FOUND } });
    }

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

    const result = await services.updateCharacterByID(id, data);

    response.status(StatusCodes.OK).send(result);
  } catch (error) {
    if (error instanceof Error && error.message === ERROR.NOT_FOUND) {
      return response
        .status(StatusCodes.NOT_FOUND)
        .send({ error: { message: ERROR.NOT_FOUND } });
    }

    if (error instanceof Error && error.message === ERROR.INVALID_DATA) {
      return response.status(StatusCodes.BAD_REQUEST).send({
        error: {
          message: ERROR.INVALID_DATA,
        },
      });
    }

    response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: { message: "Internal Server Error" } });
  }
};
