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
        console.log('话题')
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
                <div className='topic-enpty-container'>主持人正在来的路人</div>
            )
        }
        var repeatLi = list.map(item=> {
            const publishTime = utils.formatTime(item.createdAt);
            const content = item.text;

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
                            <div className="list-content">{content}</div>
                            {thumbnail}
                       </div>                        
                    </div>
                </li>
            )
        })
        
        //判读是否有加载
        var loadBtnClass;
        console.log('判断class'+state.hasLoadMoreBtn)
        if(state.hasLoadMoreBtn){
            loadBtnClass="load-more active"
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
