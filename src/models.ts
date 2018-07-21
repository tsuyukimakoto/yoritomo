export class SlackUser {
    userId: string
    name: string
    constructor(id: string, name: string) {
        this.userId = id
        this.name = name
    }
}

export type ShiftTable = { [key: string]: SlackUser[] }
