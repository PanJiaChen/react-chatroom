import {BaseStore} from 'zlux'
import utils from '../../../common/utils/utils.js'
var Api = require('../WebApi/api.js');


const ActionTypes={
    LOAD:'LOAD',
    LOAD_S:'LOAD_S',
    LOAD_E:'LOAD_E'
};
const urlMap={
    articles:Api.getRelativeArticles,
    topics:Api.getRelaticeTopics
}

export default class PostDetailStore extends BaseStore{

    __className ='PostDetailStore';

    state = {
        isLoading:false,
        detail:[]
    };

    loadRelativeAjax(payLoad,url) {
        this.dispatch({type:ActionTypes.LOAD});
        var that=this
        utils.ajax({
                url: urlMap[url]()
              , dataType: 'jsonp'
              , success: function (resp) {
                  that.dispatch({type:ActionTypes.LOAD_S,payLoad:resp.results})
                }
            })
    }

    reduce(action){
        const type = action.type;
        const payLoad = action.payLoad;
        switch(type) {
            case ActionTypes.LOAD:
                return actionMethods.loadRelativeArticles(this.state,payLoad)
            case ActionTypes.LOAD_S:
                return actionMethods.loadRelativeArticles_s(this.state, payLoad)
            case ActionTypes.LOAD_E:
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
        payLoad.forEach(item=>{
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

