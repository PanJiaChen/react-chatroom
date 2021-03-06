import {Component} from 'react'
import ReactDom from 'react-dom'
import utils from '../../../../../common/utils/utils.js'
import '../discuss.less'
//它对应的store是CommentStore^_^

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

    componentDidMount() {
        const store = this.props.store;
        store.loadCommentAjax('fasle',this.context.minInterval.comment)
    }

    componentDidUpdate() {
        const store = this.props.store;
        const state = store.getState();
        if (state.comments.length > 0) {
            var dom = ReactDom.findDOMNode(this);
            this.showORhide(dom)
        }
    }

    // 展开收起click
    handleClick=(e)=> {
        const contentDom = e.target.previousSibling;
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

    //展开收起
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
                    idMap[id] = 'hide';
                    idMap[id+'lineHeight']=parseInt(style.height);
                    this.setState({foldedMap: idMap});
                }
            }
        }
    }

    render() {
        const store = this.props.store;
        const state = store.getState();

        const list = state.comments;
        //空状态
        if (list.length<=0) {
            return (
                <div className='commentList-empty'>
                    <div className='commentList-empty-img'>
                    </div>
                    暂无讨论
                </div>
            )
        }

        //判断展开收起状态
        const foldedMap = this.state.foldedMap;
        var repeatLi = list.map(item=> {
            var publishTime = utils.formatTime(item.createdAt);
            const id = item.id;
            if (id in foldedMap) {
                const contextLineHeight = this.context.commentLineHeight*this.context.commentMaxLines;
                if (foldedMap[id] == 'show') {
                    var lineHeight=foldedMap[id+'lineHeight']
                    var userWordContainer = (
                        <div className="user-word-container">
                            <div className="user-word" style={{'maxHeight':lineHeight}}
                                 data-id={item.id}>
                                {item.content}
                            </div>
                            <div className="fold-button folded" onClick={this.handleClick}>收起</div>
                        </div>
                    )
            } else {
                var userWordContainer = (
                    <div className="user-word-container">
                        <div className="user-word" style={{'maxHeight':contextLineHeight}} data-id={item.id}>
                            {item.content}
                        </div>
                        <div className="fold-button" onClick={this.handleClick}>展开</div>
                    </div>
                )
            }   
            }else{
                var userWordContainer = (
                    <div className="user-word-container">
                        <div className="user-word" data-id={item.id}>
                            {item.content}
                        </div>
                    </div>
                )
            }
            return (

                <li key={item.id} className="list-item-container">
                    <div className="user-avatar" key={"avatar"}>
                        <img src={item.user['avatar']} />
                    </div>
                    <div className="user-content " key={"userContent"}>
                        <div className='chat-meta clearfix'>
                            <div className="user-detail">
                                {item.user["name"]}
                            </div>
                            <div className="user-time">
                                {publishTime}
                            </div>
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
