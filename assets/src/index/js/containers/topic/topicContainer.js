import {Component} from 'react'
import utils from '../../../../common/utils/utils.js'
import './topic.less'

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
        console.log('a')
        store.loadTopicAjax('fasle', this.state.url)
    }

    render() {
        const store = this.props.store;
        const state = store.getState();
        var publishTime = utils.formatTime(state.detail[0].createdAt);
        return (
            <div className='topic-container'>
                <div className="user-avatar">
                    <img src={state.detail[0].user['avatar']}/>
                </div>
                <div className="user-content">
                    <div className="user-detail">
                        {state.detail[0].user["username"]}
                    </div>
                    <div className="user-time">
                        {publishTime}
                    </div>
                    <div className="user-word">
                        {state.detail[0].text}
                    </div>
                </div>

            </div>
        )
    }

}

export default TopicContainer;