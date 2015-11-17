import {Component} from 'react'
import utils from '../common/utils/utils.js'

import AudioContainer from './js/containers/audio/AudioContainer.js';
import VedioContainer from './js/containers/vedio/VedioContainer.js';
import ArticleContainer from './js/containers/article/articleContainer.js';
import TabContainer from './js/containers/tab/tabContainer.js';

import './less/index.less'

const transformsMap={
    audio:<AudioContainer />,
    vedio:<VedioContainer />,
    commentandarticle:<TabContainer />,
    article:<ArticleContainer />
}

class ChatroomContainer extends Component{

    static defaultProps = {
        
    }

    constructor(props, context) {
        super(props, context)

    }

    componentDidMount() {
        const store=this.props.store
        store.loadChatroomAjax('fasle')
    }

    componentWillUnmount(){

    }

    render() {
        const store = this.props.store;
        const state = store.getState();
        const detail = state.detail
        if(detail.id){
            var includeArr=[];
            var include=detail.include;
            for(let pop in transformsMap){
                this.judgeInclude(include,pop,includeArr)
            }
        }else{
            return <div></div>
        }
        
        return (
            <div className="react-container">
             
             {includeArr}
            </div>
        )
    }

    judgeInclude(arr,str,include){
        if(arr.indexOf(str)>=0){
        return include.push(transformsMap[str])
        }
    }

}

export default ChatroomContainer;




