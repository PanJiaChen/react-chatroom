'use strict';
var HOST_URL = 'http://api.wscn.com/v2/';
// 获取节点
var WSCN_URL = 'http://wscn.com/';
var ChatroomId;


//参与人数
var Get_Count = 'chatrooms/'+ChatroomId+'/count';


//登录信息
var User_Login='me';

function _setBaseUrl(url){
    HOST_URL=url;
}

function _setChatroomId(id){
    console.log('setId')
    ChatroomId=id;
}
function _getChatroom(){
    return HOST_URL + "chatrooms/"+ChatroomId;;
}

function _getComments() {
    console.log("ChatroomId"+ChatroomId)
    return HOST_URL + 'comments?channel=chat&id='+63;
}

function _getRelaticeTopics() {
    return HOST_URL + 'chatrooms/'+63+'/topics?';
}

function _getRelativeArticles() {
    return HOST_URL + 'chatrooms/'+63+'/articles';
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
    setBaseUrl:_setBaseUrl,
    setChatroomId:_setChatroomId,
    getChatroom:_getChatroom,
    getRelativeArticles: _getRelativeArticles,
    getRelaticeTopics: _getRelaticeTopics,
    getComments: _getComments,
    getCount: _getCount,
    replyComment: _replyComment,
    getLoginDetail:_getLoginDetail

};