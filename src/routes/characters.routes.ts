import express from "express";
import * as controllers from "../controllers/characters.controllers";

export const router = express.Router();

router.get("/");
router.get("/characters", controllers.getAllCharacters);
router.get("/characters/:id", controllers.getCharacterByID);
router.post("/characters");
router.delete("/characters/:id");
router.put("/characters/:id");
