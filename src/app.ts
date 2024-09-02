import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import dotenv from "dotenv";
import { router } from "./routes/characters.routes";

dotenv.config();

export const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT} port.`);
});
