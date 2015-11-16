import {Component} from 'react'
import utils from '../common/utils/utils.js'

// import ChatroomContainer from './js/containers/'
import ChatroomDetailStore from './js/store/ChatroomDetail.js'

import {enhanceWithStore} from 'react-zlux'
import './less/index.less'

const chatroomDetailStore = new ChatroomDetailStore();

class ChatroomContainer extends Component{

    static defaultProps = {
        
    }

    constructor(props, context) {
        super(props, context)
    }

    componentDidMount() {
        const store = chatroomDetailStore;
        store.loadChatroomAjax('fasle')
    }

    componentWillUnmount(){

    }

    render() {
        return (
            <div className="react-container">
              {this.props.chatId}
            </div>
        )
    }

}


export default ChatroomContainer;


