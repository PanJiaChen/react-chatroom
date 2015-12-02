import {Component} from 'react'
import ReactDom from 'react-dom'
import utils from '../common/utils/utils.js'
import './less/index.less'
import {enhanceWithStore} from 'react-zlux'
import AudioContainer from './js/containers/audio/AudioContainer.js';
import VedioContainer from './js/containers/vedio/VedioContainer.js';

import LeftbarContainer from './js/containers/leftbar/LeftBarContainer.js'


import TitleContainer from './js/containers/title/TitleContainer'
import TitleStore from './js/store/TitleStore.js'
const titleStore = new TitleStore();
const TitleElement = enhanceWithStore(TitleContainer, titleStore);


import SingalTopicContainer from './js/containers/singalTopic/singalTopicContainer.js'
const singalTopicStore=topicStore//全局变量
const SingalTopicElement = enhanceWithStore(SingalTopicContainer, singalTopicStore);

import CommentContainer from './js/containers/comment/CommentContainer.js'
import CommentStore from './js/store/CommentStore.js'
const commentStore = new CommentStore();
const CommentElement = enhanceWithStore(CommentContainer, commentStore);


import Loading from './js/components/Loading.js'

import './less/index.less'

const transformsMap = {
    // audio: <AudioContainer key='audio' />,
    // vedio: <VedioContainer key='vedio' />
}

class ChatroomContainer extends Component {

    static childContextTypes={
         commentMaxLines:React.PropTypes.number.isRequired,
         commentLineHeight:React.PropTypes.number.isRequired,
         topicLineHeight:React.PropTypes.number.isRequired,
         topicMaxLines:React.PropTypes.number.isRequired,
         minInterval:React.PropTypes.object.isRequired
    }

    getChildContext() {
         return {
            commentMaxLines:2,
            commentLineHeight:18,
            topicLineHeight:18,
            topicMaxLines:2,
            minInterval:{
                info: this.props.minInterval.info,
                comment: this.props.minInterval.comment,
                article: this.props.minInterval.article,
                topic: this.props.minInterval.topic,
                count: this.props.minInterval.count
            }
         };
    }

    constructor(props, context) {
        super(props, context)
    }

    componentDidMount() {
        const store = this.props.store
        store.loadChatroomAjax('fasle')
        // this.node = document.createElement('div');
        // this.node.className = 'loading-container';
        // this.node.id = 'js-loading';
        // document.body.appendChild(this.node);
        // ReactDom.render(<Loading />, document.getElementById('js-loading'))
    }

    componentWillUnmount() {
        document.body.removeChild(this.node);
    }

    render() {
        const store = this.props.store;
        const state = store.getState();
        const detail = state.detail
        if (detail.id) {
            var includeArr = [];
            var include = detail.include;
            console.log(include )
            for (let pop in transformsMap) {
                this.judgeInclude(include, pop, includeArr)
            }
        } else {
            return <div></div>
        }

        return (
            <div className="react-container">
                {includeArr}
                <LeftbarContainer />
                <div className="main-container">
                    <TitleElement />
                    <SingalTopicElement />
                    <CommentElement />
                </div>
            </div>
        )
    }

    judgeInclude(arr, str, include) {
        if (arr.indexOf(str) >= 0) {
            return include.push(transformsMap[str])
        }
    }

}

export default ChatroomContainer;



