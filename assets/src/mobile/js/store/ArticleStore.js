import {BaseStore} from 'zlux'
import utils from '../../../common/utils/utils.js'
var Api = require('../WebApi/api.js');


const ActionTypes = {
    ARTICLES_LOAD: 'ARTICLES_LOAD',
    ARTICLES_LOAD_S: 'ARTICLES_LOAD_S',
    ARTICLES_LOAD_E: 'ARTICLES_LOAD_E'
};
const urlMap = {
    articles: Api.getRelativeArticles(),
}

export default class PostDetailStore extends BaseStore {

    __className = 'PostDetailStore';

    state = {
        isLoading: false,
        articles: []
    };


    loadRelativeAjax(payLoad) {
        this.dispatch({type: ActionTypes.ARTICLES_LOAD});
        var that = this
        utils.ajax({
            url: urlMap['articles']
            , dataType: 'jsonp'
            , success: function (resp) {
                that.dispatch({type: ActionTypes.ARTICLES_LOAD_S, payLoad: resp.results})
            }
        })
    }

    reduce(action) {
        const type = action.type;
        const payLoad = action.payLoad;
        switch (type) {
            case ActionTypes.ARTICLES_LOAD:
                return actionMethods.loadRelativeArticles(this.state, payLoad)
            case ActionTypes.ARTICLES_LOAD_S:
                return actionMethods.loadRelativeArticles_s(this.state, payLoad)
            case ActionTypes.ARTICLES_LOAD_E:
                return actionMethods.loadRelativeArticles_e(this.state, payLoad)

            default:
                console.warn(`type:${type} not found: use default`)
                return this.state
        }
    }
}

const actionMethods = {
    loadRelativeArticles(state, payLoad){

        if (state.isLoading) {
            return state;
        } else {
            return utils.State.setShallow(state, {
                isLoading: true,

            })
        }
    },
    loadRelativeArticles_s(state, payLoad){
        state.articles = [];
        payLoad.forEach(item=> {
            state.articles.push(item)
        })
        return utils.State.setShallow(state, {
            isLoading: false,
            articles: state.articles
        })
    },
    loadRelativeArticles_e(state, payLoad){
        return utils.State.setShallow(state, {
            isLoading: false,
        })
    }
}

