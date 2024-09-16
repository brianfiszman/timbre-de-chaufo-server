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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const http_status_codes_1 = require("http-status-codes");
const database_1 = require("./database");
const images_1 = require("./images");
(0, dotenv_1.configDotenv)({ path: ".env.local" }); // read .env.config
const app = (0, express_1.default)();
function Handler() {
    return __awaiter(this, void 0, void 0, function* () {
        const port = process.env.PORT || 443;
        const dataSource = yield (0, database_1.createPostgreSQLConection)();
        const imageService = new images_1.ImageService(dataSource);
        const imageController = new images_1.ImageController(imageService);
        app.get("/", (_req, res) => __awaiter(this, void 0, void 0, function* () {
            return res.json({
                data: null,
                statusCode: http_status_codes_1.OK,
                statusMessage: "OK",
            });
        }));
        app.get("/images", imageController.list);
        app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
    });
}
Handler();
exports.default = app;
//# sourceMappingURL=app.js.map