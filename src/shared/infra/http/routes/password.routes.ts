import { SendRecoveryPasswordEmailController } from "@modules/accounts/useCases/sendRecoveryPasswordEmail/SendRecoveryPasswordEmailController";
import { Router } from "express";

const passwordRoutes = Router();

const sendRecoveryPasswordEmailController = new SendRecoveryPasswordEmailController();

passwordRoutes.post('/recovery', sendRecoveryPasswordEmailController.handle);

export { passwordRoutes };