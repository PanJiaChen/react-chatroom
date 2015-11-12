import {Component} from 'react'
import utils from '../../../../../common/utils/utils.js'


export default class CommentReplay extends Component {

    static defaultProps = {}


    constructor(props, context) {
        super(props, context)
    }

    render() {
        console.log(this.props.userDetail)
        var userDetail=this.props.userDetail;

        if(!userDetail.id){
            var userAvatar=(<div className='user-avatar'><img src='' /></div>)
        }else{
            var userAvatar=(<div className='user-avatar'><img src={userDetail.avatar} /></div>)
        }
       
        return (
            <div className='comment-reply-container'>
                {userAvatar}
                <textarea ref="commentReplyTextarea" className='comment-reply-textarea' placeholder="我也说几句"></textarea>
                <div className="reply-btn" onClick={this.handleClick.bind(this)} >发表</div>
            </div>
        )
    }

    handleClick(event){
        const store = this.props.store;
        var input = this.refs.commentReplyTextarea;
        var inputVal=input.value;
        store.userValidateAjax('fasle')
    }
}
