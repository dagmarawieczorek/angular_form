export class User {
    id: number;
    name: string;
    email: string;
    dailyHours: number;
    technologies: Array<string>;
    preferableHours: PreferableHour;
}

export class PreferableHour {
    any: boolean;
    start?: string;
    end?: string;
}