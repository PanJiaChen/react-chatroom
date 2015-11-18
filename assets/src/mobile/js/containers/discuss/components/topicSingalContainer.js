import {Component} from 'react'
import utils from '../../../../../common/utils/utils.js'
import '../discuss.less'

class TopicContainer extends Component {
    constructor(props, context) {
        super(props, context)
    }

    static contextTypes = {}

    state = {
        url: 'topics'
    }

    componentDidMount() {
        const store = this.props.store;
        store.loadTopicAjax('fasle', this.state.url)
    }

    render() {
        const store = this.props.store;
        const state = store.getState();
      

        if(state.detail.length>0){
              const detail= state.detail[0]
              const publishTime = utils.formatTime(state.detail[0].createdAt);
        }else{
            return(
                <div className='topic-enpty-container'>主持人正在来的路人</div>
            )
        }
        
        return (
            <div className='topic-container'>
                <div className='list-item-container '>
                    <div className="user-avatar">
                        {/*<img src={state.detail[0].user['avatar']}/>*/}
                        <img
                            src='http://cv.qiaobutang.com/uploads/social_avatars/2015/9/10/10/55f0e5880cf20c2d88d33a43/large.JPG?v1441850761756 '/>
                    </div>
                    <div className="user-content">
                        <div className='chat-meta clearfix'>
                            <div className="user-detail">
                                {state.detail[0].user["username"]}
                            </div>
                            <div className="user-time">
                                {publishTime}
                            </div>
                        </div>
                        <div className="user-word">
                            {state.detail[0].text}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default TopicContainer;