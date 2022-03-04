import { Router } from "express";

import { ResetUserPasswordController } from "@modules/accounts/useCases/resetUserPassword/ResetUserPasswordController";
import { SendRecoveryPasswordEmailController } from "@modules/accounts/useCases/sendRecoveryPasswordEmail/SendRecoveryPasswordEmailController";

const passwordRoutes = Router();

const sendRecoveryPasswordEmailController = new SendRecoveryPasswordEmailController(); 
const resetUserPasswordController = new ResetUserPasswordController();

passwordRoutes.post('/recovery', sendRecoveryPasswordEmailController.handle);
passwordRoutes.post('/reset', resetUserPasswordController.handle);

export { passwordRoutes };