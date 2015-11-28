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
            var userAvatar=(<div  className='user-avatar'><img src='' /></div>)
        }else{
            var userAvatar=(<div className='user-avatar has-login'><img src={userDetail.avatar} /></div>)
        }
       
        return (
            <div className='comment-reply-container'>
                {userAvatar}
                <textarea className='comment-reply-textarea' placeholder="我也说几句"></textarea>
                <div className="reply-btn" onClick={this.handleClick.bind(this)} >发表</div>
            </div>
        )
    }

    handleClick(event){
        const store = this.props.store;
        if(this.refs.userAvatar.getAttribute('class')=='user-avatar has-login'){
            var input = this.refs.commentReplyTextarea;
            var inputVal=input.value;
            store.replyCommentAjax('fasle',inputVal)
        }else{
            store.userValidateAjax('fasle')
        } 
    }
}
