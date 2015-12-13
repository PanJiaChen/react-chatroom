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
        LOAD_E:'LOAD_E',

        PAGE_LOAD: 'PAGE_LOAD',
        PAGE_LOAD_S: 'PAGE_LOAD_S'
    };

    state = {
        isLoading:false,
        detail:[],
        newArticleId:'',
        hasLoadMoreBtn:false
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

    //分页
    loadPageAjax(payLoad,page) {
        const ats = ArticleStore.ActionTypes;
        this.dispatch({type: ats.PAGE_LOAD});
        var that = this;
        utils.ajax({
            url: urlMap["getArticles"](page)
            , dataType: 'jsonp'
            , success: function (resp) {
                that.dispatch({type: ats.PAGE_LOAD_S, payLoad: resp})
            }
        })
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
        const nArticle=payLoad.results[0];
        if((payLoad.results.length==0) || (nArticle==state.newTopicId) ){
            console.log('不更新')
            return state
        }else{
            if(state.newArticleId==''){
                console.log('初始化')
                state.newArticleId=nArticle.id;
                return utils.State.setShallow(state, {
                    isLoading: false,
                    detail: payLoad.results,
                    newArticleId:state.newArticleId
                })
            }else{
                const idMap=[];
                state.detail.map(item=>{
                    idMap.push(item.id)
                })
                for(var i=payLoad.results.length-1;i>=0;i--){
                    if(idMap.indexOf(payLoad.results[i].id)>=0){
                        
                    }else{
                        state.detail.unshift(payLoad.results[i])
                    }
                }
                console.log('更新')
                state.newArticleId=nArticle.id;
                return utils.State.setShallow(state, {
                    isLoading: false,
                    detail: state.detail
                })
            }
        }
    },
    loadRelativeArticles_e(state,payLoad){
        return utils.State.setShallow(state,{
            isLoading:false,
            detail:'fail'
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
       
       const preUrl=payLoad.paginator.previous;
       const lastUrl=payLoad.paginator.last;
       const lastPage=utils.splitUrl(lastUrl)['page'];
       const prePage=utils.splitUrl(preUrl)['page'];
       const idMap=[];
        state.detail.map(item=>{
            idMap.push(item.id)
        })
        for(var i=0;i<payLoad.results.length;i++){
            if(idMap.indexOf(payLoad.results[i].id)>=0){
                
            }else{
                state.detail.push(payLoad.results[i])
            }
        }

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

