import {Component} from 'react'
import utils from '../../../../../common/utils/utils.js'
import '../discuss.less'

class TopicContainer extends Component {
    constructor(props, context) {
        super(props, context)
    }

    static contextTypes={
        topicLineHeight: React.PropTypes.number.isRequired,
        topicMaxLines:React.PropTypes.number.isRequired
    }

    state = {
        url: 'topics'
    }

    componentDidMount() {
        const store = this.props.store;
        store.loadTopicAjax('fasle', this.state.url)
        console.log(this.context.topicLineHeight)
        console.log(this.context.topicMaxLines)
    }

    render() {
        const store = this.props.store;
        const state = store.getState();
    
        if(state.detail.length<=0){
              return(
                    <div className='topic-enpty-container'>主持人正在来的路人</div>
                )
        }
        const detail= state.detail[0]
        const publishTime = utils.formatTime(detail.createdAt);
        
        return (
            <div className='topic-container'>
                <div className='list-item-container '>
                    <div className="user-avatar">
                        {/*<img src={detail.user['avatar']}/>*/}
                        <img
                            src='http://cv.qiaobutang.com/uploads/social_avatars/2015/9/10/10/55f0e5880cf20c2d88d33a43/large.JPG?v1441850761756 '/>
                    </div>
                    <div className="user-content">
                        <div className='chat-meta clearfix'>
                            <div className="user-detail">
                                {detail.user["username"]}
                            </div>
                            <div className="user-time">
                                {publishTime}
                            </div>
                        </div>
                        <div className="user-word">
                            {detail.text}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default TopicContainer;