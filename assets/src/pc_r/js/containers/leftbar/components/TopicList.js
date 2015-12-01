import {Component} from 'react'
import utils from '../../../../../common/utils/utils.js'


export default class LeftbarList extends Component {

    static defaultProps = {
        list: []
    }

    static contextTypes={
        commentLineHeight: React.PropTypes.number.isRequired,
        commentMaxLines: React.PropTypes.number.isRequired,
        minInterval:React.PropTypes.object.isRequired
    }


    constructor(props, context) {
        super(props, context)
    }

    componentDidMount(){
        console.log('话题')
        const store = this.props.store;
        store.loadTopicAjax('fasle',this.context.minInterval.topic)
    }

    render() {
        const store = this.props.store;
        const state = store.getState();
        const list=state.detail;
        if (list.length <= 0) {
            return (
                <div className='topic-enpty-container'>主持人正在来的路人</div>
            )
        }
        var repeatLi = list.map(item=> {
            var publishTime = utils.formatTime(item.createdAt);
            var content = item.text;
            return (
                <li key={item.id} className="list-item-container">
                    <div className="list-item clearfixd">
                       <img className="list-avatar" src={item.user.avatar} />
                       <div className="list-content-container">
                            <div className="list-meta">
                                <div className="username">{item.user.screenName?item.user.screenName:item.user.username}</div>
                                <div className="timer">{publishTime}</div>
                            </div>
                            <div className="list-content">{content}</div>
                       </div>                        
                    </div>
                </li>
            )
        })

        return (
            <ul className='topic-list'>
               {repeatLi}
            </ul>
        )
    }

}
