import ReactDom from 'react-dom'
import LeftbarContainer from './js/containers/leftbar/LeftBarContainer.js'
import LeftBarStore from './js/store/LeftBarStore.js'

import TitleContainer from './js/containers/title/TitleContainer'
import TitleStore from './js/store/TitleStore.js'

import {enhanceWithStore} from 'react-zlux'
import './less/index.less'


const leftBarStore = new LeftBarStore()
const titleStore = new TitleStore()

const LeftBarElement = enhanceWithStore(LeftbarContainer, leftBarStore)
const TitleElement = enhanceWithStore(TitleContainer, titleStore)


ReactDom.render(
    (
        <div className="react-container">
        	<LeftBarElement />
            <div className="main-container">
                <TitleElement />
            </div>
        </div>
    ),
    document.getElementById('container')
)

// setTimeout(function(){
//     require.ensure([],function(){
//         require('./js/async.js')
//     })
// },1000)