import {Component} from 'react'
import ReactDOM from 'react-dom'
import utils from '../../../../../common/utils/utils.js'


export default class CommentList extends Component {
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


    componentDidUpdate() {
        const store = this.props.store;
        const state=store.getState();
        const targetDiv=$('.comment-list')[0];
        if(state.toLoacateBottom){
            targetDiv.scrollTop=targetDiv.scrollHeight
        }
    }

    render() {
        var list = this.props.listDetail;
        if(list.length<=1){
            return (
                <div className='comment-list commentList-empty'>
                    <div className='commentList-empty-img'>
                    </div>
                    暂无讨论
                </div>
            )
        }
        var repeatLi = list.map(item=> {
            var publishTime = utils.formatTime(item.createdAt);
            return (
                <li key={item.id} className="list-item-container clearfix">
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
