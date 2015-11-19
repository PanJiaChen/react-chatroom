import {BaseStore} from 'zlux'
import utils from '../../../common/utils/utils.js'
var Api = require('../WebApi/api.js');
import AjaxMgr from '../../../common/utils/ajxaLoop.js'

const urlMap = {
    getComments: Api.getComments
}

export default class DiscussStore extends BaseStore {

    __className = 'DiscussStore';

    static ActionTypes = {
        COMMENT_LOAD: 'COMMENT_LOAD',
        COMMENT_LOAD_S: 'COMMENT_LOAD_S',
        COMMENT_LOAD_E: 'COMMENT_LOAD_E'
    };

    state = {
        comments: []
    };


    loadCommentAjax(payLoad,minInterval) {
        const ats = DiscussStore.ActionTypes;
        this.dispatch({type: ats.COMMENT_LOAD});
        const that = this;
        const commentAjax=new AjaxMgr({
            url:urlMap["getComments"](),
            success:function(resp){that.dispatch({type: ats.COMMENT_LOAD_S, payLoad: resp})},
            minInterval:minInterval

        })
       commentAjax.setLoop(true).request();
    }


    reduce(action) {
        const type = action.type;
        const payLoad = action.payLoad;
        const ats = DiscussStore.ActionTypes;
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
        state.comments = [];
        payLoad.comments.forEach(item=> {
            state.comments.push(item)
        })
        return utils.State.setShallow(state, {
            isLoading: false,
            comments: state.comments
        })
    },
    loadComment_e(state, payLoad){
        return utils.State.setShallow(state, {
            isLoading: false,
            detail: 'fail'
        })
    }
}

