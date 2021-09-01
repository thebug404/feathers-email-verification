import { Application } from "@feathersjs/express";
import { ServiceMethods } from "@feathersjs/feathers";
import { createTransport, SendMailOptions, Transporter } from "nodemailer";

export class Mails implements Partial<ServiceMethods<SendMailOptions>> {
    private transporter: Transporter;

    constructor(app: Application) {
        // We initialize the transporter.
        this.transporter = createTransport(app.get("mailer"));
    }

    /**
     * We send the email.
     * @param data 
     * @returns 
     */
    async create(data: Partial<SendMailOptions>): Promise<any> {
        return await this.transporter.sendMail(data);
    }
}
