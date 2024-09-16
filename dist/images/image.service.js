"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageService = void 0;
const image_model_1 = require("./image.model");
class ImageService {
    constructor(dataSource) {
        this.getImages = () => this.dataSource.getRepository(image_model_1.Images).find();
        this.dataSource = dataSource;
    }
}
exports.ImageService = ImageService;
//# sourceMappingURL=image.service.js.map