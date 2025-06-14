import "dotenv/config";
import express, {
  Request,
  Response,
  json,
  NextFunction,
  urlencoded,
} from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import { RegisterRoutes } from "../.build/routes.js";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../.build/swagger.json" with { type: "json" };
import { customErrorHandler } from "./middlewares/customErrorHandler.js";
import { ErrorRequestHandler } from "express";

const app = express();

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

RegisterRoutes(app);

app.use(customErrorHandler as ErrorRequestHandler);

app.use((req, res, next) => {
  console.log("404 - Rota não encontrada");
  res.status(404).json({ message: "Rota não encontrada" });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || "Erro interno no servidor" });
});

export default app;