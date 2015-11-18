import {Component} from 'react'
import utils from '../../../../common/utils/utils.js'
import './discuss.less'
import {enhanceWithStore} from 'react-zlux'

import CommentList from './components/CommentList.js';
import CommenStore from '../../store/CommentStore.js'
const commenStore = new CommenStore();
const CommenElement = enhanceWithStore(CommentList, commenStore);

import Topic1Container from './components/topicSingalContainer.js'
import TopicStore from '../../store/TopicStore.js'
const topicStore = new TopicStore();
const TopicElement = enhanceWithStore(Topic1Container, topicStore);


class DiscussContainer extends Component {
    constructor(props, context) {
        super(props, context)
    }

    static contextTypes = {}

    state = {}

    componentDidMount() {

    }

    render() {
        return (
            <div className='discuss-container'>
                <TopicElement />
                <CommenElement />
            </div>
        )
    }
}


export default DiscussContainer;