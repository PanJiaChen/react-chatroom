import {Component} from 'react'
import utils from '../../../../common/utils/utils.js'
import './tab.less'
import {enhanceWithStore} from 'react-zlux'

import DiscussContainer from '../discuss/discussContainer.js'
import DiscussStore from '../../store/DiscussStore.js'
const discussStore = new DiscussStore();
const DiscussElement = enhanceWithStore(DiscussContainer, discussStore);

import ArticleContainer from '../article/articleContainer.js'

const tabChoices={
    discuss:<DiscussElement />,
    articles:<ArticleContainer />
}
class TabContainer extends Component{
    constructor(props,context){
        super(props,context)
    }

    static contextTypes={

    }

    state = {
        tabSelect:'discuss',
    }

    componentDidMount(){
        
    }

    render(){
        
        return (
            <div className='tab-container'>
                <div className='tab'>
                    <div className={this.judgeTabClass("discuss")} data-selected='true' data-ref='discuss'  onClick={this.handleClick.bind(this)}>讨论</div>
                    <div className={this.judgeTabClass("articles")} data-ref='articles'  onClick={this.handleClick.bind(this)}>最新消息</div>
                </div>
                <div className="tab-main">
                    {tabChoices[this.state.tabSelect]}
                </div>
            </div>
        )
    }

    handleClick(event){
        var tabUrl=event.target.getAttribute('data-ref');
        this.setState({tabSelect: tabUrl});
    }

    judgeTabClass(tab){
        if(tab!=this.state.tabSelect){
            return "tab-list"
        }else{
            return "tab-list active"
        }
    }
}

export default TabContainer;