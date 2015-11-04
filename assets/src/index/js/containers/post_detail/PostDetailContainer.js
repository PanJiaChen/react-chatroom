import {Component} from 'react'
import utils from '../../utils/utils.js'
//import ReactMixin from 'react-mixin'
import {History} from 'react-router'

import {Link} from 'react-router'
import PostDetail from './components/PostDetail.js'
import CommonError from '../error/CommonError.js'
const { object } = React.PropTypes

import './post-detail.less'

class PostDetailContainer extends Component{
    constructor(props,context){
        super(props,context)
        this.history  = this.props.history || this.context.history
    }

    static contextTypes={
        history:object.isRequired
    }


    componentDidMount(){
        const props = this.props;

        const postId = props.postId || props.params.postId;

        if(!postId)return ;
        const store = this.props.store;
        //console.log(postId)
        store.loadPostDetail({postId:postId})
    }

    render(){
        const store = this.props.store;
        const state = store.getState();
        if(state.errMsg){
            return <CommonError errMsg={state.errMsg}/>
        }
        let postObj = state.postObj
        if(!postObj){
            postObj={
                title:'',
                content:'',
                user:{screenName:''}
            }
        }

        if(state.isLoading){
            return <div style={{textAlign:'center'}}>loading</div>
        }

        return (
            <div className='post-detail-container'>
                 <div className='app-header'>
                 <a className='app-header-left' onClick={()=>this.history.goBack()}> {"< 返回"} </a>
                 <div className='app-title'>文章详情</div>
                 <a className='app-header-right' href='/'> </a>
                 </div>
                <PostDetail postObj={postObj}/>
            </div>
        )

    }
}
//ReactMixin(PostDetailContainer.prototype,History)

export default PostDetailContainer;

/*
 <div className='app-header'>
 <a className='app-header-left' href='#/'> {"< back"} </a>
 <div className='app-title'>文章详情</div>
 <a className='app-header-right' href='#/'> </a>
 </div>*/