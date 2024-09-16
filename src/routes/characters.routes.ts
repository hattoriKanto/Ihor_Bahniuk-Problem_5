import express from "express";
import * as controllers from "../controllers/characters.controllers";

export const router = express.Router();

router.get("/", controllers.getAPIDocs);
router.get("/characters", controllers.getAllCharacters);
router.get("/characters/:id", controllers.getCharacterByID);
router.post("/characters", controllers.addCharacter);
router.delete("/characters/:id", controllers.removeCharacterByID);
router.put("/characters/:id", controllers.updateCharacterByID);
