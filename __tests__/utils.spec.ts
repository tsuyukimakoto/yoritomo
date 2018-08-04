import { WORK_DAYS_OF_WEEK_DEFAULT } from '../src/constants'
import { date_to_day_of_the_week, generate_filename, lottery, monday_of_week, generate_sheetnames, separateData } from '../src/utils'
import { ShiftTable, SlackUser } from '../src/models'

describe("monday_of_week", () => {  
  it("same year, same month, monday", function () {  
    let result_date = monday_of_week(new Date(2018, 6, 9))  // 2018/07/09 month starts zero
    expect(result_date.getFullYear()).toBe(2018)
    expect(result_date.getMonth()).toBe(6)  // month starts zero
    expect(result_date.getDate()).toBe(9)
  })
  it("same year, same month, saturday", function () {  
    let result_date = monday_of_week(new Date(2018, 6, 14))  // 2018/07/14 month starts zero
    expect(result_date.getFullYear()).toBe(2018)
    expect(result_date.getMonth()).toBe(6)  // month starts zero
    expect(result_date.getDate()).toBe(9)
  })
  it("same year, same month, sunday", function () {  
    let result_date = monday_of_week(new Date(2018, 6, 15))  // 2018/07/15 month starts zero
    expect(result_date.getFullYear()).toBe(2018)
    expect(result_date.getMonth()).toBe(6)  // month starts zero
    expect(result_date.getDate()).toBe(9)
  })
  it("same year, other month, first day", function () {  
    let result_date = monday_of_week(new Date(2018, 7, 1))  // Wednesday 2018/08/01 month starts zero
    expect(result_date.getFullYear()).toBe(2018)
    expect(result_date.getMonth()).toBe(6)  // month starts zero
    expect(result_date.getDate()).toBe(30)
  })
  it("same year, other month, first sunday", function () {  
    let result_date = monday_of_week(new Date(2018, 7, 5))  // Sunday 2018/08/05 month starts zero
    expect(result_date.getFullYear()).toBe(2018)
    expect(result_date.getMonth()).toBe(6)  // month starts zero
    expect(result_date.getDate()).toBe(30)
  })
  it("other year, other month, first day", function () {  
    let result_date = monday_of_week(new Date(2019, 0, 1))  // Tuesday 2019/01/01 month starts zero
    expect(result_date.getFullYear()).toBe(2018)
    expect(result_date.getMonth()).toBe(11)  // month starts zero
    expect(result_date.getDate()).toBe(31)
  })
  it("same year, same month, first monday", function () {  
    let result_date = monday_of_week(new Date(2019, 0, 7))  // 2019/01/07 month starts zero
    expect(result_date.getFullYear()).toBe(2019)
    expect(result_date.getMonth()).toBe(0)  // month starts zero
    expect(result_date.getDate()).toBe(7)
  })
})

describe("generate_filename", () => {
  it("2018_7_23", function () {
    expect(generate_filename(new Date(2018, 6, 23))).toBe('2018_7_23')
    expect(generate_filename(new Date(2018, 6, 24))).toBe('2018_7_23')
    expect(generate_filename(new Date(2018, 6, 25))).toBe('2018_7_23')
    expect(generate_filename(new Date(2018, 6, 26))).toBe('2018_7_23')
    expect(generate_filename(new Date(2018, 6, 27))).toBe('2018_7_23')
    expect(generate_filename(new Date(2018, 6, 28))).toBe('2018_7_23')
    expect(generate_filename(new Date(2018, 6, 29))).toBe('2018_7_23')
  })
  it("2018_7_30", function () {
    expect(generate_filename(new Date(2018, 6, 30))).toBe('2018_7_30')
    expect(generate_filename(new Date(2018, 7, 1))).toBe('2018_7_30')
  })
})

describe("generate_sheetnames", () => {  
  it("2018, 6, 9", function () {  
    let sheetnames = generate_sheetnames(new Date(2018, 6, 9))  // 2018/07/09 month starts zero
    expect(sheetnames[0]).toBe('20180709')
    expect(sheetnames[1]).toBe('20180710')
    expect(sheetnames[2]).toBe('20180711')
    expect(sheetnames[3]).toBe('20180712')
    expect(sheetnames[4]).toBe('20180713')
    expect(sheetnames[5]).toBe('20180714')
    expect(sheetnames[6]).toBe('20180715')
  })
})

describe("date_to_day_of_the_week", () => {
  it("monday", function () {
    var today = new Date(2018, 6, 23)  // 2018/07/23 monday
    expect(date_to_day_of_the_week(today)).toBe('MON')
    expect(WORK_DAYS_OF_WEEK_DEFAULT.indexOf(date_to_day_of_the_week(today)) >= 0).toBe(true)
  })
  it("tuesday", function () {
    var today = new Date(2018, 6, 24)
    expect(date_to_day_of_the_week(today)).toBe('TUE')
    expect(WORK_DAYS_OF_WEEK_DEFAULT.indexOf(date_to_day_of_the_week(today)) >= 0).toBe(true)
  })
  it("wednesday", function () {
    var today = new Date(2018, 6, 25)
    expect(date_to_day_of_the_week(today)).toBe('WED')
    expect(WORK_DAYS_OF_WEEK_DEFAULT.indexOf(date_to_day_of_the_week(today)) >= 0).toBe(true)
  })
  it("thursday", function () {
    var today = new Date(2018, 6, 26)
    expect(date_to_day_of_the_week(today)).toBe('THU')
    expect(WORK_DAYS_OF_WEEK_DEFAULT.indexOf(date_to_day_of_the_week(today)) >= 0).toBe(true)
  })
  it("friday", function () {
    var today = new Date(2018, 6, 27)
    expect(date_to_day_of_the_week(today)).toBe('FRI')
    expect(WORK_DAYS_OF_WEEK_DEFAULT.indexOf(date_to_day_of_the_week(today)) >= 0).toBe(true)
  })
  it("saturday", function () {
    var today = new Date(2018, 6, 28)
    expect(date_to_day_of_the_week(today)).toBe('SAT')
    expect(WORK_DAYS_OF_WEEK_DEFAULT.indexOf(date_to_day_of_the_week(today)) >= 0).toBe(false)
  })
  it("sunday", function () {
    var today = new Date(2018, 6, 29)
    expect(date_to_day_of_the_week(today)).toBe('SUN')
    expect(WORK_DAYS_OF_WEEK_DEFAULT.indexOf(date_to_day_of_the_week(today)) >= 0).toBe(false)
  })
})

