import {Component} from 'react'
import utils from '../../../../common/utils/utils.js'
import './comment.less'
import CommentList from './components/CommentList.js'
import CommentReply from './components/CommentReply'

class CommentContainer extends Component {
    constructor(props, context) {
        super(props, context)
    }

    static contextTypes={
        commentLineHeight: React.PropTypes.number.isRequired,
        commentMaxLines: React.PropTypes.number.isRequired,
        minInterval:React.PropTypes.object.isRequired
    }

    state = {
        height:0
    }

    componentDidMount() {
        const store = this.props.store;
        const state = store.getState();
        store.loadCommentAjax('fasle',this.context.minInterval.comment,state.up_id)
        store.userValidateAjax('fasle');
        const _height=window.document.body.offsetHeight;
         const commentTopicH=$('.comment-topic').outerHeight();
         const commentReplyH=$('.comment-reply-container').outerHeight();
         const height=_height-commentTopicH-commentReplyH-54-101-160;
         this.setState({height: height});
    }

    render() {
        const store = this.props.store;
        const state = store.getState();
        return (
            <div className='comment-container'>
                <div className="comment-topic">讨论区</div>
                <div className='comment-list-wrapper' style={{'height':this.state.height}}>
                    <CommentList store={store} listDetail={state.comments} />
                </div>
                <CommentReply store={store} userDetail={state.userDetail} />
            </div>
        )
    }

}

export default CommentContainer;