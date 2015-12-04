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
            var userAvatar=(<div id='js-user-avatar' className='user-avatar'><img src='' /></div>)
        }else{
            var userAvatar=(<div id='js-user-avatar' className='user-avatar has-login'><img src={userDetail.avatar} /></div>)
        }
       
        return (
            <div className='comment-reply-container'>
                {userAvatar}
                <textarea id='js-comment-reply-textarea' className='comment-reply-textarea' placeholder="我也说几句"></textarea>
                <div className="reply-btn" onClick={this.handleClick.bind(this)} >发表</div>
            </div>
        )
    }

    handleClick(event){
        const store = this.props.store;
        const avatarClass=$('#js-user-avatar').attr('class');
        const input=$('#js-comment-reply-textarea')
         console.log('卧槽'+$('.comment-list')[0].scrollHeight)
         $('.comment-list')[0].scrollTop=$('.comment-list')[0].scrollHeight
        $('.comment-list').addClass('apple')
        if(avatarClass=='user-avatar has-login'){
            var inputVal = input.val();
            console.log(inputVal)
            store.replyCommentAjax('fasle',inputVal);
            input.val('');

        }else{
            store.userValidateAjax('fasle')
        } 
    }
}
