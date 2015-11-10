import {BaseStore} from 'zlux'
import utils from '../../../common/utils/utils.js'
var Api = require('../WebApi/api.js');


const urlMap = {
    title: Api.getChatroom(),
    count: Api.getCount()
}

export default class TitleDetailStore extends BaseStore {

    __className = 'TitleDetailStore';

    static ActionTypes = {
        LOAD: 'LOAD',
        LOAD_S: 'LOAD_S',
        LOAD_E: 'LOAD_E'
    };

    state = {
        detail: []
    };


    loadRelativeAjax(payLoad, url) {
        const ats = TitleDetailStore.ActionTypes;
        this.dispatch({type: ats.LOAD});
        var that = this;
        console.log('a')
        utils.ajax({
            url: urlMap[url]
            , dataType: 'jsonp'
            , success: function (resp) {
                console.log(resp)
                that.dispatch({type: ats.LOAD_S, payLoad: resp})
            }
        })
    }

    reduce(action) {
        const type = action.type;
        const payLoad = action.payLoad;
        const ats = TitleDetailStore.ActionTypes;
        switch (type) {
            case ats.LOAD:
                return actionMethods.loadTitle(this.state, payLoad)
            case ats.LOAD_S:
                return actionMethods.loadTitle_s(this.state, payLoad)
            case ats.LOAD_E:
                return actionMethods.loadTitle_e(this.state, payLoad)

            default:
                console.warn(`type:${type} not found: use default`)
                return this.state
        }
    }
}

const actionMethods = {
    loadTitle(state, payLoad){
        if (state.isLoading) {
            return state;
        } else {
            return utils.State.setShallow(state, {
                isLoading: true,
            })
        }
    },
    loadTitle_s(state, payLoad){
        return utils.State.setShallow(state, {
            isLoading: false,
            detail: payLoad
        })
    },
    loadTitle_e(state, payLoad){
        return utils.State.setShallow(state, {
            isLoading: false,
            detail: 'fail'
        })
    }
}

