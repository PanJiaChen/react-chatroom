import {Component} from 'react'
import utils from '../../../../common/utils/utils.js'
import './articleSingal.less'



class ArticleContainer extends Component {
    constructor(props, context) {
        super(props, context)
    }

    static contextTypes = {}

    state = {
    }

    componentDidMount() {
        
        }

    render() {
        const store = this.props.store;
        const state = store.getState();
        if(state.articles.length>0){
            var article=state.articles[0];
            var publishTime = utils.formatTime(article.createdAt);
        }else{
            return <div></div>
        }
        return (
            <div className='article-container'>
                <div className='clearfix'>
                    <div className='title'>直播中</div>
                    <div className='article-time'>
                        {publishTime}
                    </div>
                </div>
                <div className='article-content'>
                    {article.title}
                </div>
                <div className='article-img'>
                    {article.image}
                </div>
               
            </div>
        )
    }

}

export default ArticleContainer;