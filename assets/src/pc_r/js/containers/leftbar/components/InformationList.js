import {Component} from 'react'
import utils from '../../../../../common/utils/utils.js'
import Thumbnail from '../../../components/Thumbnail'

//它对应的store是ArticlStore^_^

export default class LeftbarList extends Component {

    static contextTypes={
        minInterval:React.PropTypes.object.isRequired
    }

    state = {
        page:2
    }

    constructor(props, context) {
        super(props, context)
    }

    componentDidMount(){
        const store = this.props.store;
        store.loadArticleAjax('fasle',this.context.minInterval.article)
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
                    暂无最新资讯
                </div>
            )
        }
        var repeatLi = list.map(item=> {
            var publishTime = utils.formatTime(item.createdAt);
            var content = item.title ? item.title : item.text;
            //缩略图
            var thumbnail;
            const imagesLength=item.imageUrls.length;
            if(imagesLength>0){
                const IMAGES=[];
                if(imagesLength>=2){
                    var tooltips=(<div className='img-tooltips'>多图</div>)
                }else{
                     var tooltips=''
                }
                item.imageUrls.map(item=>{
                    IMAGES.push({src:item})
                })
                thumbnail=(
                    <div className="thumbnail-container">
                        <Thumbnail heading={'点击查看'} showImg={item.imageUrls[0]} images={IMAGES}/>
                       {tooltips}
                    </div>
                )
            }

            return (
                <li key={item.id} className="list-item-container">
                    <div className="list-item">
                        <div className="timer-outside-circle">
                            <div className="timer-inside-circle"></div>
                        </div>
                        <div className="list-content">{content}</div>
                        {thumbnail}
                        <div className="timer">{publishTime}</div>
                    </div>
                </li>
            )
        })

        //判读是否有加载
        var loadBtnClass;
        const limit=15;//第一页超过多少出现分页的个数;
        const informationListLength=list.length;
        if(state.hasLoadMoreBtn || informationListLength>=limit){
            loadBtnClass="load-more active"
        }else{
            loadBtnClass="load-more"
        }

        return (
            <ul className='article-list'>
               {repeatLi}
               <div className={loadBtnClass}  onClick={this.loadMore.bind(this)}>加载更多</div>
            </ul>
        )
    }

}
