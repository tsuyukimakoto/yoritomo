import { monday_of_week, generate_sheetnames, separateData } from '../src/utils'
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
