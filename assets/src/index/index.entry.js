import ReactDom from 'react-dom'
import LeftbarContainer from './js/containers/leftbar/LeftBarContainer.js'
import LeftBarStore from './js/store/LeftBarStore.js'
import {enhanceWithStore} from 'zlux'
import './less/index.less'


const leftBarStore = new LeftBarStore()

const LeftBarElement = enhanceWithStore(LeftbarContainer,leftBarStore)


ReactDom.render(
    (
        <LeftBarElement />
    ),
    document.getElementById('container')
)

// setTimeout(function(){
//     require.ensure([],function(){
//         require('./js/async.js')
//     })
// },1000)