export class SlackUser {
  userId: string
  name: string
  constructor(id: string, name: string) {
    this.userId = id
    this.name = name
  }
}

export class Action {
  name: string
  text: string
  type: string
  value: string
  constructor(name: string, text: string, type: string, value: string) {
    this.name = name
    this.text = text
    this.type = type
    this.value = value
  }
}

export type ShiftTable = { [key: string]: SlackUser[] }
