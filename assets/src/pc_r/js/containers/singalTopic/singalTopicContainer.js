import {Component} from 'react'
import ReactDOM  from 'react-dom'
import utils from '../../../../common/utils/utils.js'
import './singalTopic.less'

class TopicContainer extends Component {
    constructor(props, context) {
        super(props, context)
    }

    static contextTypes = {
        topicLineHeight: React.PropTypes.number.isRequired,
        topicMaxLines: React.PropTypes.number.isRequired
    }

    state = {
        foldedMap: {}
    }

    componentDidMount() {

    }

    componentDidUpdate() {
        const store = this.props.store;
        const state = store.getState();
        if (state.detail.length > 0) {
            var dom = ReactDOM .findDOMNode(this);
            this.showORhide(dom)
        }
        const topicH=$('.topic-container').outerHeight();
        if(this.props.topicHeight!=topicH){
            this.props.resize(topicH)
        }
    }

    showORhide(dom) {
        const lineHeight = this.context.topicLineHeight;
        const maxLines = this.context.topicMaxLines;
        var max = lineHeight * maxLines;
        const foldedMap = this.state.foldedMap;
        var contentDom = dom.getElementsByClassName('user-word')[0];
        var style = window.getComputedStyle(contentDom, null);
        const id = +contentDom.getAttribute('data-id');
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

    handleClick(e) {
        const contentDom = e.target.parentNode.getElementsByClassName('user-word')[0]
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

    render() {
        const store = this.props.store;
        const state = store.getState();
        const detail=state.detail[0];
        const contextLineHeight = this.context.topicLineHeight*this.context.topicMaxLines;
        if(!detail){
            return <div></div>
        }
        const publishTime = utils.formatTime(detail.createdAt);
        const username='[主持人]'+detail.user["username"];

        const foldedMap = this.state.foldedMap;
        const id = detail.id;
        if (id in foldedMap) {
            if (foldedMap[id] == 'show') {
                var lineHeight=foldedMap[id+'lineHeight']
                var userWordContainer = (
                    <div className="user-word-container">
                        <div className="user-word" onClick={this.handleClick.bind(this)}  style={{'maxHeight':lineHeight,'overflow':'initial'}}
                             data-id={detail.id}>
                            {detail.text}
                        </div>
                        <div className="fold-button folded" onClick={this.handleClick.bind(this)}></div>
                    </div>
                )
            } else {
                var userWordContainer = (
                    <div className="user-word-container">
                        <div className="user-word" onClick={this.handleClick.bind(this)} style={{'maxHeight':contextLineHeight,'overflow':'hidden','cursor':'pointer'}} data-id={detail.id}>
                            {detail.text}
                        </div>
                        <div className="fold-button" onClick={this.handleClick.bind(this)}></div>
                    </div>
                )
            }
        } else {
            var userWordContainer = (
                <div className="user-word-container">
                    <div className="user-word" data-id={detail.id}>
                        {detail.text}
                    </div>
                </div>
            )
        }

        return (
            <div className='topic-container clearfix'>
                <div className="user-avatar">
                    <img src={detail.user['avatar']}/>
                </div>
                <div className="user-content">
                    <div className="user-meta">
                        <div className="user-detail">
                            {username}
                        </div>
                        <div className="user-time">
                            {publishTime}
                        </div>
                    </div>
                    {userWordContainer}
                </div>
            </div>
        )
    }

}

export default TopicContainer;