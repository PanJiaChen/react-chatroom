import {Component} from 'react'
import utils from '../../../../common/utils/utils.js'
import './leftbar.less'
import LeftbarList from './components/LeftbarList.js'

class LeftBarContainer extends Component{
    constructor(props,context){
        super(props,context)
    }

    static contextTypes={

    }

    state = {
        tabSelect:'articles',
    }

    componentDidMount(){
        const store = this.props.store;
        store.loadRelativeAjax('fasle',this.state.tabSelect)
    }

    render(){
        const store = this.props.store;
        const state = store.getState();
        
        return (
            <div className='leftbar-container'>
                <div className='tab'>
                    <div className={this.judgeTabClass("articles")} data-selected='true' data-ref='articles'  onClick={this.handleClick.bind(this)}>资讯区</div>
                    <div className={this.judgeTabClass("topics")} data-ref='topics'  onClick={this.handleClick.bind(this)}>话题区</div>
                </div>
                <LeftbarList listDetail={state.detail}></LeftbarList>
            </div>
        )
    }

    handleClick(event){
        var tabUrl=event.target.getAttribute('data-ref');
        const store = this.props.store;
        this.setState({tabSelect: tabUrl});
        store .loadRelativeAjax('fasle',tabUrl)
    }

    judgeTabClass(tab){
        if(tab!=this.state.tabSelect){
            return "tab-list"
        }else{
            return "tab-list active"
        }
    }
}

export default LeftBarContainer;