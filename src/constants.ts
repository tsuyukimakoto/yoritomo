enum Operations {
  ADD,
  MODIFY,
  CANCEL
}
const ACTION_TEXT: string[] = ['登録しました', '時間を変更しました', '諦めました']

const DAYS: string[] = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
const DAYS_TO_NO: { [key: string]: number } = {
  SUN: 0,
  MON: 1,
  TUE: 2,
  WED: 3,
  THU: 4,
  FRI: 5,
  SAT: 6
}

const PROPERTY_FILE_ID: string = 'file_id'
const PROPERTY_FOLDER_ID: string = 'folder_id'
const PROPERTY_TIMES: string = 'times'
const PROPERTY_WEBFOOK_URL: string = 'webhook_url'
const PROPERTY_WORK_DAYS_OF_WEEK: string = 'work_days_of_week'
const FOLDER_NAME: string = 'YORITOMO-SAN-DATA'
const TIMES_DEFAULT: string = '11:30,12:00,12:30,13:00'
const WORK_DAYS_OF_WEEK_DEFAULT: string = 'MON,TUE,WED,THU,FRI' // MON,TUE,WED,THU,FRI,SAT,SUN

export {
  ACTION_TEXT,
  DAYS,
  DAYS_TO_NO,
  FOLDER_NAME,
  Operations,
  PROPERTY_FILE_ID,
  PROPERTY_FOLDER_ID,
  PROPERTY_TIMES,
  PROPERTY_WEBFOOK_URL,
  PROPERTY_WORK_DAYS_OF_WEEK,
  TIMES_DEFAULT,
  WORK_DAYS_OF_WEEK_DEFAULT
}
