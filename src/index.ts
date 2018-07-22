import URLFetchRequestOptions = GoogleAppsScript.URL_Fetch.URLFetchRequestOptions
import TextOutput = GoogleAppsScript.Content.TextOutput

import { ConfigService } from './config.service'
import { StorageService } from './storage.service'
import { ACTION_TEXT } from './constants'
import { Action, PostEvent } from './models'

declare var global: any

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

global.send_question = (): void => {
  let today = new Date()
  StorageService.prepareStorage(today)
  let actions: Action[] = []
  let times = ConfigService.get_times()

  times.forEach(function(val: string) {
    actions.push(new Action(val, val, 'button', "'" + val))
  })

  let data = {
    attachments: [
      {
        actions: actions,
        text: '何時に出ますか？', // TODO i18n
        callback_id: 'yoritomo'
      }
    ]
  }
  if (ConfigService.is_workday(today)) {
    send_message(data)
  } else {
    console.info('today is not workday.')
  }
}

global.doPost = (e: PostEvent): TextOutput => {
  let jsonData = JSON.parse(decodeURIComponent(e.parameter.payload))
  let action = StorageService.putData(
    new Date(),
    jsonData.user.id,
    jsonData.user.name,
    jsonData.actions[0].value
  )
  let action_text = `<@${jsonData.user.id}>: ${jsonData.actions[0].value} (${ACTION_TEXT[action]})`
  let replyMessage = {
    replace_original: false,
    response_type: 'in_channel',
    text: action_text
  }
  return ContentService.createTextOutput(JSON.stringify(replyMessage)).setMimeType(
    ContentService.MimeType.JSON
  )
}
