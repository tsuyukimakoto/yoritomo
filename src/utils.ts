import { DAYS } from './constants'
import { Action, ShiftTable, ShiftTables, SlackUser } from './models'

function monday_of_week(today: Date): Date {
  let firstday: Date = new Date(today.getTime())
  let day_of_week: number = today.getDay()
  var diff: number

  if (day_of_week == 0) diff = 6
  else diff = day_of_week - 1

  firstday.setDate(today.getDate() - diff) // monday
  return new Date(firstday.getTime())
}
function generate_sheetname(day: Date): string {
  return (
    '' +
    day.getFullYear() +
    ('0' + (day.getMonth() + 1)).slice(-2) +
    ('0' + day.getDate()).slice(-2)
  )
}
function generate_sheetnames(today: Date): string[] {
  let firstday = monday_of_week(today)
  let result: string[] = []
  for (var i = 0; i < 7; i++) {
    let d = new Date(firstday.getTime())
    d.setDate(firstday.getDate() + i)
    result.push(generate_sheetname(d))
  }
  return result
}

function generate_filename(today: Date): string {
  let monday = monday_of_week(today)
  return `${monday.getFullYear()}_${monday.getMonth() + 1}_${monday.getDate()}`
}

function divide(data: SlackUser[], max: number): SlackUser[][] {
  let teams: SlackUser[][] = []
  let team_count = Math.ceil(data.length / max)
  for (let i = 0; i < team_count; i++) {
    teams.push([])
  }

  let j = 0
  for (let i = data.length - 1; i >= 0; i--) {
    teams[j % team_count].push(data.splice(Math.floor(Math.random() * data.length), 1)[0])
    j++
  }
  return teams
}
function chunk(actions: Action[], max: number): Action[][] {
  let result: Action[][] = []
  for (var i = 0; i < actions.length; i += max) {
    result.push(actions.slice(i, max + i))
  }
  return result
}
function separateData(data: ShiftTable, max: number) {
  let result: ShiftTables = {}
  Object.keys(data).forEach(function(val: string) {
    result[val] = divide(data[val], max)
  })
  return result
}

function date_to_day_of_the_week(today: Date): string {
  console.log(`date_to_day_of_the_week: today.getDay() -> ${today.getDay()}: today -> ${today}`)
  return DAYS[today.getDay()]
}

function time_to_hourminutes(time: string): number[] {
  return time.split(':').map(function(num: string) {
    return Number(num.trim())
  })
}

function lottery(team: SlackUser[], ratio: number): boolean {
  console.log(`lottery: ratio is 1/${ratio} .`)
  if (!(team.length > 1)) {
    console.log(`alone team do not draw lottery, team.length: ${team.length}.`)
    return false
  }
  if (!(ratio > 0)) {
    console.log(`ratio is set to ${ratio}.`)
    return false
  }
  let result = Math.random() * ratio
  console.log(`lottery result: ${result}`)
  if (ratio == Math.ceil(result)) {
    console.log(`bingo! ${Math.ceil(result)}`)
    return true
  }
  return false
}

export {
  chunk,
  date_to_day_of_the_week,
  generate_filename,
  generate_sheetname,
  generate_sheetnames,
  lottery,
  monday_of_week,
  separateData,
  time_to_hourminutes
}
