'use strict';
var HOST_URI = 'http://api.wscn.com/v2/'
// 获取节点


// 直播区
var Relative_Articles = 'chatrooms/63/articles';

//话题区
var Relative_Topics = 'chatrooms/63/topics?'

//评论
var Get_Comments = 'comments?channel=chat&id=63'

//参与人数
var Get_Count = 'chatrooms/63/count'

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

module.exports = {
    getRelativeArticles: _getRelativeArticles,
    getRelaticeTopics: _getRelaticeTopics,
    getComments: _getComments,
    getCount: _getCount()
};