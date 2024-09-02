import express from "express";

const router = express.Router();

router.get("/");
router.get("/characters");
router.get("/characters/:id");
router.post("/characters");
router.delete("/characters/:id");
router.put("/characters/:id");
