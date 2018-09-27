import Spreadsheet = GoogleAppsScript.Spreadsheet.Spreadsheet
import Sheet = GoogleAppsScript.Spreadsheet.Sheet
import DriveApp = GoogleAppsScript.Drive.DriveApp
import Folder = GoogleAppsScript.Drive.Folder
import PropertyService = GoogleAppsScript.Properties.PropertiesService

import { ConfigService } from './config.service'
import { Operations, FOLDER_NAME, PROPERTY_FILE_ID, PROPERTY_FOLDER_ID } from './constants'
import { ShiftTable, SlackUser } from './models'
import { monday_of_week, generate_filename, generate_sheetnames, generate_sheetname } from './utils'

export class StorageService {
  static prepareStorage(today: Date): boolean {
    let properties = PropertiesService.getScriptProperties()
    let folder_id = properties.getProperty(PROPERTY_FOLDER_ID)
    let file_id = properties.getProperty(PROPERTY_FILE_ID)
    let spreadsheet: Spreadsheet
    let folder: Folder
    let need_new_one = false

    let this_week_file_name = generate_filename(today)

    // prepare data folder.
    if (folder_id == null) {
      console.info('NO FOLDER FOUND')
      folder = DriveApp.createFolder(FOLDER_NAME)
      properties.setProperty(PROPERTY_FOLDER_ID, folder.getId())
      console.info(`CREATE FOLDER AND SET SCRIPT PROPERTY(${PROPERTY_FOLDER_ID}:${folder.getId()})`)

      ConfigService.initialize()
    } else {
      folder = DriveApp.getFolderById(folder_id)
    }

    // prepare spread sheet for this week.
    if (file_id !== null) {
      spreadsheet = SpreadsheetApp.openById(file_id)
      if (this_week_file_name !== spreadsheet.getName()) {
        // need to create new one for this week.
        need_new_one = true
        console.info(`Need new data file.`)
      }
    }
    if (file_id == null || need_new_one == true) {
      spreadsheet = SpreadsheetApp.create(this_week_file_name)
      generate_sheetnames(monday_of_week(today)).forEach(function(val, index, ar) {
        spreadsheet.insertSheet(val, index)
      })
      let default_sheet = spreadsheet.getSheetByName('シート1')
      if (default_sheet) {
        spreadsheet.deleteSheet(default_sheet)
      }
      properties.setProperty(PROPERTY_FILE_ID, spreadsheet.getId())
      console.info(
        `CREATE Spreadsheet AND SET PROPERTY (${PROPERTY_FILE_ID}: ${spreadsheet.getId()})`
      )
      let root_folder = DriveApp.getRootFolder()
      let spreadsheet_file = DriveApp.getFileById(spreadsheet.getId())
      folder.addFile(spreadsheet_file)
      root_folder.removeFile(spreadsheet_file)
      return true
    }
    return false
  }
  static confirmData(today: Date, id: string): string {
    let spreadsheet = StorageService.getSpreadSheet(today)
    let sheet = spreadsheet.getSheetByName(generate_sheetname(today))
    let max_row = sheet.getLastRow()
    if (max_row == 0) return ''

    let range = sheet.getRange(1, 1, max_row)
    let ids = range.getValues()
    for (var i = 0; i < ids.length; i++) {
      let value = ids[i]
      if (id == new String(value)) {
        return String(sheet.getRange(i + 1, 3).getValue())
      }
    }
    return ''
  }
  static modifyData(sheet: Sheet, id: string, name: string, when: string): Operations {
    let max_row = sheet.getLastRow()
    if (max_row == 0) {
      sheet.appendRow([id, name, when])
      return Operations.ADD
    }
    let range = sheet.getRange(1, 1, max_row)
    let ids = range.getValues()
    for (var i = 0; i < ids.length; i++) {
      let value = ids[i]
      if (id == new String(value)) {
        var current_when = "'" + sheet.getRange(i + 1, 3).getValue()
        if (current_when == when) {
          sheet.getRange(i + 1, 3).setValue('')
          return Operations.CANCEL
        } else {
          sheet.getRange(i + 1, 3).setValue(when)
          return Operations.MODIFY
        }
      }
    }
    sheet.appendRow([id, name, when])
    return Operations.ADD
  }
  static getSpreadSheet(today: Date): Spreadsheet {
    let properties = PropertiesService.getScriptProperties()
    let file_id = properties.getProperty(PROPERTY_FILE_ID)
    if (file_id == null) {
      console.error(`MISSING PROPERTY_FILE_ID, SOMETHING WRONG!`)
      throw new Error('MISSING PROPERTY_FILE_ID')
    }
    return SpreadsheetApp.openById(file_id)
  }
  static putData(today: Date, id: string, name: string, when: string): Operations {
    let spreadsheet = StorageService.getSpreadSheet(today)
    let sheet = spreadsheet.getSheetByName(generate_sheetname(today))
    return StorageService.modifyData(sheet, id, name, when)
  }
  static getData(today: Date): ShiftTable {
    let properties = PropertiesService.getScriptProperties()
    let spreadsheet = StorageService.getSpreadSheet(today)
    let sheet = spreadsheet.getSheetByName(generate_sheetname(today))
    let times = ConfigService.get_times()
    let result: ShiftTable = {}

    var max_row = sheet.getLastRow()
    if (max_row == 0) return result

    times.forEach(function(val) {
      result[val] = []
    })

    var values = sheet.getRange(1, 1, max_row, 3).getValues()
    for (var i = 0; i < values.length; i++) {
      let person = values[i]
      let id = String(person[0])
      let name = String(person[1])
      let when = String(person[2]) // "12:00" etc
      if (when) {
        result[when].push(new SlackUser(id, name))
      }
    }
    return result
  }
}
