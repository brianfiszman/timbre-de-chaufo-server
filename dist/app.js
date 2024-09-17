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
const http_status_codes_1 = require("http-status-codes");
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.method === "GET")
        return res.status(http_status_codes_1.OK).send({ message: "OK", statusCode: http_status_codes_1.OK, data: null });
    return res
        .status(http_status_codes_1.NOT_FOUND)
        .json({ message: "Not Found", statusCode: http_status_codes_1.NOT_FOUND, data: null });
});
//# sourceMappingURL=app.js.map