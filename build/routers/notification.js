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
exports.notificationRouter = void 0;
const axios_1 = __importDefault(require("axios"));
const express_1 = __importDefault(require("express"));
const utilsfunctions_1 = require("../utils/utilsfunctions");
const notificationRouter = express_1.default.Router();
exports.notificationRouter = notificationRouter;
notificationRouter.post("/send", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let response = {
        status: false,
        data: [],
        message: "Something went wrong try again!",
        function: "notficationsend",
    };
    const data = req.body;
    if (data.title === undefined) {
        response = {
            status: false,
            data: [],
            message: "title is required!",
            function: "notficationsend",
        };
    }
    else if (data.body === undefined) {
        response = {
            status: false,
            data: [],
            message: "body is required!",
            function: "notficationsend",
        };
    }
    else if (data.to === undefined) {
        response = {
            status: false,
            data: [],
            message: "to is required!",
            function: "notficationsend",
        };
    }
    else {
        try {
            const notificaiondata = yield axios_1.default.post(`https://fcm.googleapis.com/fcm/send`, {
                notification: { title: data.title, body: data.body },
                to: data.to,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `key=${process.env.NOTIFICATION_KEY}`,
                },
            });
            if (notificaiondata.failure > 0) {
                response.status = false;
                response.message =
                    "Something went wrong unable to send notification.";
                response.function = "notficationsend";
                response.data = [];
            }
            else {
                response.status = true;
                response.message = "Sussfully get the user data";
                response.function = "notficationsend";
                response.data = notificaiondata.data;
            }
        }
        catch (e) {
            const err = (0, utilsfunctions_1.errorToString)(e);
            response = {
                status: false,
                data: [],
                message: err,
                function: "notficationsend",
            };
        }
    }
    res.send(response);
    res.end();
}));
notificationRouter.post("/sendimg", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let response = {
        status: false,
        data: [],
        message: "Something went wrong try again!",
        function: "notficationsendimg",
    };
    const data = req.body;
    if (data.title === undefined) {
        response = {
            status: false,
            data: [],
            message: "title is required!",
            function: "notficationsendimg",
        };
    }
    else if (data.body === undefined) {
        response = {
            status: false,
            data: [],
            message: "body is required!",
            function: "notficationsendimg",
        };
    }
    else if (data.icon === undefined) {
        response = {
            status: false,
            data: [],
            message: "icon is required!",
            function: "notficationsendimg",
        };
    }
    else if (data.to === undefined) {
        response = {
            status: false,
            data: [],
            message: "to is required!",
            function: "notficationsendimg",
        };
    }
    else {
        try {
            const notificaiondata = yield axios_1.default.post(`https://fcm.googleapis.com/fcm/send`, {
                notification: {
                    title: data.title,
                    body: data.body,
                    icon: data.icon,
                },
                to: data.to,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `key=${process.env.NOTIFICATION_KEY}`,
                },
            });
            if (notificaiondata.failure > 0) {
                response.status = false;
                response.message =
                    "Something went wrong unable to send notification.";
                response.function = "notficationsendimg";
                response.data = [];
            }
            else {
                response.status = true;
                response.message = "Sussfully get the user data";
                response.function = "notficationsendimg";
                response.data = notificaiondata.data;
            }
        }
        catch (e) {
            const err = (0, utilsfunctions_1.errorToString)(e);
            response = {
                status: false,
                data: [],
                message: err,
                function: "notficationsendimg",
            };
        }
    }
    res.send(response);
    res.end();
}));
