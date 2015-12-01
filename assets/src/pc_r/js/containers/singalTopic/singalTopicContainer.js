import {Component} from 'react'
import utils from '../../../../common/utils/utils.js'
import './singalTopic.less'

class TopicContainer extends Component {
    constructor(props, context) {
        super(props, context)
    }

    static contextTypes = {}

    state = {
        
    }

    componentDidMount() {
 
    }

    render() {
        const store = this.props.store;
        const state = store.getState();
        const tObj=state.detail[0];
        if(!tObj){
            return <div></div>
        }
        const publishTime = utils.formatTime(tObj.createdAt);
        const username='[主持人]'+tObj.user["username"]
        return (
            <div className='topic-container clearfix'>
                <div className="user-avatar">
                    <img src={tObj.user['avatar']}/>
                </div>
                <div className="user-content">
                    <div className="user-meta">
                        <div className="user-detail">
                            {username}
                        </div>
                        <div className="user-time">
                            {publishTime}
                        </div>
                    </div>
                    <div className="user-word">
                        {tObj.text}
                    </div>
                </div>
            </div>
        )
    }

}

export default TopicContainer;