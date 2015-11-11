import {BaseStore} from 'zlux'
import utils from '../../../common/utils/utils.js'
var Api = require('../WebApi/api.js');


const urlMap = {
    comment: Api.getComment()
}

export default class GetCommentStore extends BaseStore {

    __className = 'TitleDetailStore';

    static ActionTypes = {
        COMMENT_LOAD: 'COMMENT_LOAD',
        COMMENT_LOAD_S: 'COMMENT_LOAD_S',
        COMMENT_LOAD_E: 'COMMENT_LOAD_E'
    };

    state = {
        comments: [{
            text: "正在努力加载中!",
            createdAt: "",
            user: {
                username: "用户",
                avatar: "http://avatar.cdn.wallstcn.com/60/6c/b4/loading8.gif!wscn.avatar.xs"
            }
        }]
    };


    loadCommentAjax(payLoad) {
        const ats = GetCommentStore.ActionTypes;
        this.dispatch({type: ats.COMMENT_LOAD});
        var that = this;
        utils.ajax({
            url: urlMap['comment']
            , dataType: 'jsonp'
            , success: function (resp) {
                console.log(resp)
                that.dispatch({type: ats.COMMENT_LOAD_S, payLoad: resp})
            }
        })
    }

    reduce(action) {
        const type = action.type;
        const payLoad = action.payLoad;
        const ats = GetCommentStore.ActionTypes;
        switch (type) {
            case ats.COMMENT_LOAD:
                return actionMethods.loadComment(this.state, payLoad)
            case ats.COMMENT_LOAD_S:
                return actionMethods.loadComment_s(this.state, payLoad)
            case ats.COMMENT_LOAD_E:
                return actionMethods.loadComment_e(this.state, payLoad)
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
            state.comments.push(item)
        })
        return utils.State.setShallow(state,{
            isLoading:false,
            comments:state.comments
        })
    },
    loadComment_e(state, payLoad){
        return utils.State.setShallow(state, {
            isLoading: false,
            detail: 'fail'
        })
    }
}

