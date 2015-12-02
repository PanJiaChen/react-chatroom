import {BaseStore} from 'zlux'
import utils from '../../../common/utils/utils.js'
var Api = require('../WebApi/api.js');
import AjaxMgr from '../../../common/utils/ajxaLoop.js'

const urlMap = {
    getTopics: Api.getRelaticeTopics,
}

export default class TopicStore extends BaseStore {

    __className = 'TopicStore';

    static ActionTypes = {
        TOPIC_LOAD: 'TOPIC_LOAD',
        TOPIC_LOAD_S: 'TOPIC_LOAD_S',
        TOPIC_LOAD_E: 'TOPIC_LOAD_E',

        PAGE_LOAD: 'PAGE_LOAD',
        PAGE_LOAD_S: 'PAGE_LOAD_S'
    };

    state = {
        detail:[],
        newTopicId:'',
        hasLoadMoreBtn:true
    };

    loadTopicAjax(payLoad,minInterval) {
        const ats = TopicStore.ActionTypes;
        this.dispatch({type: ats.TOPIC_LOAD});
        var that = this;
        const commentAjax=new AjaxMgr({
            url:urlMap["getTopics"](),
            success:function(resp){that.dispatch({type: ats.TOPIC_LOAD_S, payLoad: resp})},
            minInterval:minInterval

        })
       commentAjax.setLoop(true).request();
    }

    //分页
    loadPageAjax(payLoad,page) {
        const ats = TopicStore.ActionTypes;
        this.dispatch({type: ats.PAGE_LOAD});
        var that = this;
        utils.ajax({
            url: urlMap["getTopics"](page)
            , dataType: 'jsonp'
            , success: function (resp) {
                that.dispatch({type: ats.PAGE_LOAD_S, payLoad: resp})
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
            case ats.PAGE_LOAD:
                return actionMethods.loadPage(this.state, payLoad)
            case ats.PAGE_LOAD_S:
                return actionMethods.loadPage_s(this.state, payLoad)
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
        var nTopic=payLoad.results[0];
        console.log(nTopic.id)
        console.log(state.newTopicId)
        if((payLoad.results.length==0) ||( (state.newTopicId!='') && (nTopic.id==state.newTopicId) )  ){
            console.log('不更新')
            return state
        }else{
            const idMap=[];
            const topicMap=[]
            state.detail.map(item=>{
                idMap.push(item.id)
            })
            console.log(idMap)
            for(var i=payLoad.results.length-1;i>=0;i--){
                console.log('哎'+payLoad.results[i])
                state.detail.unshift(payLoad.results[i])
            }

            console.log('更新'+payLoad.results[0])
            state.newTopicId=nTopic.id;
            return utils.State.setShallow(state, {
                isLoading: false,
                detail: state.detail
            })
        }
        
    },
    loadTopic_e(state, payLoad){
        return utils.State.setShallow(state, {
            isLoading: false,
            detail: 'fail'
        })
    },
    loadPage(state, payLoad){
        if (state.isLoading) {
            return state;
        } else {
            return utils.State.setShallow(state, {
                isLoading: true,
            })
        }
    },
    loadPage_s(state, payLoad){
       state.detail=state.detail.concat(payLoad.results)
       const preUrl=payLoad.paginator.previous;
       const lastUrl=payLoad.paginator.last;
       const lastPage=utils.splitUrl(lastUrl)['page']
       const prePage=utils.splitUrl(preUrl)['page']
       console.log(lastPage-prePage)
       if(lastPage-prePage==1){
            return utils.State.setShallow(state, {
                isLoading: false,
                detail: state.detail,
                hasLoadMoreBtn:false
            })
       }else{
            return utils.State.setShallow(state, {
            isLoading: false,
            detail: state.detail,
            hasLoadMoreBtn:true
        })
       }
        
    },
}

