import {Component} from 'react'
import ReactDom from 'react-dom'
import utils from '../../../../../common/utils/utils.js'
import '../discuss.less'
//它对应的store是TopicStore^_^

class TopicContainer extends Component {
    constructor(props, context) {
        super(props, context)
    }

    static contextTypes = {
        topicLineHeight: React.PropTypes.number.isRequired,
        topicMaxLines: React.PropTypes.number.isRequired,
        minInterval: React.PropTypes.object.isRequired
    }

    state = {
        foldedMap: {}
    }

    componentDidMount() {
        const store = this.props.store;
        store.loadTopicAjax('fasle', this.context.minInterval.topic)
    }

    componentDidUpdate() {
        const store = this.props.store;
        const state = store.getState();
        if (state.detail.length > 0) {
            var dom = ReactDom.findDOMNode(this);
            this.showORhide(dom)
        }
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     const store = this.props.store;
    //     const state = store.getState();
    //     console.log(nextProps==this.props)
    //     console.log(nextProps.store == this.props.store)
    //     console.log(nextProps.store.getState())

    //     console.log(this.state.props)
    //     console.log(state==nextProps.store.getState())   
    //     return state==nextProps.store.getState()  
    // }

    handleClick(e) {
        const contentDom = e.target.parentNode.getElementsByClassName('user-word')[0]
        const id = contentDom.getAttribute('data-id');
        const foldedMap = this.state.foldedMap;

        if (foldedMap[id] == 'show') {
            foldedMap[id] = 'hide'
            console.log(foldedMap)
            this.setState({foldedMap: foldedMap})
        } else {
            foldedMap[id] = 'show';
            console.log(foldedMap)
            this.setState({foldedMap: foldedMap})
        }
    }

    showORhide(dom) {
        console.log('我在showhide')
        const lineHeight = this.context.topicLineHeight;
        const maxLines = this.context.topicMaxLines;
        var max = lineHeight * maxLines;
        const foldedMap = this.state.foldedMap;
        var contentDom = dom.getElementsByClassName('user-word')[0];
        var style = window.getComputedStyle(contentDom, null);
        const id = +contentDom.getAttribute('data-id');

        if (parseInt(style.height) > lineHeight * maxLines) {
            if (id in foldedMap) {
                return
            } else {
                var idMap = [];
                idMap = this.state.foldedMap;
                idMap[id] = 'hide'
                this.setState({foldedMap: idMap});
            }
        }
    }

    render() {
        console.log('我在render啊啊啊！')
        const store = this.props.store;
        const state = store.getState();
        if (state.detail.length <= 0) {
            return (
                <div className='topic-enpty-container'>主持人正在来的路人</div>
            )
        }

        const detail = state.detail[0]
        const publishTime = utils.formatTime(detail.createdAt);
        const foldedMap = this.state.foldedMap;
        const id = detail.id
        var userWordContainer
        if (id in foldedMap) {
            if (foldedMap[id] == 'show') {
                var userWordContainer = (
                    <div className="user-word-container">
                        <div className="user-word" style={{'maxHeight':'initial','overFlow':'initial'}}
                             data-id={detail.id}>
                            {detail.text}
                        </div>
                        <div className="fold-button folded" onClick={this.handleClick.bind(this)}>收起</div>
                    </div>
                )
            } else {
                var userWordContainer = (
                    <div className="user-word-container">
                        <div className="user-word" style={{'maxHeight':'36px','overFlow':'hidden'}} data-id={detail.id}>
                            {detail.text}
                        </div>
                        <div className="fold-button" onClick={this.handleClick.bind(this)}>展开</div>
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
                        {userWordContainer}
                    </div>
                </div>
            </div>
        )
    }
}

export default TopicContainer;