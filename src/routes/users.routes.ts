import { Router } from "express";
import multer from "multer";

import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import upload from "../config/upload";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

const uploadAvatar = multer(upload.upload("./tmp/avatart"));

usersRoutes.patch('/avatar', uploadAvatar.single("avatar"), updateUserAvatarController.handle);
usersRoutes.post('/', createUserController.handle);

export { usersRoutes };