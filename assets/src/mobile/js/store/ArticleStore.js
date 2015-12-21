import {BaseStore} from 'zlux'
import utils from '../../../common/utils/utils.js'
var Api = require('../WebApi/api.js');
import AjaxMgr from '../../../common/utils/ajxaLoop.js'

const urlMap = {
    articles: Api.getRelativeArticles,
}

export default class PostDetailStore extends BaseStore {

    __className = 'PostDetailStore';

    static ActionTypes = {
        ARTICLES_LOAD: 'ARTICLES_LOAD',
        ARTICLES_LOAD_S: 'ARTICLES_LOAD_S',
        ARTICLES_LOAD_E: 'ARTICLES_LOAD_E'
    };

    state = {
        articles: []
    };


    loadRelativeAjax(payLoad,minInterval) {
        const ats = PostDetailStore.ActionTypes;
        this.dispatch({type: ats.ARTICLES_LOAD});
        const that = this;
        const articleAjax=new AjaxMgr({
            url:urlMap["articles"](),
            success:function(resp){that.dispatch({type: ats.ARTICLES_LOAD_S, payLoad: resp.results})},
            minInterval:minInterval
        })
        articleAjax.setLoop(true).request();
    }

    reduce(action) {
        const type = action.type;
        const payLoad = action.payLoad;
        const ats = PostDetailStore.ActionTypes;
        switch (type) {
            case ats.ARTICLES_LOAD:
                return actionMethods.loadRelativeArticles(this.state, payLoad)
            case ats.ARTICLES_LOAD_S:
                return actionMethods.loadRelativeArticles_s(this.state, payLoad)
            case ats.ARTICLES_LOAD_E:
                return actionMethods.loadRelativeArticles_e(this.state, payLoad)
            default:
                console.warn(`type:${type} not found: use default`)
                return this.state
        }
    }
}

const actionMethods = {
    loadRelativeArticles(state, payLoad){
        return state;
    },
    loadRelativeArticles_s(state, payLoad){
        state.articles = [];
        payLoad.forEach(item=> {
            state.articles.push(item)
        })
        return utils.State.setShallow(state, {
            articles: state.articles
        })
    },
    loadRelativeArticles_e(state, payLoad){
        return utils.State.setShallow(state, {
            isLoading: false,
        })
    }
}

