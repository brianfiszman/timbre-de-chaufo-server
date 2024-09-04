import express, { Request, Response } from "express";
import { configDotenv } from "dotenv";
import { OK } from "http-status-codes";
import { createPostgreSQLConection } from "./database";
import { ImageController, ImageService } from "./images";

configDotenv({ path: ".env.local" }); // read .env.config

export default async function Handler() {
  const app = express();
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

  app.listen(port, () => {
    return console.log(`Server is listening on ${port}`);
  });
}
