import {Component} from 'react'
import utils from '../../../../common/utils/utils.js'
import './comment.less'
import CommentList from './components/CommetList.js'

class CommentContainer extends Component {
    constructor(props, context) {
        super(props, context)
    }

    static contextTypes = {}

    state = {

    }

    componentDidMount() {
        const store = this.props.store;
        store.loadCommentAjax('fasle')
    }

    render() {
        const store = this.props.store;
        const state = store.getState();
        console.log(state)

        return (
            <div className='comment-container'>
                <div className="comment-topic">讨论区</div>
                <CommentList listDetail={state.comments} />
            </div>
        )
    }

}

export default CommentContainer;