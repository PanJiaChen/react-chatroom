import {BaseStore} from 'zlux'
import utils from '../../../common/utils/utils.js'
var Api = require('../WebApi/api.js');


const urlMap = {
    topic: Api.getRelaticeTopics(),
}

export default class TopicStore extends BaseStore {

    __className = 'TitleDetailStore';

    static ActionTypes = {
        TOPIC_LOAD: 'TOPIC_LOAD',
        TOPIC_LOAD_S: 'TOPIC_LOAD_S',
        TOPIC_LOAD_E: 'TOPIC_LOAD_E',
    };

    state = {
        detail:[{
            text:"正在努力加载中!",
            createdAt:"",
            user:{
                username:"小编",
                avatar:"http://avatar.cdn.wallstcn.com/60/6c/b4/loading8.gif!wscn.avatar.xs"
            }
        }]
    };

    loadTopicAjax(payLoad) {
        const ats = TopicStore.ActionTypes;
        this.dispatch({type: ats.TOPIC_LOAD});
        var that = this;
        utils.ajax({
            url: urlMap["topic"]
            , dataType: 'jsonp'
            , success: function (resp) {
                that.dispatch({type: ats.TOPIC_LOAD_S, payLoad: resp})
            }
        })
    }


    reduce(action) {
        const type = action.type;
        const payLoad = action.payLoad;
        const ats = TopicStore.ActionTypes;
        switch (type) {
            case ats.TOPIC_LOAD:
                return actionMethods.loadTopic(this.state, payLoad)
            case ats.TOPIC_LOAD_S:
                return actionMethods.loadTopic_s(this.state, payLoad)
            case ats.TOPIC_LOAD_E:
                return actionMethods.loadTopic_e(this.state, payLoad)
            default:
                console.warn(`type:${type} not found: use default`)
                return this.state
        }
    }
}

const actionMethods = {
    loadTopic(state, payLoad){
        if (state.isLoading) {
            return state;
        } else {
            return utils.State.setShallow(state, {
                isLoading: true,
            })
        }
    },
    loadTopic_s(state, payLoad){
        state.detail=[];
        return utils.State.setShallow(state, {
            isLoading: false,
            detail: payLoad.results
        })
    },
    loadTopic_e(state, payLoad){
        return utils.State.setShallow(state, {
            isLoading: false,
            detail: 'fail'
        })
    }
}
