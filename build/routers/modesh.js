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
exports.modeshRouter = void 0;
const axios_1 = __importDefault(require("axios"));
const express_1 = __importDefault(require("express"));
const utilsfunctions_1 = require("../utils/utilsfunctions");
const modeshRouter = express_1.default.Router();
exports.modeshRouter = modeshRouter;
modeshRouter.post("/:username", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let response = {
        status: false,
        data: [],
        message: "Something went wrong try again!",
        function: "ModeshHome",
    };
    const username = req.params.username;
    try {
        const modashdata = yield axios_1.default.get(`https://api.modash.io/v1/instagram/profile/${username}/report?access_token=${process.env.ACCESS_TOKEN}`);
        if (modashdata.data.error) {
            response.status = false;
            response.message = "UserName is not found";
            response.function = "GetModeshData";
            response.data = [];
            res.send(response);
            res.end();
        }
        response.status = true;
        response.message = "Sussfully get the user data";
        response.function = "GetModeshData";
        response.data = modashdata.data;
        res.send(response);
        res.end();
    }
    catch (e) {
        const err = (0, utilsfunctions_1.errorToString)(e);
        response = {
            status: false,
            data: [],
            message: err,
            function: "ModeshHome",
        };
        res.send(response);
        res.end();
    }
}));
