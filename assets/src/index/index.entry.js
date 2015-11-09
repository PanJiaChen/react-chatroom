import ReactDom from 'react-dom'
import LeftbarContainer from './js/containers/leftbar/LeftBarContainer.js'
import TContainer from './js/containers/title/TitleContainer'
import LeftBarStore from './js/store/LeftBarStore.js'
import {enhanceWithStore} from 'react-zlux'
import './less/index.less'


const leftBarStore = new LeftBarStore()

const LeftBarElement = enhanceWithStore(LeftbarContainer, leftBarStore)
const TitleElement = enhanceWithStore(TContainer, leftBarStore)

ReactDom.render(
    (
        <div className="react-container">
            <LeftBarElement />
            <TitleElement />
        </div>
    ),
    document.getElementById('container')
)

// setTimeout(function(){
//     require.ensure([],function(){
//         require('./js/async.js')
//     })
// },1000)