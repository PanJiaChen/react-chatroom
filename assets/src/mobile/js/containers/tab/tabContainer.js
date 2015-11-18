import {Component} from 'react'
import utils from '../../../../common/utils/utils.js'
import './tab.less'

import DiscussContainer from '../discuss/discussContainer.js'

import InformationContainer from '../information/informationContainer.js'

const tabChoices={
    discuss:<DiscussContainer />,
    information:<InformationContainer />
}
class TabContainer extends Component{
    constructor(props,context){
        super(props,context)
    }

    static contextTypes={

    }

    state = {
        tabSelect:'information',
    }

    componentDidMount(){
        
    }

    render(){
        
        return (
            <div className='tab-container'>
                <div className='tab'>
                        <div className={this.judgeTabClass("discuss")} data-selected='true' data-ref='discuss'  onClick={this.handleClick.bind(this)}>讨论</div>
                        <div className={this.judgeTabClass("information")} data-ref='information'  onClick={this.handleClick.bind(this)}>资讯</div>
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