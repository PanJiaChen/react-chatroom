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


    componentDidMount(){
        const store = this.props.store;
        store.loadRelativeArticles()
    }

    render(){
        const store = this.props.store;
        const state = store.getState();
        
        return (
            <div className='leftbar-container'>
                <div className='tab'>
                    <div className='tab-list active' data-selected='true' data-ref='relativeArticle'  onClick={this.handleClick}>资讯区</div>
                    <div className='tab-list'>话题区</div>
                </div>
                <LeftbarList listDetail={state.detail}></LeftbarList>
            </div>
        )
    }

    handleClick(event){
        console.log(event.target.getAttribute('data-ref'));
        console.log(event.target);
    }
}

export default LeftBarContainer;