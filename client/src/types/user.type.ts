import { Calendar } from "./calendar.type";

export type User = {
    id: string;
    name: string;
    lastname: string;
    phone: number;
    citas: Calendar[];
};