
function monday_of_week(today: Date): Date {
    let firstday: Date = today
    let day_of_week: number = today.getDay()
    var diff: number

    if(day_of_week == 0) diff = 6
    else diff = day_of_week - 1

    firstday.setDate(today.getDate() - diff)  // monday
    return new Date(firstday.getTime())
}
function generate_sheetname(day: Date): string {
    return "" + day.getFullYear() + ("0" + (day.getMonth() + 1)).slice(-2) + ("0" + day.getDate()).slice(-2)
}
function generate_sheetnames(today: Date): string[] {
    let firstday = monday_of_week(today)
    let result:string[] = []
    for(var i = 0; i < 7; i++) {
        let d = new Date(firstday.getTime())
        d.setDate(firstday.getDate() + i)
        result.push(generate_sheetname(d))
    }
    return result
}

function generate_filename(today: Date): string {
    return `{tody.getFullYear()}_{today.getMonth() + 1}_{today.getDate()}`
}

export {
    generate_filename,
    generate_sheetname,
    generate_sheetnames,
    monday_of_week
}