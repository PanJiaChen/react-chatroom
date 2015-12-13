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
    ChatroomId = id;
}
function _getChatroom() {
    return HOST_URL + "chatrooms/" + ChatroomId;
}

//话题
function _getRelaticeTopics(page) {
    page==undefined?page=1:page=page;
    return HOST_URL + 'chatrooms/' + ChatroomId + '/topics?limit=20&page='+page;
}

//资讯
function _getRelativeArticles(page) {
    page==undefined?page=1:page=page;
    return HOST_URL + 'chatrooms/' + ChatroomId + '/articles?limit=20&page='+page;
}

//参与人数
function _getCount() {
    return HOST_URL + 'chatrooms/' + ChatroomId + '/count';
}

//评论列表 down_id
function _getCommentsDown(down_id) {
    return HOST_URL + 'comments?channel=chat&id='+ChatroomId+'&count=25&down_id='+down_id;
}

//评论列表 up_id
function _getCommentsUp(up_id) {
    return HOST_URL + 'comments?channel=chat&id='+ChatroomId+'&count=25&up_id='+up_id;
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
    return WSCN_URL + 'chatroom/votes?chatroomId=' + ChatroomId;
}

//投票
function _postVote() {
    return WSCN_URL + 'chatroom/votes?chatroomId=' + ChatroomId;
}

module.exports = {
    setBaseUrl: _setBaseUrl,
    setHostUrl: _setHostUrl,
    setChatroomId: _setChatroomId,
    getChatroom: _getChatroom,
    getRelativeArticles: _getRelativeArticles,
    getRelaticeTopics: _getRelaticeTopics,
    getCommentsDown: _getCommentsDown,
    getCommentsUp: _getCommentsUp,
    getCount: _getCount,
    replyComment: _replyComment,
    getLoginDetail: _getLoginDetail,
    getStream:_getStream,
    getVote:_getVote,
    postVote:_postVote
};