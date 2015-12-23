import {Component} from 'react'
import ReactDom from 'react-dom'
import utils from '../../../../../common/utils/utils.js'
import '../discuss.less'
import Thumbnail from '../../../components/Thumbnail.js'
import TopList from './TopicList.js'

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

    handleClick=(e)=> {
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

    render() {
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
            const contextLineHeight = this.context.topicLineHeight*this.context.topicMaxLines;
            if (foldedMap[id] == 'show') {
                var lineHeight=foldedMap[id+'lineHeight']
                var userWordContainer = (
                    <div className="user-word-container">
                        <div className="user-word" style={{'maxHeight':lineHeight}}
                             data-id={detail.id}>
                            {detail.text}
                        </div>
                        <div className="fold-button folded" onClick={this.handleClick}>收起</div>
                    </div>
                )
            } else {
                var userWordContainer = (
                    <div className="user-word-container">
                        <div className="user-word" style={{'maxHeight':contextLineHeight}} data-id={detail.id}>
                            {detail.text}
                        </div>
                        <div className="fold-button" onClick={this.handleClick}>展开</div>
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

        //缩略图展示
        var thumbnail;
        if(detail.images.length>0){
            const IMAGES=[];
            detail.images.map(item=>{
                IMAGES.push({src:item})
            })
            thumbnail=(
                <div className="thumbnail-container">
                    <div className='thumbnail'></div>
                    <Thumbnail heading={'点击查看'} images={IMAGES}/>
                </div>
            )
        }
        var screenName;
        detail.user["screenName"]?screenName=detail.user["screenName"]:screenName=detail.user["username"];
        return (
            <div className='topic-container'>
                <div className='list-item-container '>
                    <div className="user-avatar">
                        <img src={detail.user['avatar']} />
                    </div>
                    <div className="user-content">
                        <div className='chat-meta clearfix'>
                            <div className="user-detail">
                                {screenName}
                            </div>
                            <div className="user-time">
                                {publishTime}
                            </div>
                        </div>
                        {userWordContainer}
                        {thumbnail}
                    </div>
                </div>
                <TopList topicDetail={state.detail} /> 
            </div>
        )
    }
}

export default TopicContainer;