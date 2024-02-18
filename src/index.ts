import express, { Request, Response } from "express";
import { modeshRouter } from "./routers/modesh";
import helmet from "helmet";
import cors from "cors";
import { notificationRouter } from "./routers/notification";
require("dotenv").config();

const PORT = process.env.PORT || 8080;

const app = express();
//middlewhare
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use(helmet());

//routers
app.use("/notification", notificationRouter);
app.use(modeshRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("swrv application");
  res.end();
});

app.use((req, res, next) => {
  res.status(404).send({
    status: false,
    data: [],
    message: "End point is not defined",
    function: "Error",
  });
});

//routes

app.listen(PORT, () => {
  console.log(`Modash app listening on port ${PORT}`);
});
