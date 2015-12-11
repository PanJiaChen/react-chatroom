import {Component} from 'react'
import utils from '../../../../common/utils/utils.js'
import './title.less'
//对应的TitleStore

class TitleContainer extends Component{

    static contextTypes={
        commentLineHeight: React.PropTypes.number.isRequired,
        commentMaxLines: React.PropTypes.number.isRequired,
        minInterval:React.PropTypes.object.isRequired
    }

    constructor(props,context){
        super(props,context)
    }

    componentDidMount(){
        const store = this.props.store;

        store.loadTitleAjax('false')
        store.loadCountAjax('false',this.context.minInterval.count)
    }

    render(){
        const store = this.props.store;
        const state = store.getState();

        var status=this.judgeStatus(state.title.status)
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
                return {ctx:"已删除",class:'deleted'};
            case "draft":
                return {ctx:"草稿",class:'draft'};
            case "terminated":
                return {ctx:"直播结束",class:'terminated'};
            default:
                return {ctx:"请求中",class:'publish'}
        }
    }

}

export default TitleContainer;