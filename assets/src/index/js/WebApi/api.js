'use strict';
var HOST_URI = 'http://api.wallstreetcn.com/v2/'
// 获取节点


 // 直播区
var Relative_Articles ='chatrooms/12/articles';
 
 //话题区
 var Relative_Topics='chatrooms/12/topics?'

 //评论
 var Get_Comments='comments?channel=chat&id=12'



function _getRelativeArticles(){
	return HOST_URI+Relative_Articles;
}

function _getRelaticeTopics(){
	return HOST_URI+Relative_Topics;
}

function _getComments(){
	return HOST_URI+Get_Comments;
}


module.exports = {
	getRelativeArticles:_getRelativeArticles,
	getRelaticeTopics:_getRelaticeTopics,
	getComments:_getComments
};