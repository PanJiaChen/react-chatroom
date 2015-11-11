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
        TITLE_LOAD: 'TITLE_LOAD',
        TITLE_LOAD_S: 'TITLE_LOAD_S',
        TITLE_LOAD_E: 'TITLE_LOAD_E',

        COUNT_LOAD: 'COUNT_LOAD',
        COUNT_LOAD_S: 'COUNT_LOAD_S',
        COUNT_LOAD_E: 'COUNT_LOAD_E'
    };

    state = {
        title:'',
        count:''
    };




    loadTitleAjax(payLoad) {
        const ats = TitleDetailStore.ActionTypes;
        this.dispatch({type: ats.TITLE_LOAD});
        var that = this;
        utils.ajax({
            url: urlMap["title"]
            , dataType: 'jsonp'
            , success: function (resp) {
                console.log(resp)
                that.dispatch({type: ats.TITLE_LOAD_S, payLoad: resp})
            }
        })
    }

    loadCountAjax(payLoad) {
        const ats = TitleDetailStore.ActionTypes;
        this.dispatch({type: ats.COUNT_LOAD});
        var that = this;
        console.log('c')
        utils.ajax({
            url: urlMap["count"]
            , dataType: 'jsonp'
            , success: function (resp) {
                console.log(resp)
                that.dispatch({type: ats.COUNT_LOAD_S, payLoad: resp})
            }
        })
    }

    reduce(action) {
        const type = action.type;
        const payLoad = action.payLoad;
        const ats = TitleDetailStore.ActionTypes;
        switch (type) {
            case ats.TITLE_LOAD:
                return actionMethods.loadTitle(this.state, payLoad)
            case ats.TITLE_LOAD_S:
                return actionMethods.loadTitle_s(this.state, payLoad)
            case ats.TITLE_LOAD_E:
                return actionMethods.loadTitle_e(this.state, payLoad)
            case ats.COUNT_LOAD:
                return actionMethods.loadCount(this.state, payLoad)
            case ats.COUNT_LOAD_S:
                return actionMethods.loadCount_s(this.state, payLoad)
            case ats.COUNT_LOAD_E:
                return actionMethods.loadCount_e(this.state, payLoad)

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
            title: payLoad
        })
    },
    loadTitle_e(state, payLoad){
        return utils.State.setShallow(state, {
            isLoading: false,
            detail: 'fail'
        })
    },

    loadCount(state, payLoad){
        if (state.isLoading) {
            return state;
        } else {
            return utils.State.setShallow(state, {
                isLoading: true,
            })
        }
    },
    loadCount_s(state, payLoad){
        return utils.State.setShallow(state, {
            isLoading: false,
            title:state.title,
            count: payLoad
        })
    },
    loadCount_e(state, payLoad){
        return utils.State.setShallow(state, {
            isLoading: false,
            detail: 'fail'
        })
    }
}

