import axios from "axios";
import express, { NextFunction, Response, Request } from "express";
import { errorToString } from "../utils/utilsfunctions";
const modeshRouter = express.Router();

modeshRouter.post(
  "/:username",
  async (req: Request, res: Response, next: NextFunction) => {
    let response: response = {
      status: false,
      data: [],
      message: "Something went wrong try again!",
      function: "ModeshHome",
    };

    const username = req.params.username;

    try {
      const modashdata: any = await axios.get(
        `https://api.modash.io/v1/instagram/profile/${username}/report?access_token=${process.env.ACCESS_TOKEN}`
      );
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
    } catch (e: unknown) {
      const err = errorToString(e);
      response = {
        status: false,
        data: [],
        message: err,
        function: "ModeshHome",
      };
      res.send(response);
      res.end();
    }
  }
);

export { modeshRouter };
