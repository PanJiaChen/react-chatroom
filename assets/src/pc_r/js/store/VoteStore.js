import {BaseStore} from 'zlux'
import utils from '../../../common/utils/utils.js'
var Api = require('../WebApi/api.js');
import AjaxMgr from '../../../common/utils/ajxaLoop.js'


const urlMap = {
    getVote: Api.getVote
}

export default class VoteStore extends BaseStore {

    __className = 'VoteStore';

    static ActionTypes = {
        VOTE_LOAD: 'VOTE_LOAD',
        VOTE_LOAD_S: 'VOTE_LOAD_S',
        VOTE_LOAD_E: 'VOTE_LOAD_E',
    };

    state = {
        voteList:[]
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
        voteAjax.setLoop(true).request();
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
            voteList: payLoad.results
        })
    },
    loadVote_e(state, payLoad){
        return utils.State.setShallow(state, {
            isLoading: false,
            detail: 'fail'
        })
    }
}

