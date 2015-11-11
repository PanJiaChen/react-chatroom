'use strict';
var HOST_URI = 'http://api.wscn.com/v2/';
// 获取节点


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

function _getChatroom(){
    return HOST_URI + Chatroom;
}

function _getRelativeArticles() {
    return HOST_URI + Relative_Articles;
}

function _getRelaticeTopics() {
    return HOST_URI + Relative_Topics;
}

function _getComments() {
    return HOST_URI + Get_Comments;
}


function _getCount() {
    return HOST_URI + Get_Count;
}

function _getComment() {
    return HOST_URI + Get_Comment;
}

module.exports = {
    getChatroom:_getChatroom,
    getRelativeArticles: _getRelativeArticles,
    getRelaticeTopics: _getRelaticeTopics,
    getComments: _getComments,
    getCount: _getCount,
    getComment: _getComment
};