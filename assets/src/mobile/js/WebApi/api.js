'use strict';
var HOST_URL = 'http://api.wscn.com/v2/';
// 获取节点
var WSCN_URL = 'http://wscn.com/';
var ChatroomId;


//参与人数
var Get_Count = 'chatrooms/' + ChatroomId + '/count';


//登录信息
var User_Login = 'me';

function _setBaseUrl(url) {
    HOST_URL = url;
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

function _getRelaticeTopics() {
    return HOST_URL + 'chatrooms/' + ChatroomId + '/topics?';
}

function _getRelativeArticles() {
    return HOST_URL + 'chatrooms/' + ChatroomId + '/articles';
}


function _getCount() {
    return HOST_URL + Get_Count;
}


function _replyComment() {
    return WSCN_URL + Reply_Comment;
}

function _getLoginDetail() {
    return WSCN_URL + User_Login;
}


module.exports = {
    setBaseUrl: _setBaseUrl,
    setChatroomId: _setChatroomId,
    getChatroom: _getChatroom,
    getRelativeArticles: _getRelativeArticles,
    getRelaticeTopics: _getRelaticeTopics,
    getComments: _getComments,
    getCount: _getCount,
    replyComment: _replyComment,
    getLoginDetail: _getLoginDetail

};