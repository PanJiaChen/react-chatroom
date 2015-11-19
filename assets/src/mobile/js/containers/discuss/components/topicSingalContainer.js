import {Component} from 'react'
import ReactDom from 'react-dom'
import utils from '../../../../../common/utils/utils.js'
import '../discuss.less'
//它对应的store是TopicStore^_^



class TopicContainer extends Component {
    constructor(props, context) {
        super(props, context)
    }

    static contextTypes={
        topicLineHeight: React.PropTypes.number.isRequired,
        topicMaxLines:React.PropTypes.number.isRequired,
        minInterval:React.PropTypes.object.isRequired
    }


    componentDidMount() {
        const store = this.props.store;
        store.loadTopicAjax('fasle',this.context.minInterval.topic)
    }

    componentDidUpdate(){
       const store = this.props.store;
       const state = store.getState();
       if(state.detail.length>0){
            var dom = ReactDom.findDOMNode(this);
            this.showORhide(dom)
       }
    }

    shouldComponentUpdate(nextProps, nextState) {
        // const store = this.props.store;
        // const state = store.getState();
        // console.log(nextProps==this.props)
        // console.log(nextProps.store == this.props.store)
        // console.log(nextProps.store.getState())

        // console.log(this.state.props)
        // console.log(state==nextProps.store.getState())   
        // return state==nextProps.store.getState()  
    }

    handleClick(){
        const max='36';
        const parent = this.parentNode;
        const tag='folded';
        const contentDom=parent.getElementsByClassName('user-word')[0];
        if(this.className.indexOf(tag)>=0){
            contentDom.style.maxHeight='initial';
            contentDom.style.overflow='initial';
            this.setAttribute("class", "fold-button");
        }else{
            contentDom.style.maxHeight=max+'px';
            contentDom.style.overflow='hidden';
            this.setAttribute("class", "fold-button folded");
        }
        
    }

    showORhide(dom){
        const lineHeight=this.context.topicLineHeight;
        const maxLines=this.context.topicMaxLines;
        var contentDom = dom.getElementsByClassName('user-word')[0]
        var style = window.getComputedStyle(contentDom,null);
        var parent=dom.getElementsByClassName('user-word-container')[0];
        var target=dom.getElementsByClassName('fold-button');
        var max=lineHeight*maxLines;
        if(parseInt(style.height) > lineHeight*maxLines){
             contentDom.style.maxHeight=max+'px';
            if(target.length==0){
                var div = document.createElement("div");
                 div.setAttribute("class", "fold-button folded");
                 div.addEventListener( 'click', this.handleClick );
　　　　          div.innerHTML = "展开";
                parent.appendChild(div)
            }
        }
    }

    render() {
        console.log('我在render啊啊啊！')
        const store = this.props.store;
        const state = store.getState();
        if(state.detail.length<=0){
              return(
                    <div className='topic-enpty-container'>主持人正在来的路人</div>
                )
        }
        const detail= state.detail[0]
        const publishTime = utils.formatTime(detail.createdAt);
        
        return (
            <div className='topic-container'>
                <div className='list-item-container '>
                    <div className="user-avatar">
                        {/*<img src={detail.user['avatar']}/>*/}
                        <img
                            src='http://cv.qiaobutang.com/uploads/social_avatars/2015/9/10/10/55f0e5880cf20c2d88d33a43/large.JPG?v1441850761756 '/>
                    </div>
                    <div className="user-content">
                        <div className='chat-meta clearfix'>
                            <div className="user-detail">
                                {detail.user["username"]}
                            </div>
                            <div className="user-time">
                                {publishTime}
                            </div>
                        </div>
                        <div className="user-word-container">
                            <div className="user-word" >
                                {detail.text}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default TopicContainer;