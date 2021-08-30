import { Application } from '../declarations';

import users from './users/users.service';
import mails from "./mails/mails.service";

export default function (app: Application): void {
  // We expose the service to the rest of the application.
  app.configure(mails);
  app.configure(users);
}
