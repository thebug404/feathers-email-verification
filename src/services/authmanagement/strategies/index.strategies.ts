import { User, Types } from "feathers-authentication-management-ts";
import { SendMailOptions } from "nodemailer";

export interface MailOptions extends Partial<SendMailOptions> {
    user: User;
    token?: string;
    domain: string;
}

export interface ParamsLink {
    type?: string;
    token?: string;
    domain: string;
}

export type StrategiesAuthManagement = Record<
    Types,
    (options: MailOptions) => MailOptions
>;

export function generateLink(data: ParamsLink): string {
    const { domain, type, token } = data;
    return `${ domain }/${ type }?token=${ token }`;
}

export function verificationEmail(options: MailOptions): MailOptions {
    const { token, domain } = options;
    const link: string = generateLink({ token, domain, type: "verifyEmail" });

    return {
        ...options,
        subject: "Email Verification",
        text: "Feathers welcomes you, check your email to access our services 📧",
        html: `
            <h1>Thanks for registering 🥰</h1>
            <p>Verify your email and everything will be ready.</p>
            <a href="${ link }">Verify your email</a>
        `
    };
}

export function confirmationEmail(options: MailOptions): MailOptions {
    const html: string = `
        <h1>Your email has been verified</h1>
        <p>Great, now that your account is verified. It is time to get down to work.</p>
    `;

    return {
        ...options,
        subject: "Verified Email",
        text: "Congratulations! Your email has been verified 🏆",
        html
    };
}

export const strategies: Partial<StrategiesAuthManagement> = {
    resendVerifySignup: verificationEmail,
    verifySignup: confirmationEmail
}
