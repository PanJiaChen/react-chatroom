import {BaseStore} from 'zlux'
import utils from '../../../common/utils/utils.js'
var Api = require('../WebApi/api.js');
//音视频对应的store

const urlMap = {
    getStream: Api.getStream
}

export default class StreamStore extends BaseStore {

    __className = 'StreamStore';

    static ActionTypes = {
        STREAM_LOAD: 'STREAM_LOAD',
        STREAM_LOAD_S: 'STREAM_LOAD_S',
        STREAM_LOAD_E: 'STREAM_LOAD_E'
    };

    state = {
       results:[]
    };

    loadStreamAjax(payLoad) {
        const ats = StreamStore.ActionTypes;
        this.dispatch({type: ats.STREAM_LOAD});
        var that = this;
        utils.ajax({
            url: urlMap['getStream']()
            , dataType: 'jsonp'
            , success: function (resp) {
                that.dispatch({type: ats.STREAM_LOAD_S, payLoad: resp})
            }
        })
    }


    reduce(action) {
        const type = action.type;
        const payLoad = action.payLoad;
        const ats = StreamStore.ActionTypes;
        switch (type) {
            case ats.STREAM_LOAD:
                return actionMethods.loadStream(this.state, payLoad)
            case ats.STREAM_LOAD_S:
                return actionMethods.loadStream_s(this.state, payLoad)
            case ats.STREAM_LOAD_E:
                return actionMethods.loadStream_e(this.state, payLoad)
            default:
                console.warn(`type:${type} not found: use default`)
                return this.state
        }
    }
}

const actionMethods = {
    loadStream(state, payLoad){
        return state;
    },
    loadStream_s(state, payLoad){
        return utils.State.setShallow(state, {
            results: payLoad.results
        })
    },
    loadStream_e(state, payLoad){
        return utils.State.setShallow(state, {
            detail: 'fail'
        })
    }
}