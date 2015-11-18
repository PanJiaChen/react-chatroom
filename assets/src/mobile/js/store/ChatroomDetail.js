import {BaseStore} from 'zlux'
import utils from '../../../common/utils/utils.js'
var Api = require('../WebApi/api.js');


const urlMap = {
    detail: Api.getChatroom
}

export default class ChatroomDetailStore extends BaseStore {

    __className = 'ChatroomDetailStore';

    static ActionTypes = {
        CHATROOM_LOAD: 'CHATROOM_LOAD',
        CHATROOM_LOAD_S: 'CHATROOM_LOAD_S',
    };

    state = {
        detail: {},
    };

    loadChatroomAjax(payLoad) {
        console.log('banan' + Api.getChatroom())
        const ats = ChatroomDetailStore.ActionTypes;
        this.dispatch({type: ats.CHATROOM_LOAD});
        var that = this;
        utils.ajax({
            url: Api.getChatroom()
            , dataType: 'jsonp'
            , success: function (resp) {
                that.dispatch({type: ats.CHATROOM_LOAD_S, payLoad: resp})
            }
        })
    }


    reduce(action) {
        const type = action.type;
        const payLoad = action.payLoad;
        const ats = ChatroomDetailStore.ActionTypes;
        switch (type) {
            case ats.CHATROOM_LOAD:
                return actionMethods.loadChatroom(this.state, payLoad)
            case ats.CHATROOM_LOAD_S:
                return actionMethods.loadChatroom_s(this.state, payLoad)

            default:
                console.warn(`type:${type} not found: use default`)
                return this.state
        }
    }
}

const actionMethods = {
    loadChatroom(state, payLoad){
        if (state.isLoading) {
            return state;
        } else {
            return utils.State.setShallow(state, {
                isLoading: true,
            })
        }
    },
    loadChatroom_s(state, payLoad){
        return utils.State.setShallow(state, {
            isLoading: false,
            detail: payLoad
        })
    }
}

