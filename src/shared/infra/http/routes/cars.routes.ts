import { Router } from "express";
import multer from "multer";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { UploadCarImagesController } from "@modules/cars/useCases/UploadCarImage/UploadCarImageController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

import uploadConfig from "@config/upload";

const carsRoutes = Router();

const upload = multer(uploadConfig.upload("./tmp/cars"));

let createCarController = new CreateCarController();
let listAvailableCarsController = new ListAvailableCarsController();
let createCarsSpecificationsController = new CreateCarSpecificationController();
let uploadCarImagesController = new UploadCarImagesController();

carsRoutes.post('/', ensureAuthenticated, ensureAdmin, createCarController.handle);

carsRoutes.get('/available', listAvailableCarsController.handle);

carsRoutes.post('/specifications/:id', ensureAuthenticated, ensureAdmin, createCarsSpecificationsController.handle);

carsRoutes.post('/images', ensureAuthenticated, ensureAdmin, upload.array("images"), uploadCarImagesController.handle);

export { carsRoutes };