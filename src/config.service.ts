import PropertyService = GoogleAppsScript.Properties.PropertiesService

import {
  DAYS,
  LOTTERRY_RATIO_DEFAULT,
  MAX_MEMBERS_DEFAULT,
  PROPERTY_LOTTERY_RATIO,
  PROPERTY_MAX_MEMBERS,
  PROPERTY_QUESTION_TIME,
  PROPERTY_WEBFOOK_URL,
  PROPERTY_WORK_DAYS_OF_WEEK,
  WORK_DAYS_OF_WEEK_DEFAULT,
  PROPERTY_TIMES,
  QUESTION_TIME_DEFAULT,
  TIMES_DEFAULT
} from './constants'
import { time_to_hourminutes } from './utils'

export class ConfigService {
  static initialize() {
    let properties = PropertiesService.getScriptProperties()
    ConfigService.set_default_work_days()
    ConfigService.set_default_times()
    ConfigService.set_default_max_members()
    ConfigService.set_default_question_time()
    ConfigService.set_default_lottery_ratio()
  }
  static set_default_work_days() {
    let properties = PropertiesService.getScriptProperties()
    let workdays = properties.getProperty(PROPERTY_WORK_DAYS_OF_WEEK)
    if (workdays == null) {
      properties.setProperty(PROPERTY_WORK_DAYS_OF_WEEK, WORK_DAYS_OF_WEEK_DEFAULT)
      console.info(
        `SET DEFAULT WORKDAY TO SCRIPT PROPERTY (${PROPERTY_WORK_DAYS_OF_WEEK}: ${WORK_DAYS_OF_WEEK_DEFAULT})`
      )
    }
  }
  static set_default_times() {
    let properties = PropertiesService.getScriptProperties()
    let times = properties.getProperty(PROPERTY_TIMES)
    if (times == null) {
      properties.setProperty(PROPERTY_TIMES, TIMES_DEFAULT)
      console.info(
        `SET SCRIPT PROPERTY(${PROPERTY_TIMES}:${TIMES_DEFAULT}), this is default and can change.`
      )
    }
  }
  static set_default_max_members() {
    let properties = PropertiesService.getScriptProperties()
    let max_members = properties.getProperty(PROPERTY_MAX_MEMBERS)
    if (max_members == null) {
      properties.setProperty(PROPERTY_MAX_MEMBERS, MAX_MEMBERS_DEFAULT)
      console.info(
        `SET SCRIPT PROPERTY(${PROPERTY_MAX_MEMBERS}:${MAX_MEMBERS_DEFAULT}), this is default and can change.`
      )
    }
  }
  static set_default_question_time() {
    let properties = PropertiesService.getScriptProperties()
    let question_time = properties.getProperty(PROPERTY_QUESTION_TIME)
    if (question_time == null) {
      properties.setProperty(PROPERTY_QUESTION_TIME, QUESTION_TIME_DEFAULT)
      console.info(
        `SET SCRIPT PROPERTY(${PROPERTY_QUESTION_TIME}:${QUESTION_TIME_DEFAULT}), this is default and can change.`
      )
    }
  }
  static set_default_lottery_ratio() {
    let properties = PropertiesService.getScriptProperties()
    let lottery_ratio = properties.getProperty(PROPERTY_LOTTERY_RATIO)
    if (lottery_ratio == null) {
      properties.setProperty(PROPERTY_LOTTERY_RATIO, LOTTERRY_RATIO_DEFAULT)
      console.info(
        `SET SCRIPT PROPERTY(${PROPERTY_LOTTERY_RATIO}:${LOTTERRY_RATIO_DEFAULT}), this is default and can change.`
      )
    }
  }
  static is_workday(today: Date): boolean {
    let properties = PropertiesService.getScriptProperties()
    let workdays = properties.getProperty(PROPERTY_WORK_DAYS_OF_WEEK)
    if (workdays == null) {
      console.error(
        `MISSING WORKDAYS, YOU SHOULD TO SET SCRIPT PROPERTY(${PROPERTY_WORK_DAYS_OF_WEEK}) like ${WORK_DAYS_OF_WEEK_DEFAULT}.`
      )
      return false
    }
    if (workdays.indexOf(DAYS[today.getDay()]) >= 0) return true
    return false
  }
  static get_trigger_argument(trigger_unique_id): string {
    let properties = PropertiesService.getScriptProperties()
    return properties.getProperty(`trigger_${trigger_unique_id}`)
  }
  static set_timer_send_question(properties: GoogleAppsScript.Properties.Properties): void {
    let hourminutes = time_to_hourminutes(properties.getProperty(PROPERTY_QUESTION_TIME))
    let timer = new Date()
    timer.setHours(hourminutes[0])
    timer.setMinutes(hourminutes[1])
    ScriptApp.newTrigger('send_question')
      .timeBased()
      .at(timer)
      .create()
  }
  static set_timer_draw(properties: GoogleAppsScript.Properties.Properties): void {
    ConfigService.get_times().forEach(function(time: string) {
      let hourminutes = time_to_hourminutes(time)
      let timer = new Date()
      timer.setHours(hourminutes[0])
      timer.setMinutes(hourminutes[1] - 10) // TODO Magic Number
      let trigger_unique_id = ScriptApp.newTrigger('draw')
        .timeBased()
        .at(timer)
        .create()
        .getUniqueId()
      properties.setProperty(`trigger_${trigger_unique_id}`, time)
    })
  }
  static set_timer(): void {
    let properties = PropertiesService.getScriptProperties()
    // set time based trigger send_question
    ConfigService.set_timer_send_question(properties)
    // set time based trigger draw each time
    ConfigService.set_timer_draw(properties)
  }
  static remove_timer(trigger_unique_id: string): void {
    let properties = PropertiesService.getScriptProperties()
    ScriptApp.getProjectTriggers().forEach(function(trigger: GoogleAppsScript.Script.Trigger) {
      if (trigger.getUniqueId() === trigger_unique_id) {
        ScriptApp.deleteTrigger(trigger)
      }
    })
    properties.deleteProperty(`trigger_${trigger_unique_id}`)
  }
  static get_message_post_url(): string {
    let properties = PropertiesService.getScriptProperties()
    let webhook_url = properties.getProperty(PROPERTY_WEBFOOK_URL)
    if (webhook_url == null) {
      console.error(
        `No WebhookURL found. You need set webhook_url to script property ${PROPERTY_WEBFOOK_URL}.`
      )
    }
    return webhook_url
  }
  static get_times(): string[] {
    let properties = PropertiesService.getScriptProperties()
    let times = properties
      .getProperty(PROPERTY_TIMES)
      .split(',')
      .map(function(item) {
        return item.trim()
      })
    return times
  }
  static get_max_members(): number {
    let properties = PropertiesService.getScriptProperties()
    return Number(properties.getProperty(PROPERTY_MAX_MEMBERS))
  }
  static get_lottery_ratio(): number {
    let properties = PropertiesService.getScriptProperties()
    return Number(properties.getProperty(PROPERTY_LOTTERY_RATIO))
  }
}
