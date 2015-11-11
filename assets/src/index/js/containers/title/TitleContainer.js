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

        store.loadTitleAjax('false')
        store.loadCountAjax('false')
    }

    render(){
        const store = this.props.store;
        const state = store.getState();

        var status=this.judgeStatus(state.title.status)
        console.log(status)
        return (
            <div className='title-continer'>
                <div className='title'>
                        {state.title.title}
                        <span className={'publish-status '+status.class} >
                            {status.ctx}
                        </span>
                </div>
                <div className="countNum">
                    {state.count.numOfUsers}人参与
                </div>
            </div>
            
        )
    }

    judgeStatus(status){
        switch(status) {
            case "published":
                return {ctx:"直播中",class:'publish'};
            case "deleted":
                return {ctx:"直播中",class:'deleted'};
            case "draft":
                return {ctx:"草稿",class:'draft'};
            case "terminated":
                return {ctx:"结束",class:'terminated'};
            default:
                return {ctx:"请求中",class:'publish'}
        }
    }

}

export default TitleContainer;