'use strict';
var HOST_URL = 'http://api.wscn.com/v2/';
// 获取节点
var WSCN_URL = 'http://wscn.com/';

var ChatroomId='63';

var Chatroom="/chatrooms/"+ChatroomId;

// 直播区
var Relative_Articles = 'chatrooms/'+ChatroomId+'/articles';

//话题区
var Relative_Topics = 'chatrooms/'+ChatroomId+'/topics?';

//评论
var Get_Comments = 'comments?channel=chat&id='+ChatroomId;

//参与人数
var Get_Count = 'chatrooms/'+ChatroomId+'/count';

//评论列表
var Get_Comment = 'comments?channel=chat&id='+ChatroomId;

//评论
var Reply_Comment='thread/chat_'+ChatroomId+'/comments/save';

//登录信息
var User_Login='me';

function _getChatroom(){
    return HOST_URL + Chatroom;
}

function _getRelativeArticles() {
    return HOST_URL + Relative_Articles;
}

function _getRelaticeTopics() {
    return HOST_URL + Relative_Topics;
}

function _getComments() {
    return HOST_URL + Get_Comments;
}


function _getCount() {
    return HOST_URL + Get_Count;
}

function _getComment() {
    return HOST_URL + Get_Comment;
}

function _replyComment() {
    return WSCN_URL + Reply_Comment;
}

function _getLoginDetail() {
    return WSCN_URL + User_Login;
}

module.exports = {
    getChatroom:_getChatroom,
    getRelativeArticles: _getRelativeArticles,
    getRelaticeTopics: _getRelaticeTopics,
    getComments: _getComments,
    getCount: _getCount,
    getComment: _getComment,
    replyComment: _replyComment,
    getLoginDetail:_getLoginDetail

};