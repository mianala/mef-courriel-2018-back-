import {User} from './User';
import {Email} from './Email';
/**
 * Created by Loharano on 7/13/2017.
 */

export class Flow
{
  sender: User;
  reciever: User;
  archived: boolean;
  favorited: boolean;
  deleted: boolean;
  title: string;
  last_email: Email;
}
