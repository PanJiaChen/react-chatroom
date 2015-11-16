import ReactDom from 'react-dom'
import {Component} from 'react'
import ChatroomContainer from './App.js'
var Api = require('./js/WebApi/api.js');

export default class BroadcastApp{
    constructor(options={}){
        this.parentDom = options.parentDom
        this.apiBaseUrl = options.apiBaseUrl
        this.minInterval = options || BroadcastApp.minInterval
        this.chatId = options.chatId
    }

    init(){
        Api.setChatroomId(this.chatId);
        Api.setBaseUrl(this.apiBaseUrl)
        this.pageElem = <ChatroomContainer chatId={this.chatId} minInterval={this.minInterval}/>
        this.ChatroomContainer = ReactDom.render(this.pageElem,this.parentDom)
        return this;
    }
}

BroadcastApp.minInterval={
    info:60*1000,//basic info的请求，60s轮询一次
    comment:5*1000,//评论，5s
    news:5*1000,//新闻
    topic:5*1000//话题
}

// export
window.BroadcastApp= BroadcastApp;
// setTimeout(function(){
//     require.ensure([],function(){
//         require('./js/async.js')
//     })
// },1000)