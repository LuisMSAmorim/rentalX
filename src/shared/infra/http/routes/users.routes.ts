import { Router } from "express";
import multer from "multer";

import upload from "@config/upload";

import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

const uploadAvatar = multer(upload.upload("./tmp/avatar"));

usersRoutes.patch('/avatar', ensureAuthenticated, uploadAvatar.single("avatar"), updateUserAvatarController.handle);

usersRoutes.post('/', createUserController.handle);

export { usersRoutes };