export class User {
    id: number;
    name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}

export const USERS: User[] = [
    { id: 11, name: 'apis' },
    { id: 12, name: 'web teh' },
    { id: 13, name: 'rita' },
    { id: 14, name: 'random' },
    { id: 15, name: 'nekvi neshta' },
  ];