import { VercelRequest, VercelResponse } from "@vercel/node";
import { createPostgreSQLConection } from "../database";
import { ImageController } from "./image.controller";
import { ImageService } from "./image.service";
import { INTERNAL_SERVER_ERROR, NOT_FOUND } from "http-status-codes";

export default async (req: VercelRequest, res: VercelResponse) => {
  const dataSource = await createPostgreSQLConection();
  if (!dataSource) {
    return res.status(INTERNAL_SERVER_ERROR).send("Connection failed.");
  }
  const imageService = new ImageService(dataSource);
  const imageController = new ImageController(imageService);

  if (req.method === "GET") return imageController.list(req, res);

  return res
    .status(NOT_FOUND)
    .json({ message: "Not Found", statusCode: NOT_FOUND, data: null });
};
