import {Component} from 'react'
import utils from '../../../../../common/utils/utils.js'
import Thumbnail from '../../../components/Thumbnail.js'
//它对应的store是TopicStore^_^

export default class LeftbarList extends Component {

    state = {
        page:2
    }

    static contextTypes={
        minInterval:React.PropTypes.object.isRequired
    }


    constructor(props, context) {
        super(props, context)
    }

    componentDidMount(){
        const store = this.props.store;
        store.loadTopicAjax('fasle',this.context.minInterval.topic)
    }

    loadMore(){
        const page=this.state.page;
        const store = this.props.store;
        store.loadPageAjax('fasle',page)
        this.setState({page: page+1});
    }

    render() {
        const store = this.props.store;
        const state = store.getState();
        const list=state.detail;
        if (list.length <= 0) {
            return (
                <div className='information-empty-container'>
                    <div className='information-empty-img'>
                    </div>
                    暂无相关话题
                </div>
            )
        }
        var repeatLi = list.map(item=> {
            const publishTime = utils.formatTime(item.createdAt);
            const content = item.text.replace("\n", "<br />","g");

            //缩略图
            var thumbnail;
            const imagesLength=item.images.length;
            if(imagesLength>0){
                const IMAGES=[];
                if(imagesLength>=2){
                    var tooltips=(<div className='img-tooltips'>多图</div>)
                }else{
                     var tooltips=''
                }
                item.images.map(item=>{
                    IMAGES.push({src:item})
                })
                thumbnail=(
                    <div className="thumbnail-container">
                        <Thumbnail heading={'点击查看'} showImg={item.images[0]} images={IMAGES}/>
                       {tooltips}
                    </div>
                )
            }

            return (
                <li key={item.id} className="list-item-container">
                    <div className="list-item clearfix">
                       <img className="list-avatar" src={item.user.avatar} />
                       <div className="list-content-container">
                            <div className="list-meta">
                                <div className="username">{item.user.screenName?item.user.screenName:item.user.username}</div>
                                <div className="timer">{publishTime}</div>
                            </div>
                            <div className="list-content" dangerouslySetInnerHTML={{__html: content}} />
                            {thumbnail}
                       </div>                        
                    </div>
                </li>
            )
        })
        
        //判读是否有加载
        var loadBtnClass;
        const limit=15;//第一页超过多少出现分页的个数;
        const topicListLength=list.length;

        if(state.hasLoadMoreBtn){
            if(topicListLength>=limit){
                loadBtnClass="load-more active"
            }else{
                loadBtnClass="load-more"
            }
        }else{
            loadBtnClass="load-more"
        }

        return (
            <ul className='topic-list'>
               {repeatLi}
               <div className={loadBtnClass}  onClick={this.loadMore.bind(this)}>加载更多</div>
            </ul>
        )
    }


}
