import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "@shared/errors/AppError";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UserRepository";

interface IPayload {
    sub: string;
};

export const ensureAuthenticated = async (request: Request, response: Response, next: NextFunction) => {
    const authHeader = request.headers.authorization;

    if(!authHeader){
        throw new AppError("Missing token");
    };

    const [, token] = authHeader.split(' ');

    try{
        const { sub: user_id } = verify(token, "ASDS@SDA21F0,XZasd54aDA/9/64sa2!!!@DSAc") as IPayload;

        const usersRepository = new UsersRepository;

        const user = usersRepository.findById(user_id);

        if(!user){
            throw new AppError('User doesnt exists', 401);
        };
        
        request.user = {
            id: user_id
        };

        next();
    }catch(err){
        throw new AppError('Invalid token', 401);
    };
};