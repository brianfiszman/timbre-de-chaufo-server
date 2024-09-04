import express, { Request, Response } from "express";
import { configDotenv } from "dotenv";
import { OK } from "http-status-codes";
import { createPostgreSQLConection } from "./database";
import { ImageController, ImageService } from "./images";

configDotenv({ path: ".env.local" }); // read .env.config

const app = express();

async function Handler() {
  const port = process.env.PORT || 443;

  const dataSource = await createPostgreSQLConection();
  const imageService = new ImageService(dataSource);
  const imageController = new ImageController(imageService);

  app.get("/", async (_req: Request, res: Response) => {
    return res.json({
      data: null,
      statusCode: OK,
      statusMessage: "OK",
    });
  });

  app.get("/images", imageController.list);
}

Handler();
export default app;
