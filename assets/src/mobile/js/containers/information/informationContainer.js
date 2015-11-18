import {Component} from 'react'
import utils from '../../../../common/utils/utils.js'
import './information.less'
import {enhanceWithStore} from 'react-zlux'

import InformationListContainer from './components/InformationList.js'
import InformationStore from '../../store/ArticleStore.js'
const informationStore = new InformationStore();
const InformationListElement = enhanceWithStore(InformationListContainer, informationStore);

// {
//     store:informationStore,
//     getContainer:function(){
//         return enhanceWithStore(container,this.store);
//     }
// }
class InformationContainer extends Component {
    constructor(props, context) {
        super(props, context)
    }

    static contextTypes = {}

    state = {}

    componentDidMount() {

    }

    render() {
        return (
            <div className='information-container'>
                <InformationListElement />
            </div>
        )
    }

}

export default InformationContainer;
global.informationStore = informationStore;