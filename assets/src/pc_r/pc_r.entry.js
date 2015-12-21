import ReactDOM from 'react-dom'
import {Component} from 'react'
import {enhanceWithStore} from 'react-zlux'
var Api = require('./js/WebApi/api.js');

import ChatroomContainer from './ChatroomContainer.js'
import ChatroomDetailStore from './js/store/ChatroomDetail.js'
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
        this.ChatroomElement = ReactDOM.render(this.pageElem, this.parentDom)
        return this;
    }

    _onceLogin(obj){
        //commentStore全局变量
        commentStore.userValidateAjax();
    }
}

BroadcastApp.minInterval = {
        info: 60 * 1000,//basic info的请求，60s轮询一次
        comment: 50 * 1000,//评论
        article: 90 * 1000,//资讯
        topic: 50 * 1000,//话题
        count: 30*1000,//参与人数
        vote: 60*1000//投票
}


// export
window.BroadcastApp = BroadcastApp;

//console
var pan="                     ,            \n               ._  \\/, ,|_            \n               -\\| \\|;|,'_            \n               `_\\|\\|;/-.            \n                `_\\|/._            \n               ,'__   __`.            \n              / /_ | | _\\ \\            \n             / ((o)| |(o)) \\           \n             |  `--/ \\--'  |            \n       ,--.   `.   '-'   ,'               \n      (O..O)    `.uuuuu,'               \n       \\==/     _|nnnnn|_               \n      .'||`. ,-' \\_____/ `-.               \n       _||,-'      | |      `.               \n      (__)  _,-.   ; |   .'.  `               \n      (___)'   |__/___\\__|  \\(__)               \n      (__)     :::::::::::  (___)               \n        ||    :::::::::::::  (__)               \n        ||    :::::::::::::               \n             __|   | | _ |__               \nreact大法好  (_(_(_,' '._)_)_)               \n";
console.log("%c华尔街见闻!","color: #008cff;font-size:32px");
console.log(pan);
