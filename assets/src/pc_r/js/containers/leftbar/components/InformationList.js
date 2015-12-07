import {Component} from 'react'
import utils from '../../../../../common/utils/utils.js'
import Thumbnail from '../../../components/Thumbnail.js'
//它对应的store是ArticlStore^_^

export default class LeftbarList extends Component {

    static contextTypes={
        commentLineHeight: React.PropTypes.number.isRequired,
        commentMaxLines: React.PropTypes.number.isRequired,
        minInterval:React.PropTypes.object.isRequired
    }

    static defaultProps = {
        list: []
    }


    constructor(props, context) {
        super(props, context)
    }

    componentDidMount(){
        console.log('资讯')
        const store = this.props.store;
        store.loadArticleAjax('fasle',this.context.minInterval.article)
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

        return (
            <ul className='article-list'>
               {repeatLi}
            </ul>
        )
    }

}
