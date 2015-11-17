import ReactDom from 'react-dom'
import {Component} from 'react'
import ChatroomContainer from './ChatroomContainer.js'
var Api = require('./js/WebApi/api.js');

import ChatroomDetailStore from './js/store/ChatroomDetail.js'
import {enhanceWithStore} from 'react-zlux'

const chatroomDetailStore = new ChatroomDetailStore();
const ChatroomElement = enhanceWithStore(ChatroomContainer, chatroomDetailStore);

export default class BroadcastApp {
    constructor(options = {}) {
        this.parentDom = options.parentDom
        this.apiBaseUrl = options.apiBaseUrl
        this.minInterval = options || BroadcastApp.minInterval
        this.chatId = options.chatId
    }

    init() {
        Api.setChatroomId(this.chatId);
        Api.setBaseUrl(this.apiBaseUrl)
        this.pageElem = <ChatroomElement chatId={this.chatId} minInterval={this.minInterval}/>
        this.ChatroomElement = ReactDom.render(this.pageElem, this.parentDom)
        return this;
    }
}

BroadcastApp.minInterval = {
    info: 60 * 1000,//basic info的请求，60s轮询一次
    comment: 5 * 1000,//评论，5s
    news: 5 * 1000,//新闻
    topic: 5 * 1000//话题
}

// export
window.BroadcastApp = BroadcastApp;
// setTimeout(function(){
//     require.ensure([],function(){
//         require('./js/async.js')
//     })
// },1000)