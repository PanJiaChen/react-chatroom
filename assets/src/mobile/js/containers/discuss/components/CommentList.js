import {Component} from 'react'
import utils from '../../../../../common/utils/utils.js'
import '../discuss.less'


export default class CommentList extends Component {

    static defaultProps = {
        list: []
    }


    constructor(props, context) {
        super(props, context)
    }

    componentDidMount() {
        console.log('评论初始化')
        const store = this.props.store;
        store.loadCommentAjax('fasle')
    }


    render() {
        const store = this.props.store;
        const state = store.getState();

        var list = state.comments;
        if (list.length<=0) {
            return (
                <div className='commentList-empty'>
                    <div className='commentList-empty-img'></div>
                    暂无讨论
                </div>
            )
        }
        var repeatLi = list.map(item=> {
            var publishTime = utils.formatTime(item.createdAt);
            return (
                <li key={item.id} className="list-item-container">
                    <div className="user-avatar" key={"avatar"}>
                        <img
                            src={'http://cv.qiaobutang.com/uploads/social_avatars/2015/9/10/10/55f0e5880cf20c2d88d33a43/large.JPG?v1441850761756'}/>
                    </div>
                    <div className="user-content " key={"userContent"}>
                        <div className='chat-meta clearfix'>
                            <div className="user-detail">
                                {item.user["name"]}
                            </div>
                            <div className="user-time">
                                {publishTime}
                            </div>
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
