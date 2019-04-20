import { StringifyOptions } from 'querystring';

export class Users {
    id: number;
    name: string;
    email: string;
    dailyHours: number;
    technologies: Array<string>;
    preferableHours:{
        any: boolean;
        start?: string;
        end?: string;
    }
}