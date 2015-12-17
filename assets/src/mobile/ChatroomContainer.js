import {Component} from 'react'
import ReactDOM from 'react-dom'
import utils from '../common/utils/utils.js'
import {enhanceWithStore} from 'react-zlux'

import TabContainer from './js/containers/tab/tabContainer.js';

import ArticleContainer from './js/containers/articleSingal/articleSingalContainer.js';
import ArticleStore from './js/store/ArticleStore.js';
const articleStore = global.informationStore;
const ArticleElement = enhanceWithStore(ArticleContainer, articleStore);

import VideoContainer from './js/containers/video/VideoContainer.js';
import StreamStore from './js/store/StreamStore.js'
const streamStore = new StreamStore();
const VideoElement = enhanceWithStore(VideoContainer, streamStore);

import AudioContainer from './js/containers/audio/AudioContainer.js';
const AudioElement = enhanceWithStore(AudioContainer, streamStore);

import './less/index.less'
import './js/components/loading.less'

const transformsMap = {
    audio: <AudioElement key='aduio'/>,
    video: <VideoElement key='video' />,
    commentandarticle: <TabContainer key={'commentandarticle'} />,
    // article: <ArticleElement />
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
                topic: this.props.minInterval.topic
            }
         };
    }

    constructor(props, context) {
        super(props, context)
    }

    componentDidMount() {
        const store = this.props.store
        store.loadChatroomAjax('fasle')
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
            for (let pop in transformsMap) {
                this.judgeInclude(include, pop, includeArr)
            }
        } else {
            return <div></div>
        }

        return (
            <div className="react-container">
                <div className='broadcast-header'>
                    <div className='wscn'></div>
                    <div className="header-num">{detail.numOfUsers}人参与</div>
                </div>

                {includeArr}
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




