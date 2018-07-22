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

export class PostEvent {
  queryString: string
  parameter: { [index: string]: string }
  parameters: { [index: string]: [string] }
  contentLenth: number
  postData: {
    length: number
    type: string
    contents: string
    name: string
  }
}

export type ShiftTable = { [key: string]: SlackUser[] }
export type ShiftTables = { [key: string]: SlackUser[][] }
