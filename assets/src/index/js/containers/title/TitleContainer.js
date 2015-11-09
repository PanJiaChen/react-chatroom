import {Component} from 'react'
import utils from '../../../../common/utils/utils.js'
import './title.less'

class TitleContainer extends Component{
    constructor(props,context){
        super(props,context)
    }

    static contextTypes={

    }

    state = {

    }

    componentDidMount(){
        const store = this.props.store;
        store.loadRelativeAjax('false','articles')
    }

    render(){
        const store = this.props.store;
        const state = store.getState();
        const firstTitle=state.detail[0];
        return (
            <div className='title'>
                {firstTitle}
            </div>
        )
    }

}

export default TitleContainer;