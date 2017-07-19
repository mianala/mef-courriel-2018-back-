import {User} from './User';
/**
 * Created by Loharano on 7/13/2017.
 */

export class Flow {
  sender: User;
  receiver: User;
  archived: boolean;
  favorited: boolean;
  deleted: boolean;
  title: string;
}
