import {Component} from 'react'
import ReactDOM from 'react-dom'
import utils from '../../../../../common/utils/utils.js'


export default class CommentList extends Component {
    static contextTypes={
        commentLineHeight: React.PropTypes.number.isRequired,
        commentMaxLines: React.PropTypes.number.isRequired,
        minInterval:React.PropTypes.object.isRequired
    }

    state = {
        foldedMap: {},
        isInit:true
    }

    constructor(props, context) {
        super(props, context)
    }


    componentDidUpdate() {
        const store = this.props.store;
        const state=store.getState();
        //滚动轴定位
        if(state.toLoacateBottom && this.state.isInit){
            this.toLoacate();
        }

        //展开收起
        if (state.comments.length > 0) {
            var dom = ReactDOM.findDOMNode(this);
            this.showORhide(dom)
            if(this.state.isInit){
                this.setState({isInit: false});
            }
            
        }
    }

    //滚动轴定位
    toLoacate(){
        const store = this.props.store;
        const state=store.getState();
        const targetDiv=$('.comment-list')[0];
        targetDiv.scrollTop=targetDiv.scrollHeight+62
    }

    showORhide(dom) {
        const lineHeight = this.context.commentLineHeight;
        const maxLines = this.context.commentMaxLines;
        var max = lineHeight * maxLines;
        const foldedMap = this.state.foldedMap;
        var contentDom = dom.getElementsByClassName('user-word');

        for(let i=0;i<contentDom.length;i++){
            let id=(contentDom[i].getAttribute('data-id'));
            let style = window.getComputedStyle(contentDom[i], null);
            if (parseInt(style.height) > max) {
                if (id in foldedMap) {
                    return
                } else {
                    var idMap = [];
                    idMap = this.state.foldedMap;
                    idMap[id+'lineHeight']=parseInt(style.height);
                    idMap[id] = 'hide'
                    this.setState({foldedMap: idMap});
                }
            }
        }
    }

    handleClick(e) {
        const contentDom = $(e.target).closest('.user-word-container').find('.user-word').get(0);
        const id = contentDom.getAttribute('data-id');
        const foldedMap = this.state.foldedMap;

        if (foldedMap[id] == 'show') {
            foldedMap[id] = 'hide'
            this.setState({foldedMap: foldedMap})
        } else {
            foldedMap[id] = 'show';
            this.setState({foldedMap: foldedMap})
        }
    }

    loadMore(){
        const store = this.props.store;
        const state=store.getState();
        store.loadPageAjax('fasle',state.down_id)
    }

    clickNew(e){
        //滚动轴定位
        this.toLoacate();
        $(e.target).removeClass('show')
    }

    render() {
        const store = this.props.store;
        const state=store.getState();
        var list = this.props.listDetail;
        if(list.length<1){
            return (
                <div className='comment-list commentList-empty'>
                    <div className='commentList-empty-img'>
                    </div>
                    暂无讨论
                </div>
            )
        }
        var repeatLi = list.map(item=> {
            var publishTime = utils.formatTime(item.createdAt);
            //判断是不是主持人
            if(item.isHighlight==true){
                var commentCss="list-item-container clearfix host"
            }else{
                var commentCss="list-item-container clearfix"
            }

            //判断是否要展开收起
            const id = item.id;
            const foldedMap = this.state.foldedMap;
            const contextLineHeight = this.context.commentLineHeight*this.context.commentMaxLines;
            if (id in foldedMap) {
                if (foldedMap[id] == 'show') {
                    var lineHeight=foldedMap[id+'lineHeight']
                    var userWordContainer = (
                        <div className="user-word-container">
                            <div className="user-word" onClick={this.handleClick.bind(this)}  style={{'maxHeight':lineHeight,'cursor':'pointer'}}
                                 data-id={item.id}>
                                {item.content}
                            </div>
                            <div className="fold-button folded" onClick={this.handleClick.bind(this)}></div>
                        </div>
                    )
                } else {
                    var userWordContainer = (
                        <div className="user-word-container">
                            <div className="user-word" onClick={this.handleClick.bind(this)} style={{'maxHeight':contextLineHeight,'cursor':'pointer'}} data-id={item.id}>
                                {item.content}
                            </div>
                            <div className="fold-button" onClick={this.handleClick.bind(this)}></div>
                        </div>
                    )
                }
            } else {
                var userWordContainer = (
                    <div className="user-word-container">
                        <div className="user-word" data-id={item.id}>
                            {item.content}
                        </div>
                    </div>
                )
            }
            var screenName;
            item.user["screenName"]?screenName=item.user["screenName"]:screenName=item.user["username"];
            return (
                <li key={item.id} className={commentCss}>
                    <div className="user-avatar" key={"avatar"}>
                       <img src={item.user["avatar"]}/>
                    </div>
                    <div className="user-content" key={"userContent"}>
                        <div className="user-detail">
                            {screenName}
                        </div>
                        <div className="user-time">
                            {publishTime}
                        </div>
                        {userWordContainer}
                    </div>
                </li>
            )
        })
        
        //判断是否有新消息
        if(state.hasNewComment){
            var newCommentClass='newComment show'
        }else{
             var newCommentClass='newComment'
        }
        //判读是否有更多页
        const limit=24;//第一页超过多少出现分页的个数;
        const informationListLength=list.length;
        if(state.hasMoreComment){
            if(informationListLength>=limit){
                var hasMoreComment=(<div className='load-more show'  onClick={this.loadMore.bind(this)}>加载更多</div>)
            }else{
                var hasMoreComment=(<div className='load-more hide'>没有更多了~</div>)
            }
        }else{
            var hasMoreComment=(<div className='load-more show'>没有更多了~</div>)
        }

        return (
            <div className='comment-list-container'>
                <ul className='comment-list'>
                    {hasMoreComment}
                    {repeatLi}  
                </ul>
                <div className={newCommentClass} onClick={this.clickNew.bind(this)}>new</div>
            </div>
        )
    }

}
