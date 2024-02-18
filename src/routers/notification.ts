import axios from "axios";
import express, { NextFunction, Response, Request } from "express";
import { errorToString } from "../utils/utilsfunctions";
const notificationRouter = express.Router();

notificationRouter.post(
  "/send",
  async (req: Request, res: Response, next: NextFunction) => {
    let response: response = {
      status: false,
      data: [],
      message: "Something went wrong try again!",
      function: "notficationsend",
    };

    const data: any = req.body;

    if (data.title === undefined) {
      response = {
        status: false,
        data: [],
        message: "title is required!",
        function: "notficationsend",
      };
    } else if (data.body === undefined) {
      response = {
        status: false,
        data: [],
        message: "body is required!",
        function: "notficationsend",
      };
    } else if (data.to === undefined) {
      response = {
        status: false,
        data: [],
        message: "to is required!",
        function: "notficationsend",
      };
    } else {
      try {
        const notificaiondata: any = await axios.post(
          `https://fcm.googleapis.com/fcm/send`,
          {
            notification: { title: data.title, body: data.body },
            to: data.to,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `key=${process.env.NOTIFICATION_KEY}`,
            },
          }
        );
        if (notificaiondata.failure > 0) {
          response.status = false;
          response.message =
            "Something went wrong unable to send notification.";
          response.function = "notficationsend";
          response.data = [];
        } else {
          response.status = true;
          response.message = "Sussfully get the user data";
          response.function = "notficationsend";
          response.data = notificaiondata.data;
        }
      } catch (e: unknown) {
        const err = errorToString(e);
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
  }
);

notificationRouter.post(
  "/sendimg",
  async (req: Request, res: Response, next: NextFunction) => {
    let response: response = {
      status: false,
      data: [],
      message: "Something went wrong try again!",
      function: "notficationsendimg",
    };

    const data: any = req.body;

    if (data.title === undefined) {
      response = {
        status: false,
        data: [],
        message: "title is required!",
        function: "notficationsendimg",
      };
    } else if (data.body === undefined) {
      response = {
        status: false,
        data: [],
        message: "body is required!",
        function: "notficationsendimg",
      };
    } else if (data.icon === undefined) {
      response = {
        status: false,
        data: [],
        message: "icon is required!",
        function: "notficationsendimg",
      };
    } else if (data.to === undefined) {
      response = {
        status: false,
        data: [],
        message: "to is required!",
        function: "notficationsendimg",
      };
    } else {
      try {
        const notificaiondata: any = await axios.post(
          `https://fcm.googleapis.com/fcm/send`,
          {
            notification: {
              title: data.title,
              body: data.body,
              icon: data.icon,
            },
            to: data.to,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `key=${process.env.NOTIFICATION_KEY}`,
            },
          }
        );
        if (notificaiondata.failure > 0) {
          response.status = false;
          response.message =
            "Something went wrong unable to send notification.";
          response.function = "notficationsendimg";
          response.data = [];
        } else {
          response.status = true;
          response.message = "Sussfully get the user data";
          response.function = "notficationsendimg";
          response.data = notificaiondata.data;
        }
      } catch (e: unknown) {
        const err = errorToString(e);
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
  }
);

export { notificationRouter };
