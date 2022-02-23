import { inject, injectable } from "tsyringe";
import { v4 as uuid } from "uuid";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";

import { AppError } from "@shared/errors/AppError";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IEMailProvider } from "@shared/container/providers/EmailProvider/IEmailProvider";

@injectable()
class SendRecoveryPasswordEmailUseCase {

    private usersRepository: IUsersRepository;
    private usersTokensRepository: IUsersTokensRepository;
    private dateProvider: IDateProvider;
    private emailProvider: IEMailProvider;

    constructor(
        @inject("UsersRepository")
        usersRepository:
        IUsersRepository,
        @inject("UsersTokensRepository")
        usersTokensRepository:
        IUsersTokensRepository,
        @inject("DateProvider")
        dateProvider:
        IDateProvider,
        @inject("EmailProvider")
        emailProvider: 
        IEMailProvider
    ){
        this.usersRepository = usersRepository;
        this.usersTokensRepository = usersTokensRepository;
        this.dateProvider = dateProvider;
        this.emailProvider = emailProvider;
    };

    public async execute(email: string) {
        const user = await this.usersRepository.findByEmail(email);

        if(!user){
            throw new AppError("User doesnt exists");
        };

        const recoveryToken = uuid();

        const expiration_date = this.dateProvider.addHours(3);

        await this.usersTokensRepository.create({
            refresh_token: recoveryToken,
            user_id: user.id,
            expiration_date
        });

        await this.emailProvider.sendEmail(email, "Recuperação de senha", `O seu token de recuperação é ${recoveryToken}`);
    };
};

export { SendRecoveryPasswordEmailUseCase };