'use strict';
var HOST_URL = 'http://api.wscn.com/v2/';
// 获取节点
var WSCN_URL = 'http://wscn.com/';
// var WSCN_URL = 'http://rebirth.wallstcn.com/';

var ChatroomId;

function _setBaseUrl(url) {
    HOST_URL = url;
}
function _setHostUrl(url) {
    WSCN_URL = url;
}
function _setChatroomId(id) {
    console.log('setId')
    ChatroomId = id;
}
function _getChatroom() {
    return HOST_URL + "chatrooms/" + ChatroomId;
}

function _getComments() {
    return HOST_URL + 'comments?channel=chat&id=' + ChatroomId;
}

function _getRelaticeTopics(page) {
    if(page){
        page=page
    }else{
        page=1
    }
    return HOST_URL + 'chatrooms/' + ChatroomId + '/topics?limit=7&page='+page;
}

function _getRelativeArticles() {
    return HOST_URL + 'chatrooms/' + ChatroomId + '/articles';
}

//参与人数
function _getCount() {
    return HOST_URL + 'chatrooms/' + ChatroomId + '/count';
}


//评论列表
function _getComments() {
    return HOST_URL + 'comments?channel=chat&id='+ChatroomId;
}

//评论
function _replyComment() {
    return WSCN_URL + 'thread/chat_'+ChatroomId+'/comments/save';
}

//登录信息
var User_Login='me';
function _getLoginDetail() {
    return WSCN_URL + User_Login;
}

//stream流媒体
function _getStream() {
    return HOST_URL + 'chatrooms/' + ChatroomId + '/streams';
}

//投票列表
function _getVote() {
    return HOST_URL + 'chatroom/votes?chatroomId=' + ChatroomId;
}

//投票
function _postVote() {
    return HOST_URL + 'chatroom/votes?chatroomId=' + ChatroomId;
}

module.exports = {
    setBaseUrl: _setBaseUrl,
    setHostUrl: _setHostUrl,
    setChatroomId: _setChatroomId,
    getChatroom: _getChatroom,
    getRelativeArticles: _getRelativeArticles,
    getRelaticeTopics: _getRelaticeTopics,
    getComments: _getComments,
    getCount: _getCount,
    replyComment: _replyComment,
    getLoginDetail: _getLoginDetail,
    getStream:_getStream,
    getVote:_getVote
};