import express, { NextFunction, Request, Response } from 'express';
import swaggerUi from "swagger-ui-express";
import "express-async-errors";

import createConnection from "@shared/infra/typeorm";
import "@shared/container";

import swaggerFile from "../../../swagger.json";

import { router } from './routes/index.routes';

import { AppError } from '@shared/errors/AppError';

createConnection('database_ignite');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if(err instanceof AppError){
        return response.status(err.statusCode).json({
            message: err.message
        });
    };

    return response.status(500).json({status: "error", message: `Internal server error - ${err.message}`});
});

export { app };