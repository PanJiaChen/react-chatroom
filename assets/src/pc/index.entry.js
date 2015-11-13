import ReactDom from 'react-dom'

import LeftbarContainer from './js/containers/leftbar/LeftBarContainer.js'
import LeftBarStore from './js/store/LeftBarStore.js'

import TitleContainer from './js/containers/title/TitleContainer'
import TitleStore from './js/store/TitleStore.js'

import TopicContainer from './js/containers/topic/topicContainer'
import TopicStore from './js/store/TopicStore.js'

import CommentContainer from './js/containers/comment/CommentContainer.js'
import CommentStore from './js/store/CommentStore.js'

import {enhanceWithStore} from 'react-zlux'
import './less/index.less'


const leftBarStore = new LeftBarStore();
const titleStore = new TitleStore();
const topicStore = new TopicStore();
const commentStore = new CommentStore();

const LeftBarElement = enhanceWithStore(LeftbarContainer, leftBarStore);
const TitleElement = enhanceWithStore(TitleContainer, titleStore);
const TopicElement = enhanceWithStore(TopicContainer, topicStore);
const CommentElement = enhanceWithStore(CommentContainer, commentStore);


ReactDom.render(
    (
        <div className="react-container">
        	<LeftBarElement />
            <div className="main-container">
                <TitleElement />
                <TopicElement />
                <CommentElement />
            </div>
        </div>
    ),
    document.getElementById('container')
)

// setTimeout(function(){
//     require.ensure([],function(){
//         require('./js/async.js')
//     })
// },1000)