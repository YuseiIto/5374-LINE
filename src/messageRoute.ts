import * as line from '@line/bot-sdk';
import followMessage from './messages/followMessage'
import selectArea from './messages/selectArea';

// 環境変数を .envファイルから読み込み
require('dotenv').config()
const config:line.ClientConfig = {
 channelSecret: process.env.LINE_CHANNEL_SECRET!, 
 channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN!
}

const client:line.Client = new line.Client(config)

export default async (event:line.WebhookEvent)=> {

 let message:line.Message;

  if (event.type=="follow") {
   // 友達追加イベント
    message = followMessage();
  }else if (event.type=="message" && event.message.type == "text") {
    // テキストメッセージ

    if(event.message.text=='通知の設定'){
      message=selectArea()
    }else{
      return Promise.resolve(null)
    }

  }else{
   return Promise.resolve(null)
  }

  return client.replyMessage(event.replyToken, message)
}
