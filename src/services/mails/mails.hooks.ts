import { HooksObject } from "@feathersjs/feathers";
import { disallow } from "feathers-hooks-common";

const hooks: HooksObject = {
    before: {
        // Reject all requests that come from outside.
        all: [disallow("external")]
    },
    after: {},
    error: {}
};

export default hooks;
