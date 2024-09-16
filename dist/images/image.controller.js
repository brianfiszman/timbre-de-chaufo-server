"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageController = void 0;
const http_status_codes_1 = require("http-status-codes");
class ImageController {
    constructor(imageService) {
        this.imageService = imageService;
        this.list = (_req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.imageService.getImages();
                if (!data) {
                    res.json({
                        data: "No images found",
                        statusCode: http_status_codes_1.NOT_FOUND,
                        statusMessage: "Not Found",
                    });
                }
                res.json({ data, statusCode: http_status_codes_1.OK, statusMessage: "OK" });
            }
            catch (error) {
                console.log(error);
                res.json({
                    data: error,
                    statusCode: http_status_codes_1.INTERNAL_SERVER_ERROR,
                    statusMessage: "Internal Server Error",
                });
            }
        });
        this.imageService = imageService;
    }
}
exports.ImageController = ImageController;
//# sourceMappingURL=image.controller.js.map