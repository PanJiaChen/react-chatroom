import {Component} from 'react'
import utils from '../../../../../common/utils/utils.js'
import '../information.less'

//它对应的store是ArticleStore^_^


export default class InformationList extends Component {

    static defaultProps = {}


    constructor(props, context) {
        super(props, context)
    }

    static contextTypes={
        minInterval:React.PropTypes.object.isRequired
    }

    componentDidMount() {
        const store = this.props.store;
        store.loadRelativeAjax('fasle',this.context.minInterval.article)
    }


    render() {

        const store = this.props.store;
        const state = store.getState();
        var list = state.articles;
        if (list.length<=0) {
            return(
                <div className='information-empty-container'>
                    <div className='information-empty-img'></div>
                    暂无最新资讯
                </div>
            )
        };
        var repeatLi = list.map(item=> {
            var publishTime = utils.formatTime(item.createdAt);
            var content = item.title;
            return (
                <li key={item.id} className="informationlist-item-container">
                    <div className="list-item">
                        <div className="timer">{publishTime}</div>
                        <div className="timer-outside-circle">
                            <div className="timer-inside-circle"></div>
                        </div>
                        <div className="list-content">{content}</div>
                    </div>
                </li>
            )
        })

        return (
            <ul className='information-list'>
                {repeatLi}
            </ul>
        )
    }
}
