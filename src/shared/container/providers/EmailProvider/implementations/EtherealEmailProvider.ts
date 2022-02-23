import { injectable } from "tsyringe";
import nodemailer, { Transporter } from "nodemailer";

import { IEMailProvider } from "../IEmailProvider";

@injectable()
class EtherealEmailProvider implements IEMailProvider {

    private client: Transporter;

    constructor(){
        nodemailer.createTestAccount().then(account => {
            const transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass
                }
            });

            this.client = transporter
        }).catch(error => {
            console.log(error);
        });
    };

    public async sendEmail(to: string, subject: any, body: string): Promise<void> {
        
        await this.client.sendMail({
            to,
            from: "RentX <noreply@rentx.com.br>",
            subject,
            text: body,
            html: body
        });
    };
};

export { EtherealEmailProvider };