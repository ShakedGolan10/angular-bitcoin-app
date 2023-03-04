export class UserModel {

    public _id?: string = ''
    constructor(
        public name: string = '',
        public coins: number = 100,
        public moves: Move[],
        public userName: string,
        public password: string
    ) {
    }

    setId?(id: string = 'u101') {
        this._id = id
    }
}

export interface Move {
    toId: string,
    to: string,
    at: number,
    amount: number
}

export interface emptyUser {

    name: string,
    coins: number,
    moves: Move[],
    userName: string,
    password: string
}
export interface cradentials {
    userName: string,
    password: string
}
