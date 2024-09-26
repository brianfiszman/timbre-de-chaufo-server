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
const database_1 = require("../database");
const image_controller_1 = require("./image.controller");
const image_service_1 = require("./image.service");
const http_status_codes_1 = require("http-status-codes");
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dataSource = yield (0, database_1.createPostgreSQLConection)();
    if (!dataSource) {
        return res.status(http_status_codes_1.INTERNAL_SERVER_ERROR).send("Connection failed.");
    }
    const imageService = new image_service_1.ImageService(dataSource);
    const imageController = new image_controller_1.ImageController(imageService);
    if (req.method === "GET")
        return imageController.list(req, res);
    return res
        .status(http_status_codes_1.NOT_FOUND)
        .json({ message: "Not Found", statusCode: http_status_codes_1.NOT_FOUND, data: null });
});
//# sourceMappingURL=index.js.map