describe("divide", () => {  
  it("four to 4", function () {
    let data:ShiftTable = {}
    let slackusers = [
      new SlackUser('1', 'one'), new SlackUser('2', 'two'), new SlackUser('3', 'three'), new SlackUser('4', 'four')
    ]
    data['test'] = slackusers
    let result = separateData(data, 4)['test']
    expect(result.length).toBe(1)
    expect(result[0].length).toBe(4)
  })
  it("five to 3 and 2", function () {
    let data:ShiftTable = {}
    let slackusers = [
      new SlackUser('1', 'one'), new SlackUser('2', 'two'), new SlackUser('3', 'three'),
      new SlackUser('4', 'four'), new SlackUser('5', 'five')
    ]
    data['test'] = slackusers
    let result = separateData(data, 4)['test']
    expect(result.length).toBe(2)
    expect(result[0].length).toBe(3)
    expect(result[1].length).toBe(2)
  })
  it("six to 3 and 3", function () {
    let data:ShiftTable = {}
    let slackusers = [
      new SlackUser('1', 'one'), new SlackUser('2', 'two'), new SlackUser('3', 'three'),
      new SlackUser('4', 'four'), new SlackUser('5', 'five'), new SlackUser('6', 'six')
    ]
    data['test'] = slackusers
    let result = separateData(data, 4)['test']
    expect(result.length).toBe(2)
    expect(result[0].length).toBe(3)
    expect(result[1].length).toBe(3)
  })
  it("eight to 4 and 4", function () {
    let data:ShiftTable = {}
    let slackusers = [
      new SlackUser('1', 'one'), new SlackUser('2', 'two'), new SlackUser('3', 'three'),
      new SlackUser('4', 'four'), new SlackUser('5', 'five'), new SlackUser('6', 'six'),
      new SlackUser('7', 'seven'), new SlackUser('8', 'eight')
    ]
    data['test'] = slackusers
    let result = separateData(data, 4)['test']
    expect(result.length).toBe(2)
    expect(result[0].length).toBe(4)
    expect(result[1].length).toBe(4)
  })
})


describe("lottery", () => {
  let TEST_BUFFER = 3
  it("ratio is hundred.", function () {
    let ratio = 100
    let team:SlackUser[] = [
      new SlackUser('1', 'one'), new SlackUser('2', 'two')
    ]
    let teams:SlackUser[][] = []
    for (var i = 0; i < ratio * TEST_BUFFER; i++) {
      teams.push(team)
    }
    let partialLottery = (in_team:SlackUser[]):boolean => lottery(in_team, ratio);
    let result = teams.some(partialLottery, teams)
    expect(result).toBe(true)
  })
  it("ratio is ten.", function () {
    let ratio = 10
    let team:SlackUser[] = [
      new SlackUser('1', 'one'), new SlackUser('2', 'two')
    ]
    let teams:SlackUser[][] = []
    for (var i = 0; i < ratio * TEST_BUFFER; i++) {
      teams.push(team)
    }
    let partialLottery = (in_team:SlackUser[]):boolean => lottery(in_team, ratio);
    let result = teams.some(partialLottery, teams)
    expect(result).toBe(true)
  })
  it("ratio is 3.", function () {
    let ratio = 3
    let team:SlackUser[] = [
      new SlackUser('1', 'one'), new SlackUser('2', 'two')
    ]
    let teams:SlackUser[][] = []
    for (var i = 0; i < ratio * TEST_BUFFER; i++) {
      teams.push(team)
    }
    let partialLottery = (in_team:SlackUser[]):boolean => lottery(in_team, ratio);
    let result = teams.some(partialLottery, teams)
    expect(result).toBe(true)
  })
  it("ratio is 0.", function () {
    let ratio = 0
    let team:SlackUser[] = [
      new SlackUser('1', 'one'), new SlackUser('2', 'two')
    ]
    let teams:SlackUser[][] = []
    for (var i = 0; i < 50; i++) {
      teams.push(team)
    }
    let partialLottery = (in_team:SlackUser[]):boolean => lottery(in_team, ratio);
    let result = teams.some(partialLottery, teams)
    expect(result).toBe(false)
  })
  it("alone.", function () {
    let ratio = 5
    let team:SlackUser[] = [
      new SlackUser('1', 'one')
    ]
    let teams:SlackUser[][] = []
    for (var i = 0; i < ratio * TEST_BUFFER; i++) {
      teams.push(team)
    }
    let partialLottery = (in_team:SlackUser[]):boolean => lottery(in_team, ratio);
    let result = teams.some(partialLottery, teams)
    expect(result).toBe(false)
  })
})
