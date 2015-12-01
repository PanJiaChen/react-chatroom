import {Component} from 'react'
import utils from '../../../../../common/utils/utils.js'


export default class LeftbarList extends Component {

    static contextTypes={
        commentLineHeight: React.PropTypes.number.isRequired,
        commentMaxLines: React.PropTypes.number.isRequired,
        minInterval:React.PropTypes.object.isRequired
    }

    static defaultProps = {
        list: []
    }


    constructor(props, context) {
        super(props, context)
    }

    componentDidMount(){
        console.log('资讯')
        const store = this.props.store;
        store.loadArticleAjax('fasle',this.context.minInterval.article)
    }

    render() {
        const store = this.props.store;
        const state = store.getState();
        const list=state.detail;
        var repeatLi = list.map(item=> {
            var publishTime = utils.formatTime(item.createdAt);
            var content = item.title ? item.title : item.text;
            return (
                <li key={item.id} className="list-item-container">
                    <div className="list-item">
                        <div className="timer-outside-circle">
                            <div className="timer-inside-circle"></div>
                        </div>
                        <div className="list-content">{content}</div>
                        <div className="timer">{publishTime}</div>
                    </div>
                </li>
            )
        })

        return (
            <ul className='article-list'>
               {repeatLi}
            </ul>
        )
    }

}
