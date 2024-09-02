import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

import { router } from "../src/routes/characters.routes";

dotenv.config();

export const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT} port.`);
});
