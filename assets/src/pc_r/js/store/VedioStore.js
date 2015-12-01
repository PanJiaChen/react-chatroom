import {BaseStore} from 'zlux'
import utils from '../../../common/utils/utils.js'
var Api = require('../WebApi/api.js');


const urlMap = {
    getTitle: Api.getVedio
}

export default class VedioStore extends BaseStore {

    __className = 'TitleDetailStore';

    static ActionTypes = {
        VEDIO_LOAD: 'VEDIO_LOAD',
        VEDIO_LOAD_S: 'VEDIO_LOAD_S',
        VEDIO_LOAD_E: 'VEDIO_LOAD_E'
    };

    state = {
       
    };




    loadVedioAjax(payLoad) {
        const ats = Vedio.ActionTypes;
        this.dispatch({type: ats.VEDIO_LOAD});
        var that = this;
        utils.ajax({
            url: urlMap['getTitle']()
            , dataType: 'jsonp'
            , success: function (resp) {
                that.dispatch({type: ats.VEDIO_LOAD_S, payLoad: resp})
            }
        })
    }


    reduce(action) {
        const type = action.type;
        const payLoad = action.payLoad;
        const ats = VedioStore.ActionTypes;
        switch (type) {
            case ats.VEDIO_LOAD:
                return actionMethods.loadVedio(this.state, payLoad)
            case ats.VEDIO_LOAD_S:
                return actionMethods.loadVedio_s(this.state, payLoad)
            case ats.VEDIO_LOAD_E:
                return actionMethods.loadVedio_e(this.state, payLoad)
            default:
                console.warn(`type:${type} not found: use default`)
                return this.state
        }
    }
}

const actionMethods = {
    loadVedio(state, payLoad){
        if (state.isLoading) {
            return state;
        } else {
            return utils.State.setShallow(state, {
                isLoading: true,
            })
        }
    },
    loadVedio_s(state, payLoad){
        return utils.State.setShallow(state, {
            isLoading: false,
            Vedio: payLoad
        })
    },
    loadVedio_e(state, payLoad){
        return utils.State.setShallow(state, {
            isLoading: false,
            detail: 'fail'
        })
    }
}

