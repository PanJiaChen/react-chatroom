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
        foldedMap: {}
    }

    constructor(props, context) {
        super(props, context)
    }


    componentDidUpdate() {
        const store = this.props.store;
        const state=store.getState();
        //滚动轴定位
        const targetDiv=$('.comment-list')[0];
        if(state.toLoacateBottom){
            targetDiv.scrollTop=targetDiv.scrollHeight
        }

        //展开收起
        if (state.comments.length > 0) {
            var dom = ReactDOM.findDOMNode(this);
            this.showORhide(dom)
        }
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
        console.log(contentDom)
        const id = contentDom.getAttribute('data-id');
        console.log(id)
        const foldedMap = this.state.foldedMap;

        if (foldedMap[id] == 'show') {
            foldedMap[id] = 'hide'

            this.setState({foldedMap: foldedMap})
        } else {
            foldedMap[id] = 'show';

            this.setState({foldedMap: foldedMap})
        }
    }



    render() {
        var list = this.props.listDetail;
        if(list.length<=1){
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
                            <div className="user-word" onClick={this.handleClick.bind(this)}  style={{'maxHeight':lineHeight}}
                                 data-id={item.id}>
                                {item.content}
                            </div>
                            <div className="fold-button folded" onClick={this.handleClick.bind(this)}></div>
                        </div>
                    )
                } else {
                    var userWordContainer = (
                        <div className="user-word-container">
                            <div className="user-word" onClick={this.handleClick.bind(this)} style={{'maxHeight':contextLineHeight}} data-id={item.id}>
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
            return (
                <li key={item.id} className={commentCss}>
                    <div className="user-avatar" key={"avatar"}>
                        {/*<img src={item.user["avatar"]}/>*/}
                        <img src='http://cv.qiaobutang.com/uploads/social_avatars/2015/9/10/10/55f0e5880cf20c2d88d33a43/large.JPG?v1441850761756' />
                    </div>
                    <div className="user-content" key={"userContent"}>
                        <div className="user-detail">
                            {item.user["name"]}
                        </div>
                        <div className="user-time">
                            {publishTime}
                        </div>
                        {userWordContainer}
                    </div>
                </li>
            )
        })

        return (
            <ul className='comment-list'>
                {repeatLi}
            </ul>
        )
    }

}
