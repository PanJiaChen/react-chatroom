import {Component} from 'react'
import utils from '../../../../common/utils/utils.js'
import './article.less'

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
        return (
            <div className='article-container'>
              article
            </div>
        )
    }

}

export default ArticleContainer;