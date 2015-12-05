import {BaseStore} from 'zlux'
import utils from '../../../common/utils/utils.js'
var Api = require('../WebApi/api.js');
import AjaxMgr from '../../../common/utils/ajxaLoop.js'


const urlMap = {
    getComments: Api.getComments,
    getLoginDetail:Api.getLoginDetail,
    replyComment:Api.replyComment
}

export default class CommentStore extends BaseStore {

    __className = 'CommentStore';

    static ActionTypes = {
        COMMENT_LOAD: 'COMMENT_LOAD',
        COMMENT_LOAD_S: 'COMMENT_LOAD_S',
        COMMENT_LOAD_E: 'COMMENT_LOAD_E',

        COMMENT_REPLY: 'COMMENT_REPLY',
        COMMENT_REPLY_S: 'COMMENT_REPLY_S',

        USER_DETAIL: 'USER_DETAIL',
        USER_DETAIL_S: 'USER_DETAIL_S',

        GET_NEW_COMMENT: 'GET_NEW_COMMENT',
        GET_NEW_COMMENT_S: 'GET_NEW_COMMENT_S',
    };

    state = {
        comments: [[]],
        userDetail:{},
        toLoacateBottom:false

    };

    loadCommentAjax(payLoad,minInterval) {
        const ats = CommentStore.ActionTypes;
        this.dispatch({type: ats.COMMENT_LOAD});
        var that = this;
        const commentAjax=new AjaxMgr({
            url:urlMap["getComments"](),
            success:function(resp){that.dispatch({type: ats.COMMENT_LOAD_S, payLoad: resp})},
            minInterval:minInterval

        })
       commentAjax.setLoop(true).request();
    }

    userValidateAjax(payLoad) {
        const ats = CommentStore.ActionTypes;
        this.dispatch({type: ats.USER_DETAIL});
        var that = this;
        utils.ajax({
            url: urlMap['getLoginDetail']()
            , dataType: 'jsonp'
            , success: function (resp) {
                that.dispatch({type: ats.USER_DETAIL_S, payLoad: resp})
            }
        })
    }

    replyCommentAjax(payLoad,val) {
        const ats = CommentStore.ActionTypes;
        this.dispatch({type: ats.COMMENT_REPLY});
        var that = this;
        utils.ajax({
            url: urlMap['replyComment']()
            , method:'post'
            , data:{content:val}
            , withCredentials: true
            , crossDomain: true
            , success: function (resp) {
                that.getNewCommentAjax(that)
            }
        })
    }

   getNewCommentAjax(_this) {
        const ats = CommentStore.ActionTypes;
        _this.dispatch({type: ats.GET_NEW_COMMENT});
        var that=_this;
        utils.ajax({
            url: urlMap['getComments']()
            , dataType: 'jsonp'
            , success: function (resp) {
                that.dispatch({type: ats.GET_NEW_COMMENT_S, payLoad: resp})
            }
        })
    }

    reduce(action) {
        const type = action.type;
        const payLoad = action.payLoad;
        const ats = CommentStore.ActionTypes;
        switch (type) {
            case ats.COMMENT_LOAD:
                return actionMethods.loadComment(this.state, payLoad)
            case ats.COMMENT_LOAD_S:
                return actionMethods.loadComment_s(this.state, payLoad)
            case ats.COMMENT_LOAD_E:
                return actionMethods.loadComment_e(this.state, payLoad)
            case ats.COMMENT_REPLY:
                return actionMethods.replyComment(this.state, payLoad)
            case ats.COMMENT_REPLY_S:
                return actionMethods.replyComment_s(this.state, payLoad)
            case ats.USER_DETAIL:
                return actionMethods.getLoginDetail(this.state, payLoad)
            case ats.USER_DETAIL_S:
                return actionMethods.getLoginDetail_s(this.state, payLoad)
            case ats.GET_NEW_COMMENT:
                return actionMethods.getNewComment(this.state, payLoad)
            case ats.GET_NEW_COMMENT_S:
                return actionMethods.getNewComment_s(this.state, payLoad)
            default:
                console.warn(`type:${type} not found: use default`)
                return this.state
        }
    }
}

const actionMethods = {
    loadComment(state, payLoad){
        if (state.isLoading) {
            return state;
        } else {
            return utils.State.setShallow(state, {
                isLoading: true,
            })
        }
    },
    loadComment_s(state, payLoad){
        state.comments=[];
        payLoad.comments.forEach(item=>{
            state.comments.unshift(item)
        })

        return utils.State.setShallow(state,{
            isLoading:false,
            comments:state.comments,
            toLoacateBottom:true
        })
    },
    loadComment_e(state, payLoad){
        return utils.State.setShallow(state, {
            isLoading: false,
            detail: 'fail'
        })
    },
    getLoginDetail(state, payLoad){
        return utils.State.setShallow(state,{
            isLoading:false,
            
        })
    },
    getLoginDetail_s(state, payLoad){
        return utils.State.setShallow(state, {
            isLoading: false,
            userDetail:payLoad
        })
    },
    replyComment(state, payLoad){
        return utils.State.setShallow(state,{
            isLoading:false,
            
        })
    },
    replyComment_s(state, that){
       // that.getNewCommentAjax('false')
    },
    getNewComment(state, payLoad){
        return utils.State.setShallow(state,{
            isLoading:false,
        })
    },
    getNewComment_s(state, payLoad){
       console.log(payLoad)
       state.comments.push(payLoad.comments[0])
       console.log(state.comments)
       return utils.State.setShallow(state,{
            isLoading:false,
            comments:state.comments,
            toLoacateBottom:true
        })
    }
}

