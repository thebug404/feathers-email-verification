import * as feathersAuthentication from '@feathersjs/authentication';
import * as local from '@feathersjs/authentication-local';
import { Application } from '@feathersjs/express';
import { HooksObject } from '@feathersjs/feathers';
import { BadRequest } from "@feathersjs/errors";
import authmanagement from "feathers-authentication-management-ts";
import feathersCommon from "feathers-hooks-common";

import notifier from "../authmanagement/authmanagement.controller";

const { authenticate } = feathersAuthentication.hooks;
const { hashPassword, protect } = local.hooks;

const hooks: HooksObject = {
  before: {
    all: [],
    find: [ authenticate('jwt') ],
    get: [ authenticate('jwt') ],
    create: [
      hashPassword('password'),
      // Sets values to some properties of the users model.
      authmanagement.hooks.addVerification()
    ],
    update: [
      hashPassword('password'),
      authenticate('jwt'),
      feathersCommon.disallow("external")
    ],
    patch: [
      feathersCommon.iff(
        feathersCommon.isProvider('external'),
        feathersCommon.preventChanges(true,
          'email',
          'isVerified',
          'verifyToken',
          'verifyShortToken',
          'verifyExpires',
          'verifyChanges',
          'resetToken',
          'resetShortToken',
          'resetExpires'
        )
      ),
      hashPassword('password'),
      authenticate('jwt')
    ],
    remove: [ authenticate('jwt') ]
  },

  after: {
    all: [ protect('password') ],
    create: [
      ({ app, result }) => {
        const sender = notifier(app as Application);

        if (typeof sender.notifier !== "function") throw new BadRequest({
          name: "EmailNotSupported",
          message: "Sending emails not supported"
        });

        sender.notifier("resendVerifySignup", result);
      },
      // Protects sensitive properties before they are shipped to the customer.
      authmanagement.hooks.removeVerification()
    ]
  },
  error: {}
};

export default hooks;
