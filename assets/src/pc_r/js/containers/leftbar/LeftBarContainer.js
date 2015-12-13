import {Component} from 'react'
import utils from '../../../../common/utils/utils.js'
import './leftbar.less'
import {enhanceWithStore} from 'react-zlux'

import InformationListContainer from './components/InformationList.js'
import ArticleStore from '../../store/ArticleStore.js'
const articleStore = new ArticleStore();
const InformationListElement = enhanceWithStore(InformationListContainer, articleStore);

import TopicListContainer from './components/TopicList.js'
import TopicStore from '../../store/TopicStore.js'
const topicStore = new TopicStore();
const TopicListElement = enhanceWithStore(TopicListContainer, topicStore);

global.topicStore = topicStore;//暴露全局

class LeftBarContainer extends Component{
    constructor(props,context){
        super(props,context)
    }

    static contextTypes={

    }

    state = {
        tabSelect:'informations',
        tabHeight:360,
    }

    componentDidMount(){
        const _height=window.document.body.offsetHeight;
        const audioH=$('.audio-container').outerHeight();
        const videoH=$('.video-container').outerHeight();
        const _tabHeight=_height-90-55-audioH-videoH;
        this.setState({tabHeight: _tabHeight});
    }

    render(){
        return (
            <div className='leftbar-container'>
                <div className='tab'>
                    <div className={'tab-list '+this.judgeTabClass("informations")} data-selected='true' data-ref='informations'  onClick={this.handleClick.bind(this)} >资讯</div>
                    <div className={'tab-list '+this.judgeTabClass("topics")} data-ref='topics'  onClick={this.handleClick.bind(this)} >话题</div>
                </div>
                <div className="tab-main">
                    <div style={{'height':this.state.tabHeight}} className={'tab-main-tab '+this.judgeTabClass("informations")}><InformationListElement /></div>
                    <div style={{'height':this.state.tabHeight}} className={'tab-main-tab '+this.judgeTabClass("topics")}><TopicListElement /></div>
                </div>
            </div>
        )
    }

    handleClick(event){
        var tabUrl=event.target.getAttribute('data-ref');
        this.setState({tabSelect: tabUrl});
    }
    // handleHover(event){
    //     var tabUrl=event.target.getAttribute('data-ref');
    //     this.setState({tabSelect: tabUrl});
    // }
    // handleClick(event){
    //     var tabUrl=event.target.getAttribute('data-ref');
    //     const store = this.props.store;
    //     this.setState({tabSelect: tabUrl});
    //     store .loadRelativeAjax('fasle',tabUrl)
    // }

    judgeTabClass(tab){
        if(tab!=this.state.tabSelect){
            return ""
        }else{
            return "active"
        }
    }
}

export default LeftBarContainer;