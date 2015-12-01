import {Component} from 'react'
import utils from '../../../../../common/utils/utils.js'


export default class CommentReplay extends Component {

    static defaultProps = {}


    constructor(props, context) {
        super(props, context)
    }

    render() {
        var userDetail=this.props.userDetail;

        if(!userDetail.id){
            var userAvatar=(<div ref='userAvatar' className='user-avatar'><img src='' /></div>)
        }else{
            var userAvatar=(<div ref='userAvatar' className='user-avatar has-login'><img src={userDetail.avatar} /></div>)
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
        console.log(this.refs.userAvatar.getAttribute('class'))
        if(this.ref.userAvatar.getAttribute('class')=='user-avatar has-login'){
            var input = this.refs.commentReplyTextarea;
            var inputVal=input.value;
            store.replyCommentAjax('fasle',inputVal)
            co
        }else{
            store.userValidateAjax('fasle')
        } 
    }
}
