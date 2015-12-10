import {BaseStore} from 'zlux'
import utils from '../../../common/utils/utils.js'
var Api = require('../WebApi/api.js');
import AjaxMgr from '../../../common/utils/ajxaLoop.js'


const urlMap = {
    getCommentsDown: Api.getCommentsDown,
    getCommentsUp:Api.getCommentsUp,
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

        PAGE_LOAD: 'PAGE_LOAD',
        PAGE_LOAD_S: 'PAGE_LOAD_S'
    };

    state = {
        comments: [],
        userDetail:{},
        toLoacateBottom:false,
        firstInit:true,
        hasNewComment:false,
        hasMoreComment:true,
        up_id:undefined,
        down_id:undefined

    };

    loadCommentAjax(payLoad,minInterval,up_id) {
        const ats = CommentStore.ActionTypes;
        this.dispatch({type: ats.COMMENT_LOAD});
        var that = this;
        var _commentAjax=new AjaxMgr({
            url:urlMap["getCommentsUp"](up_id),
            success:function(resp){that.dispatch({type: ats.COMMENT_LOAD_S, payLoad: resp})},
            minInterval:minInterval

        })

       _commentAjax.setLoop(true).request();
       global._commentAjax=_commentAjax;
    }

    //分页
    loadPageAjax(payLoad,down_id) {
        const ats = CommentStore.ActionTypes;
        this.dispatch({type: ats.PAGE_LOAD});
        var that = this;
        utils.ajax({
            url: urlMap["getCommentsDown"](down_id)
            , dataType: 'jsonp'
            , success: function (resp) {
                that.dispatch({type: ats.PAGE_LOAD_S, payLoad: resp})
            }
        })
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
            case ats.PAGE_LOAD:
                return actionMethods.loadPage(this.state, payLoad)
            case ats.PAGE_LOAD_S:
                return actionMethods.loadPage_s(this.state, payLoad)
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
        //判断是不是初次拿到数据
        if(state.firstInit){
            state.toLoacateBottom=true;
            state.firstInit=false;
            state.down_id=payLoad.comments[payLoad.comments.length-1].id;
            state.up_id=payLoad.comments[0].id;
            payLoad.comments.forEach(item=>{
                    state.comments.unshift(item)
            })

            const url=urlMap["getCommentsUp"](state.up_id)
            _commentAjax.setUrl(url);
             utils.hideLoading();
            return utils.State.setShallow(state,{
                    comments:state.comments
            })
        }else{
            state.toLoacateBottom=false;
            //判断有没有新数据
            if(payLoad.comments.length>0){
                state.hasNewComment=true;
                state.up_id=payLoad.comments[0].id;
                payLoad.comments.forEach(item=>{
                    state.comments.push(item)
                })
                const url=urlMap["getCommentsUp"](state.up_id)
                _commentAjax.setUrl(url)
                return utils.State.setShallow(state,{
                    isLoading:false,
                    comments:state.comments
                })
            }else{
                state.hasNewComment=false;
                return utils.State.setShallow(state,{
                    comments:state.comments
            })
            }
        }

        
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
       state.comments.push(payLoad.comments[0])
       state.up_id=payLoad.comments[0].id
       return utils.State.setShallow(state,{
            isLoading:false,
            comments:state.comments
        })
    },

    //分页
    loadPage(state, payLoad){
        if (state.isLoading) {
            return state;
        } else {
            return utils.State.setShallow(state, {
                isLoading: true,
            })
        }
    },
    loadPage_s(state, payLoad){
        payLoad.comments.map(item=>{
            state.comments.unshift(item)
        })
        
        if(payLoad.comments.length==0){
            return utils.State.setShallow(state, {
                hasMoreComment:false
            })
        }
        state.down_id=payLoad.comments[payLoad.comments.length-1].id;
        state.toLoacateBottom=false;

        return utils.State.setShallow(state, {
            isLoading: false,
            comments:state.comments
        })
       
        
    },
}

