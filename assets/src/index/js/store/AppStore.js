//not use

import {BaseStore} from 'zlux'

const ActionTypes={
    LOADING:'LOADING',
    LOADED :'LOADED'
}

class AppStore extends BaseStore{

    state={
        isLoading:false
    }

    loading(){
        this.dispatch(ActionTypes.LOADING)
    }

    loaded(){
        this.dispatch(ActionTypes.LOADED)
    }

    reducer(type){
        if(type===ActionTypes.LOADING) {
            if(this.state.isLoading===true){
                return this.state;
            }
            return {isLoading:true}
        }

        if(type===ActionTypes.LOADED){
            if(this.state.isLoading===false){
                return this.state
            }
            return {isLoading:false}
        }

        console.warn(`type:${type} not found: use default`)
        return this.state;
    }
}