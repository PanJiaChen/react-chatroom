import {BaseStore} from 'zlux'
import utils from '../../../common/utils/utils.js'
var Api = require('../WebApi/api.js');
import AjaxMgr from '../../../common/utils/ajxaLoop.js'


const urlMap = {
    getVote: Api.getVote,
    postVote:Api.postVote
}

export default class VoteStore extends BaseStore {

    __className = 'VoteStore';

    static ActionTypes = {
        VOTE_LOAD: 'VOTE_LOAD',
        VOTE_LOAD_S: 'VOTE_LOAD_S',
        VOTE_LOAD_E: 'VOTE_LOAD_E',

        VOTE_POST: 'VOTE_POST',
        VOTE_POST_S: 'VOTE_POST_S',
        VOTE_POST_E: 'VOTE_POST_E',

        GET_NEW_VOTE: 'GET_NEW_VOTE',
        GET_NEW_VOTE_S: 'GET_NEW_VOTE_S',
    };

    state = {
        voteList:[],
    };

    loadVoteAjax(payLoad,minInterval) {
        const ats = VoteStore.ActionTypes;
        this.dispatch({type: ats.VOTE_LOAD});
        var that = this;
        const voteAjax=new AjaxMgr({
            url:urlMap["getVote"](),
            success:function(resp){that.dispatch({type: ats.VOTE_LOAD_S, payLoad: resp})},
            minInterval:minInterval
        })
        voteAjax.setLoop(true).setDataType('json').setCors(true).request();
    }

    postVote(voteId,optionId) {
        const ats = VoteStore.ActionTypes;
        this.dispatch({type: ats.VOTE_POST});
        var that = this;
        utils.ajax({
            url: urlMap['postVote']()
            , method:'post'
            , data:{'voteId':voteId,'optionId':optionId}
            , withCredentials: true
            , crossDomain: true
            , success: function (resp) {
                that.getNewVoteAjax(that)
            }
        })
    }

    getNewVoteAjax(_this) {
        const ats = VoteStore.ActionTypes;
        _this.dispatch({type: ats.GET_NEW_VOTE});
        var that=_this;
        utils.ajax({
            url: urlMap['getVote']()
            , dataType: 'json'
            , withCredentials: true
            , crossDomain: true
            , success: function (resp) {
                that.dispatch({type: ats.GET_NEW_VOTE_S, payLoad: resp})
            }
        })
    }

    reduce(action) {
        const type = action.type;
        const payLoad = action.payLoad;
        const ats = VoteStore.ActionTypes;
        switch (type) {
            case ats.VOTE_LOAD:
                return actionMethods.loadVote(this.state, payLoad)
            case ats.VOTE_LOAD_S:
                return actionMethods.loadVote_s(this.state, payLoad)
            case ats.VOTE_LOAD_E:
                return actionMethods.loadVote_e(this.state, payLoad)
            case ats.VOTE_POST:
                return actionMethods.votePost(this.state, payLoad)
            case ats.VOTE_POST_S:
                return actionMethods.votePost_s(this.state, payLoad)
            case ats.VOTE_POST_E:
                return actionMethods.votePost_e(this.state, payLoad)
            case ats.GET_NEW_VOTE:
                return actionMethods.getNewVote(this.state, payLoad)
            case ats.GET_NEW_VOTE_S:
                return actionMethods.getNewVote_s(this.state, payLoad)
            default:
                console.warn(`type:${type} not found: use default`)
                return this.state
        }
    }
}

const actionMethods = {
    loadVote(state, payLoad){
        if (state.isLoading) {
            return state;
        } else {
            return utils.State.setShallow(state, {
                isLoading: true,
            })
        }
    },
    loadVote_s(state, payLoad){
        return utils.State.setShallow(state, {
            isLoading: false,
            voteList: payLoad.results,
        })
    },
    loadVote_e(state, payLoad){
        return utils.State.setShallow(state, {
            isLoading: false,
            detail: 'fail'
        })
    },
    votePost(state, payLoad){
        if (state.isLoading) {
            return state;
        } else {
            return utils.State.setShallow(state, {
                isLoading: true,
            })
        }
    },
    votePost_s(state, payLoad){
        console.log(payLoad)
        return utils.State.setShallow(state, {
            isLoading: false,
        })
    },
    getNewVote(state, payLoad){
        return utils.State.setShallow(state,{
            isLoading:false,
        })
    },
    getNewVote_s(state, payLoad){
       return utils.State.setShallow(state,{
            isLoading:false,
            voteList: payLoad.results,
        })
    }
}

