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
        this.hostUrl = options.hostUrl
        this.minInterval = options.minInterval || BroadcastApp.minInterval
        this.chatId = options.chatId
    }

    init() {
        Api.setChatroomId(this.chatId);
        Api.setBaseUrl(this.apiBaseUrl);
        Api.setHostUrl(this.hostUrl)
        this.pageElem = <ChatroomElement chatId={this.chatId} minInterval={this.minInterval}/>
        this.ChatroomElement = ReactDom.render(this.pageElem, this.parentDom)
        return this;
    }

    _onceLogin(obj){
        commentStore.userValidateAjax();
    }
}

BroadcastApp.minInterval = {
        info: 60 * 1000,//basic info的请求，60s轮询一次
        comment: 50 * 1000,//评论，5s
        article: 90 * 1000,//资讯
        topic: 50 * 1000,//话题
        count: 30*1000,//参与人数
        vote: 60*1000//投票
}

// export
window.BroadcastApp = BroadcastApp;
