import {Component} from 'react'
import utils from '../common/utils/utils.js'
import './less/index.less'
import {enhanceWithStore} from 'react-zlux'

//视频
import VideoContainer from './js/containers/video/VideoContainer.js';
import StreamStore from './js/store/StreamStore.js'
const streamStore = new StreamStore();
const VideoElement = enhanceWithStore(VideoContainer, streamStore);
//音频
import AudioContainer from './js/containers/audio/AudioContainer.js';
const AudioElement = enhanceWithStore(AudioContainer, streamStore);

//侧边栏
import LeftbarContainer from './js/containers/leftbar/LeftBarContainer.js'

//标题栏
import TitleContainer from './js/containers/title/TitleContainer'
import TitleStore from './js/store/TitleStore.js'
const titleStore = new TitleStore();
const TitleElement = enhanceWithStore(TitleContainer, titleStore);

//投票
import VoteContainer from './js/containers/vote/VoteContainer'
import VoteStore from './js/store/VoteStore'
const voteStore = new VoteStore();
const VoteElement = enhanceWithStore(VoteContainer, voteStore);

//单主持人话题
import SingalTopicContainer from './js/containers/singalTopic/singalTopicContainer.js'
const singalTopicStore=topicStore//全局变量
const SingalTopicElement = enhanceWithStore(SingalTopicContainer, singalTopicStore);

//评论
import CommentContainer from './js/containers/comment/CommentContainer.js'
import CommentStore from './js/store/CommentStore.js'
const commentStore = new CommentStore();
const CommentElement = enhanceWithStore(CommentContainer, commentStore);
global.commentStore = commentStore;

import './less/index.less'
//loading样式
import './js/components/loading.less'

const transformsMap = {
    audio: <div className='audio-container' key='audio'><AudioElement  /></div>,
    video: <div className='video-container' key='video'><VideoElement  /></div>
}

class ChatroomContainer extends Component {

    static childContextTypes={
         commentMaxLines:React.PropTypes.number.isRequired,
         commentLineHeight:React.PropTypes.number.isRequired,
         topicLineHeight:React.PropTypes.number.isRequired,
         topicMaxLines:React.PropTypes.number.isRequired,
         minInterval:React.PropTypes.object.isRequired
    }

    state = {
        bHeight:0,
        topicHeight:83,//topic最小默认高度
        titleHeight:0
    }

    getChildContext() {
         return {
            commentMaxLines:3,
            commentLineHeight:20,
            topicLineHeight:20,
            topicMaxLines:2,
            minInterval:{
                info: this.props.minInterval.info,
                comment: this.props.minInterval.comment,
                article: this.props.minInterval.article,
                topic: this.props.minInterval.topic,
                count: this.props.minInterval.count,
                vote: this.props.minInterval.vote
            }
         };
    }

    constructor(props, context) {
        super(props, context)
    }

    componentDidMount() {
        const store = this.props.store        
        store.loadChatroomAjax('fasle')

        //计算响应式高度 90为页面nav定死高度
        const _height=window.document.body.offsetHeight;
        const _BHeight=_height-90;
        this.setState({bHeight: _BHeight});
    }

    componentWillUnmount() {
        document.body.removeChild(this.node);
    }

    resize(target,h){
        var height=h
        this.setState({
            [`${target}`]: height
        });
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
            <div className="react-container clearfix">
                <div id='leftbar-wrapper' className='leftbar-wrapper' style={{'height':this.state.bHeight}}>
                    {includeArr}
                    <LeftbarContainer />
                </div>
                <div className="main-container" style={{'height':this.state.bHeight}}>
                    <VoteElement />
                    <TitleElement resize={this.resize.bind(this)} titleHeight={this.state.titleHeight} />
                    <SingalTopicElement resize={this.resize.bind(this)} topicHeight={this.state.topicHeight} />
                    <CommentElement titleHeight={this.state.titleHeight} topicHeight={this.state.topicHeight} />
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




