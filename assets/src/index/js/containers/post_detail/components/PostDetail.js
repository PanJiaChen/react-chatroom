import {Component} from 'react'


export default class PostDetail extends Component{

    static defaultProps={
        list:[]
    }

    constructor(props,context){
        super(props,context)
    }


    render(){
        const postObj = this.props.postObj;
        const user = postObj.user
        const authorName = user.screenName?user.screenName:user.username
        return (
            <div className='post-detail'>
                <div className='pd-title'>{postObj.title}</div>
                <div className='pd-info'>文 /{authorName} </div>
                <div className='pd-content' dangerouslySetInnerHTML={{__html:postObj.content}}></div>
            </div>
        )
    }

}