import type { Request, Response } from "express";
import { ImageService } from "./image.service";
import { INTERNAL_SERVER_ERROR, NOT_FOUND, OK } from "http-status-codes";

export class ImageController {
  constructor(private imageService: ImageService) {
    this.imageService = imageService;
  }

  list = async (_req: Request, res: Response) => {
    try {
      const data = await this.imageService.getImages();

      if (!data) {
        res.json({
          data: "No images found",
          statusCode: NOT_FOUND,
          statusMessage: "Not Found",
        });
      }

      res.json({ data, statusCode: OK, statusMessage: "OK" });
    } catch (error) {
      res.json({
        data: error,
        statusCode: INTERNAL_SERVER_ERROR,
        statusMessage: "Internal Server Error",
      });
    }
  };
}