import { Application } from "@feathersjs/express";
import { Service } from "@feathersjs/feathers";
import authmanagement from "feathers-authentication-management-ts";

import hooks from "./authmanagement.hooks";

import controller from "./authmanagement.controller";

export default function (app: Application): void {
    // Initialize service.
    app.configure(authmanagement(controller(app)));

    // Get service.
    const service: Service<any> = app.service("authManagement");

    // Add hooks.
    service.hooks(hooks);
}
