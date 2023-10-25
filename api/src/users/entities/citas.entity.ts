import { User } from "./user.entity";
import { Calendar } from "./calendar.entity";

export class Citas {
    user: User;
    citas: Calendar[];
}