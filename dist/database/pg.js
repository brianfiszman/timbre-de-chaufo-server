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
exports.createPostgreSQLConection = void 0;
const typeorm_1 = require("typeorm");
const images_1 = require("../images");
const createPostgreSQLConection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const AppDataSource = new typeorm_1.DataSource({
            type: "postgres",
            host: process.env.POSTGRES_HOST,
            port: 5432,
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DATABASE,
            synchronize: false,
            logging: true,
            ssl: { rejectUnauthorized: false },
            entities: [images_1.Images],
            subscribers: [],
            migrations: [],
        });
        yield AppDataSource.initialize();
        console.log("Connection has been established successfully.");
        return AppDataSource;
    }
    catch (error) {
        console.error("PostgreSQL connection error: ", error);
    }
});
exports.createPostgreSQLConection = createPostgreSQLConection;
//# sourceMappingURL=pg.js.map