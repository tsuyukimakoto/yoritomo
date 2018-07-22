import URLFetchRequestOptions = GoogleAppsScript.URL_Fetch.URLFetchRequestOptions

import { ConfigService } from './config.service'
import { Action } from './models'

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

function send_question() {
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
  if (ConfigService.is_workday(new Date())) {
    send_message(data)
  } else {
    console.info('today is not workday.')
  }
}
