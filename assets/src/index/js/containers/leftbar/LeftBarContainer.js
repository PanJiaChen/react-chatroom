import {Component} from 'react'
import utils from '../../../../common/utils/utils.js'
import './leftbar.less'

class LeftBarContainer extends Component{
    constructor(props,context){
        super(props,context)
    }

    static contextTypes={
    }


    componentDidMount(){
        const props = this.props;
        console.log(props)
    }

    render(){

        return (
            <div className='post-detail-container'>
                 apple
            </div>
        )

    }
}

export default LeftBarContainer;