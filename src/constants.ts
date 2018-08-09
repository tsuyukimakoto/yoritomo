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
const PROPERTY_LOTTERY_MIN_RATIO: string = 'lottery_min_ratio'
const PROPERTY_LOTTERY_MISS_COUNT: string = 'lottery_miss_count'
const PROPERTY_LOTTERY_RATIO: string = 'lottery_ratio'
const PROPERTY_MAX_MEMBERS: string = 'max_members'
const PROPERTY_QUESTION_TIME: string = 'question_time'
const PROPERTY_TIMES: string = 'times'
const PROPERTY_WEBFOOK_URL: string = 'webhook_url'
const PROPERTY_WORK_DAYS_OF_WEEK: string = 'work_days_of_week'
const FOLDER_NAME: string = 'YORITOMO-SAN-DATA'
const LOTTERRY_RATIO_DEFAULT: string = '100'
const MAX_MEMBERS_DEFAULT: string = '4'
const QUESTION_TIME_DEFAULT: string = '9:00'
const TIMES_DEFAULT: string = '11:30,12:00,12:30,13:00'
const WORK_DAYS_OF_WEEK_DEFAULT: string = 'MON,TUE,WED,THU,FRI' // MON,TUE,WED,THU,FRI,SAT,SUN

export {
  ACTION_TEXT,
  DAYS,
  DAYS_TO_NO,
  FOLDER_NAME,
  LOTTERRY_RATIO_DEFAULT,
  MAX_MEMBERS_DEFAULT,
  QUESTION_TIME_DEFAULT,
  Operations,
  PROPERTY_FILE_ID,
  PROPERTY_FOLDER_ID,
  PROPERTY_LOTTERY_MIN_RATIO,
  PROPERTY_LOTTERY_MISS_COUNT,
  PROPERTY_LOTTERY_RATIO,
  PROPERTY_MAX_MEMBERS,
  PROPERTY_QUESTION_TIME,
  PROPERTY_TIMES,
  PROPERTY_WEBFOOK_URL,
  PROPERTY_WORK_DAYS_OF_WEEK,
  TIMES_DEFAULT,
  WORK_DAYS_OF_WEEK_DEFAULT
}
