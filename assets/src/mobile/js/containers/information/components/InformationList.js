import {Component} from 'react'
import utils from '../../../../../common/utils/utils.js'
import '../information.less'


export default class InformationList extends Component {

    static defaultProps = {
        
    }


    constructor(props, context) {
        super(props, context)
    }
    componentDidMount() {
        const store = this.props.store;
        store.loadRelativeAjax('fasle')
    }


    render() {
         
        const store = this.props.store;
        const state = store.getState();
        var list = state.articles;
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
