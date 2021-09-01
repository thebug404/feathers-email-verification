import { Application } from '../declarations';

import users from './users/users.service';
import mails from "./mails/mails.service";
import authmanagement from "./authmanagement/authmanagement.service";

export default function (app: Application): void {
  app.configure(users);
  app.configure(mails);
  app.configure(authmanagement);
}
