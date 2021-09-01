import { SendMailOptions } from "nodemailer";
import { Application } from "@feathersjs/express";
import { MethodNotAllowed } from "@feathersjs/errors";
import { Service } from "@feathersjs/feathers";
import { Options, Types, User } from "feathers-authentication-management-ts";

import { strategies, MailOptions } from "./strategies/index.strategies";

export default function (app: Application): Partial<Options> {
    return {
        notifier(types: Types, user: User): void {
            // Get strategy by types.
            const strategy = strategies[types];

            // Check if the strategy exists.
            if (typeof strategy !== "function") throw new MethodNotAllowed({
                name: "StrategyNotAllowed",
                message: `The <${types}> strategy has not been implemented`
            });

            // Get email service.
            const email: Service<SendMailOptions> = app.service("mails");

            // Set payload.
            const payload: MailOptions = strategy({
                from: app.get("email_domain"),
                to: user.email,
                token: user.verifyToken,
                domain: app.get("domain"),
                user
            });

            // Dispatch email.
            email.create(payload)
                .then(() => console.log("Sent email successfully"))
                .catch(console.error)
        }
    };
}
