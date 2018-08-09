import ScriptApp = GoogleAppsScript.Script.ScriptApp
import URLFetchRequestOptions = GoogleAppsScript.URL_Fetch.URLFetchRequestOptions
import TextOutput = GoogleAppsScript.Content.TextOutput

import { ConfigService } from './config.service'
import { StorageService } from './storage.service'
import { ACTION_TEXT } from './constants'
import { Action, Attachement, SlackUser, PostEvent } from './models'
import { chunk, lottery, separateData } from './utils'

declare var global: any

const CONFIRM_COMMAND: string = 'confirm'

function send_message(data: object) {
  let payload = JSON.stringify(data)
  let params: URLFetchRequestOptions = {
    method: 'post',
    payload: payload
  }
  try {
    var webhook_url = ConfigService.get_message_post_url()
    if (webhook_url == null) {
      return
    }
    var res = UrlFetchApp.fetch(webhook_url, params)
    var content = res.getContentText('UTF-8')
  } catch (e) {
    console.error(e.message)
  }
}

global.send_question = (event): void => {
  console.info('send_question')
  if (event) {
    ConfigService.remove_timer(event.triggerUid)
  }
  let today = new Date()
  console.info(today)
  StorageService.prepareStorage(today)
  let actions: Action[] = []
  let times = ConfigService.get_times()

  times.forEach(function(val: string) {
    actions.push(new Action(val, val, 'button', "'" + val))
  })
  actions.push(new Action(CONFIRM_COMMAND, '確認する', 'button', CONFIRM_COMMAND))

  let attachments: Attachement = [
    {
      text: '何時に出ますか？（エラーが出たら確認を押してみてください）' // TODO i18n
    }
  ]
  // 5 is max buttons
  chunk(actions, 5).forEach(function(chunked_actions: Action[]) {
    attachments.push({
      text: '',
      actions: chunked_actions,
      color: '#ff9933',
      callback_id: 'yoritomo'
    })
  })

  let data = {
    attachments: attachments
  }
  if (ConfigService.is_workday(today)) {
    send_message(data)
  } else {
    console.info('today is not workday.')
  }
}

global.doPost = (e: PostEvent): TextOutput => {
  let jsonData = JSON.parse(decodeURIComponent(e.parameter.payload))
  let action_text: string = ''
  let val = String(jsonData.actions[0].value)
  if (CONFIRM_COMMAND !== val) {
    let action = StorageService.putData(new Date(), jsonData.user.id, jsonData.user.name, val)
    action_text = `<@${jsonData.user.id}>: ${val} (${ACTION_TEXT[action]})`
  } else {
    let when = StorageService.confirmData(new Date(), jsonData.user.id)
    if (when.trim().length > 0) {
      action_text = `<@${jsonData.user.id}>: ${when} で登録済みです`
    } else {
      action_text = `<@${jsonData.user.id}>: 登録がありません。もう一度時間を押してください`
    }
  }
  let replyMessage = {
    replace_original: false,
    response_type: 'in_channel',
    text: action_text
  }
  return ContentService.createTextOutput(JSON.stringify(replyMessage)).setMimeType(
    ContentService.MimeType.JSON
  )
}

global.draw = (event): void => {
  let today = new Date()
  let data = StorageService.getData(today)
  let max_members = ConfigService.get_max_members()
  let lottery_min_ratio = ConfigService.get_lottery_min_ratio()
  let lottery_ratio = ConfigService.get_lottery_ratio()
  let lottery_miss_count = ConfigService.get_lottery_miss_count()
  let result = separateData(data, max_members)

  let argument_time = ConfigService.get_trigger_argument(event.triggerUid)
  ConfigService.remove_timer(event.triggerUid)

  let message = '今日のランチは\n'

  let team_no = 0
  let changed_ratio: number

  ConfigService.get_times().forEach(function(time: string) {
    if (argument_time !== time) {
      return
    }
    var teams = result[time]
    if (teams && teams.length > 0) {
      message += ` ----- ${time}\n`
      teams.forEach(function(team: SlackUser[]) {
        team_no += 1
        if (team.length > 1) {
          changed_ratio = lottery_ratio - lottery_miss_count
          if (changed_ratio < lottery_min_ratio) changed_ratio = lottery_min_ratio
          if (lottery(team, changed_ratio)) {
            message += '当たり！'
            lottery_miss_count = 0
          } else {
            lottery_miss_count += 1
          }
        }
        message += ` チーム ${team_no}: `
        team.forEach(function(person) {
          message += `<@${person.userId}> ,`
        })
        message += '\n'
      })
      message += '\n'
      ConfigService.set_lottery_miss_count(lottery_miss_count)
      send_message({ text: message })
    }
  })
}

global.set_timer = (): void => {
  ConfigService.set_timer()
}
global.init = (): void => {
  ConfigService.initialize()
}
