import {Component} from 'react'
import utils from '../../../../../common/utils/utils.js'


export default class CommentList extends Component {

    static defaultProps = {
        list: []
    }


    constructor(props, context) {
        super(props, context)
    }

    render() {
        var list = this.props.listDetail;
        if(!list[0].content){
            return <div></div>
        }
        var repeatLi = list.map(item=> {
            var publishTime = utils.formatTime(item.createdAt);
            return (
                <li key={item.id} className="list-item-container">
                    <div className="user-avatar" key={"avatar"}>
                        {/*<img src={item.user["avatar"]}/>*/}
                        <img src='http://cv.qiaobutang.com/uploads/social_avatars/2015/9/10/10/55f0e5880cf20c2d88d33a43/large.JPG?v1441850761756' />
                    </div>
                    <div className="user-content" key={"userContent"}>
                        <div className="user-detail">
                            {item.user["name"]}
                        </div>
                        <div className="user-time">
                            {publishTime}
                        </div>
                        <div className="user-word">
                            {item.content}
                        </div>
                    </div>
                </li>
            )
        })

        return (
            <ul className='comment-list'>
                {repeatLi}
            </ul>
        )
    }

}
