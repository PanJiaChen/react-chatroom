import {Component} from 'react'
import utils from '../../../../common/utils/utils.js'
import './title.less'

class TitleContainer extends Component{
    constructor(props,context){
        super(props,context)
    }

    componentDidMount(){
        console.log('b')
        const store = this.props.store;

        store.loadRelativeAjax('false','title')
    }

    render(){
        const store = this.props.store;
        const state = store.getState();

        return (
            <div className='title'>
                {state.detail.title}
            </div>
        )
    }

}

export default TitleContainer;