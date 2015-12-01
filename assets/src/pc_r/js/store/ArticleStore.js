import {BaseStore} from 'zlux'
import utils from '../../../common/utils/utils.js'
var Api = require('../WebApi/api.js');
import AjaxMgr from '../../../common/utils/ajxaLoop.js'


const urlMap={
    getArticles:Api.getRelativeArticles
}

export default class ArticleStore extends BaseStore{

    __className ='ArticeStore';

    static ActionTypes={
        LOAD:'LOAD',
        LOAD_S:'LOAD_S',
        LOAD_E:'LOAD_E'
    };

    state = {
        isLoading:false,
        detail:[]
    };

    loadArticleAjax(payLoad,minInterval) {
        const ats = ArticleStore.ActionTypes;
        this.dispatch({type: ats.LOAD});
        var that = this;
        const commentAjax=new AjaxMgr({
            url:urlMap["getArticles"](),
            success:function(resp){that.dispatch({type: ats.LOAD_S, payLoad: resp})},
            minInterval:minInterval

        })
       commentAjax.setLoop(true).request();
    }

    reduce(action){
        const type = action.type;
        const payLoad = action.payLoad;
        const ats = ArticleStore.ActionTypes;
        switch(type) {
            case ats.LOAD:
                return actionMethods.loadRelativeArticles(this.state,payLoad)
            case ats.LOAD_S:
                return actionMethods.loadRelativeArticles_s(this.state, payLoad)
            case ats.LOAD_E:
                return actionMethods.loadRelativeArticles_e(this.state, payLoad)

            default:
                console.warn(`type:${type} not found: use default`)
                return this.state
        }
    }
}

const actionMethods={
    loadRelativeArticles(state,payLoad){
        if(state.isLoading){
            return state;
        }else{
            return utils.State.setShallow(state,{
                isLoading:true,
               
            })
        }
    },
    loadRelativeArticles_s(state,payLoad){
        state.detail=[];
        console.log(payLoad)
        payLoad.results.forEach(item=>{
            state.detail.push(item)
        })
        return utils.State.setShallow(state,{
            isLoading:false,
            detail:state.detail
        })
    },
    loadRelativeArticles_e(state,payLoad){
        return utils.State.setShallow(state,{
            isLoading:false,
            detail:'fail'
        })
    }
}

