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

    }

    componentDidMount() {
        const store = this.props.store;
        store.loadCommentAjax('fasle',this.context.minInterval.comment)
    }

    render() {
        const store = this.props.store;
        const state = store.getState();

        return (
            <div className='comment-container'>
                <div className="comment-topic">讨论区</div>
                <CommentList listDetail={state.comments} />
                <CommentReply store={store} userDetail={state.userDetail} />
            </div>
        )
    }

}

export default CommentContainer;