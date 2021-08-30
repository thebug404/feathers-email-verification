import { Application } from "@feathersjs/express";
import { Service } from "@feathersjs/feathers";
import { SendMailOptions } from "nodemailer";

import hooks from "./mails.hooks";

import { Mails } from "./mails.class";

export default function (app: Application): void {
    // Register service.
    app.use("/mails", new Mails(app));

    // Get mail service.
    const service: Service<SendMailOptions> = app.service("mails");

    // Register hooks in the service.
    service.hooks(hooks);
}
