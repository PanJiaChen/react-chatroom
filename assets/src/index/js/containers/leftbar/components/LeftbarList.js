import {Component} from 'react'
import utils from '../../../../../common/utils/utils.js'


export default class LeftbarList extends Component {

    static defaultProps = {
        list: []
    }


    constructor(props, context) {
        super(props, context)
    }

    render() {
        var list = this.props.listDetail;
        var repeatLi = list.map(item=> {
            var publishTime = utils.formatTime(item.createdAt);
            var content = item.title ? item.title : item.text;
            return (
                <li key={item.id} className="list-item-container">
                    <div className="list-item">
                        <div className="timer-circle"></div>
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
