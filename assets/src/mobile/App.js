import React from 'react'
import Page from './js/Page.jsx'
// import $ from 'jquery'

import './less/broadcast.less'

export default class BroadcastApp{
    constructor(options={}){
        this.parentDom = options.parentDom
        this.apiBaseUrl = options.apiBaseUrl
        this.minInterval = options || BroadcastApp.minInterval
        this.apiUrls= {}
        this.chatId = options.chatId
       
        this.apiUrls.infoUrl=this.apiBaseUrl+BroadcastApp.urls.infoUrl+this.chatId;
        this.apiUrls.newsUrl=this.apiBaseUrl+BroadcastApp.urls.infoUrl+this.chatId+BroadcastApp.urls.newsUrl;
        this.apiUrls.topicUrl=this.apiBaseUrl+BroadcastApp.urls.infoUrl+this.chatId+BroadcastApp.urls.topicUrl;
        this.apiUrls.commentUrl=this.apiBaseUrl+BroadcastApp.urls.commentUrl+this.chatId;
        // this.apiUrls.voteUrl="http://api.wallstcn.com/v2/chatroom/votes?channel=chatroom&channelId=1&";
    }

    init(){
        var apiUrls = this.apiUrls;
        this.pageElem = <Page infoUrl={apiUrls.infoUrl}
                             newsUrl={apiUrls.newsUrl}
                             topicUrl={apiUrls.topicUrl}
                             commentUrl={apiUrls.commentUrl}
                             minInterval={this.minInterval}/>

        this.Page = React.render(this.pageElem,this.parentDom)
        return this;
    }

    getPage (){
        return this.Page;
    }

    _setEditorChat(obj){
        var originEditorChat = this.Page.state.editorChat;
        $.extend(originEditorChat,obj)
        this.Page.setState({editorChat:originEditorChat})
    }

    _setLoop(loop){
        this.Page.setState({isLoop:loop})
    }
}

BroadcastApp.minInterval={
    info:60*1000,//basic info的请求，60s轮询一次
    comment:5*1000,//评论，5s
    news:5*1000,//新闻
    topic:5*1000//话题
}

BroadcastApp.urls = {
    infoUrl:'/v2/chatrooms/',
    newsUrl: '/articles?limit=1&page=1',
    topicUrl:'/topics?limit=1&page=1',
    commentUrl:'/v2/comments?channel=chat&id='
    //livenewsUrl:'/v2/livenews?limit=20&page=1'
}






