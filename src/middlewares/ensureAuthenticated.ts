import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UserRepository";

interface IPayload {
    sub: string;
};

export const ensureAuthenticated = async (request: Request, response: Response, next: NextFunction) => {
    const authHeader = request.headers.authorization;

    if(!authHeader){
        throw new Error("Missing token");
    };

    const [, token] = authHeader.split(' ');

    try{
        const { sub: user_id } = verify(token, "ASDS@SDA21F0,XZasd54aDA/9/64sa2!!!@DSAc") as IPayload;

        const usersRepository = new UsersRepository;

        const user = usersRepository.findById(user_id);

        if(!user){
            throw new Error('User doesnt exists');
        };
        
        next();
    }catch(err){
        throw new Error('Invalid token');
    };
};