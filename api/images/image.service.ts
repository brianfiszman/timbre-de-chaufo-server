import { DataSource } from "typeorm";
import { Images } from "./image.model";

export class ImageService {
  private dataSource: DataSource;

  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
  }

  getImages = () => this.dataSource.getRepository(Images).find();
}
