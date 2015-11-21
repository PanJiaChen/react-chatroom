import {Component} from 'react'
import utils from '../common/utils/utils.js'
import {enhanceWithStore} from 'react-zlux'
import ButtonA from './js/containers/Button.js'
import AudioContainer from './js/containers/audio/AudioContainer.js';
import VedioContainer from './js/containers/vedio/VedioContainer.js';
import TabContainer from './js/containers/tab/tabContainer.js';

import ArticleContainer from './js/containers/articleSingal/articleSingalContainer.js';
import ArticleStore from './js/store/ArticleStore.js';
const articleStore = global.informationStore;
const ArticleElement = enhanceWithStore(ArticleContainer, articleStore);


import './less/index.less'

const transformsMap = {
    audio: <AudioContainer />,
    vedio: <VedioContainer />,
    commentandarticle: <TabContainer />,
    article: <ArticleElement />
}

const IMAGES = [
    {
    src: 'https://c1.staticflickr.com/9/8383/8517694980_21bef8e9fc_c.jpg',
    thumbnail: 'https://c1.staticflickr.com/9/8383/8517694980_21bef8e9fc_s.jpg',
    srcset: [
            'https://c1.staticflickr.com/9/8383/8517694980_21bef8e9fc_b.jpg 1024w',
            'https://c1.staticflickr.com/9/8383/8517694980_21bef8e9fc_c.jpg 800w',
            'https://c1.staticflickr.com/9/8383/8517694980_21bef8e9fc.jpg 500w',
            'https://c1.staticflickr.com/9/8383/8517694980_21bef8e9fc_n.jpg 320w'
        ],
    },
    {
    src: 'https://c1.staticflickr.com/9/8379/8516580741_058e7c7317_c.jpg',
    thumbnail: 'https://c1.staticflickr.com/9/8379/8516580741_058e7c7317_s.jpg',
    srcset: [
            'https://c1.staticflickr.com/9/8379/8516580741_058e7c7317_b.jpg 1024w',
            'https://c1.staticflickr.com/9/8379/8516580741_058e7c7317_c.jpg 800w',
            'https://c1.staticflickr.com/9/8379/8516580741_058e7c7317.jpg 500w',
            'https://c1.staticflickr.com/9/8379/8516580741_058e7c7317_n.jpg 320w'
        ]
    },
    {
    src: 'https://c1.staticflickr.com/9/8509/8517695778_f08f11150f_c.jpg',
    thumbnail: 'https://c1.staticflickr.com/9/8509/8517695778_f08f11150f_s.jpg',
    srcset: [
            'https://c1.staticflickr.com/9/8509/8517695778_f08f11150f_b.jpg 1024w',
            'https://c1.staticflickr.com/9/8509/8517695778_f08f11150f_c.jpg 800w',
            'https://c1.staticflickr.com/9/8509/8517695778_f08f11150f.jpg 500w',
            'https://c1.staticflickr.com/9/8509/8517695778_f08f11150f_n.jpg 320w'
        ]
    },
    {
    src: 'https://c1.staticflickr.com/9/8109/8526026980_a152c5f11d_z.jpg',
    thumbnail: 'https://c1.staticflickr.com/9/8109/8526026980_a152c5f11d_s.jpg',
    },
    {
    src: 'https://c1.staticflickr.com/9/8243/8524916085_ed79b45249_z.jpg',
    thumbnail: 'https://c1.staticflickr.com/9/8243/8524916085_ed79b45249_s.jpg',
    },
    {
    src: 'https://c2.staticflickr.com/8/7489/16129020136_f36604d33f_c.jpg',
    thumbnail: 'https://c2.staticflickr.com/8/7489/16129020136_f36604d33f_s.jpg',
    srcset: [
            'https://c2.staticflickr.com/8/7489/16129020136_f36604d33f_b.jpg 1024w',
            'https://c2.staticflickr.com/8/7489/16129020136_f36604d33f_c.jpg 800w',
            'https://c2.staticflickr.com/8/7489/16129020136_f36604d33f.jpg 500w',
            'https://c2.staticflickr.com/8/7489/16129020136_f36604d33f_n.jpg 320w'
        ]
    },


    {
    src: 'https://c1.staticflickr.com/9/8376/8526026438_a06baf0f58_c.jpg',
    thumbnail: 'https://c1.staticflickr.com/9/8376/8526026438_a06baf0f58_s.jpg',
    srcset: [
            'https://c1.staticflickr.com/9/8376/8526026438_a06baf0f58_b.jpg 1024w',
            'https://c1.staticflickr.com/9/8376/8526026438_a06baf0f58_c.jpg 800w',
            'https://c1.staticflickr.com/9/8376/8526026438_a06baf0f58.jpg 500w',
            'https://c1.staticflickr.com/9/8376/8526026438_a06baf0f58_n.jpg 320w'
        ]
    },
    {
    src: 'https://c1.staticflickr.com/9/8225/8524911453_598b176b7e_c.jpg',
    thumbnail: 'https://c1.staticflickr.com/9/8225/8524911453_598b176b7e_s.jpg',
    srcset: [
            'https://c1.staticflickr.com/9/8225/8524911453_598b176b7e_b.jpg 1024w',
            'https://c1.staticflickr.com/9/8225/8524911453_598b176b7e_c.jpg 800w',
            'https://c1.staticflickr.com/9/8225/8524911453_598b176b7e.jpg 500w',
            'https://c1.staticflickr.com/9/8225/8524911453_598b176b7e_n.jpg 320w'
        ]
    },
    {
    src: 'https://c1.staticflickr.com/9/8513/8533369906_96f03a6434_c.jpg',
    thumbnail: 'https://c1.staticflickr.com/9/8513/8533369906_96f03a6434_s.jpg',
    srcset: [
            'https://c1.staticflickr.com/9/8513/8533369906_96f03a6434_b.jpg 1024w',
            'https://c1.staticflickr.com/9/8513/8533369906_96f03a6434_c.jpg 800w',
            'https://c1.staticflickr.com/9/8513/8533369906_96f03a6434.jpg 500w',
            'https://c1.staticflickr.com/9/8513/8533369906_96f03a6434_n.jpg 320w'
        ]
    },
    {
    src: 'https://c1.staticflickr.com/9/8096/8532223657_b1efa18ac8_c.jpg',
    thumbnail: 'https://c1.staticflickr.com/9/8096/8532223657_b1efa18ac8_s.jpg',
    srcset: [
            'https://c1.staticflickr.com/9/8096/8532223657_b1efa18ac8_b.jpg 1024w',
            'https://c1.staticflickr.com/9/8096/8532223657_b1efa18ac8_c.jpg 800w',
            'https://c1.staticflickr.com/9/8096/8532223657_b1efa18ac8.jpg 500w',
            'https://c1.staticflickr.com/9/8096/8532223657_b1efa18ac8_n.jpg 320w'
        ]
    },
    {
    src: 'https://c1.staticflickr.com/9/8390/8532222553_e0e05dbdd6_c.jpg',
    thumbnail: 'https://c1.staticflickr.com/9/8390/8532222553_e0e05dbdd6_s.jpg',
    srcset: [
            'https://c1.staticflickr.com/9/8390/8532222553_e0e05dbdd6_b.jpg 1024w',
            'https://c1.staticflickr.com/9/8390/8532222553_e0e05dbdd6_c.jpg 800w',
            'https://c1.staticflickr.com/9/8390/8532222553_e0e05dbdd6.jpg 500w',
            'https://c1.staticflickr.com/9/8390/8532222553_e0e05dbdd6_n.jpg 320w'
        ]
    },
    {
    src: 'https://c1.staticflickr.com/9/8513/8533333694_736fc6c9af_c.jpg',
    thumbnail: 'https://c1.staticflickr.com/9/8513/8533333694_736fc6c9af_s.jpg',
    srcset: [
            'https://c1.staticflickr.com/9/8513/8533333694_736fc6c9af_b.jpg 1024w',
            'https://c1.staticflickr.com/9/8513/8533333694_736fc6c9af_c.jpg 800w',
            'https://c1.staticflickr.com/9/8513/8533333694_736fc6c9af.jpg 500w',
            'https://c1.staticflickr.com/9/8513/8533333694_736fc6c9af_n.jpg 320w'
        ]
    },


    {
    src: 'https://c1.staticflickr.com/9/8391/8532223463_abe07ac0a6_z.jpg',
    thumbnail: 'https://c1.staticflickr.com/9/8391/8532223463_abe07ac0a6_s.jpg',
    },
    {
    src: 'https://c1.staticflickr.com/9/8365/8529344273_eedda51ea1_c.jpg',
    thumbnail: 'https://c1.staticflickr.com/9/8365/8529344273_eedda51ea1_s.jpg',
    srcset: [
            'https://c1.staticflickr.com/9/8365/8529344273_eedda51ea1_b.jpg 1024w',
            'https://c1.staticflickr.com/9/8365/8529344273_eedda51ea1_c.jpg 800w',
            'https://c1.staticflickr.com/9/8365/8529344273_eedda51ea1.jpg 500w',
            'https://c1.staticflickr.com/9/8365/8529344273_eedda51ea1_n.jpg 320w'
        ]
    },
    {
    src: 'https://c1.staticflickr.com/9/8381/8527501230_61882a7918_c.jpg',
    thumbnail: 'https://c1.staticflickr.com/9/8381/8527501230_61882a7918_s.jpg',
    srcset: [
            'https://c1.staticflickr.com/9/8381/8527501230_61882a7918_b.jpg 1024w',
            'https://c1.staticflickr.com/9/8381/8527501230_61882a7918_c.jpg 800w',
            'https://c1.staticflickr.com/9/8381/8527501230_61882a7918.jpg 500w',
            'https://c1.staticflickr.com/9/8381/8527501230_61882a7918_n.jpg 320w'
        ]
    },
    {
    src: 'https://c2.staticflickr.com/8/7538/15535067073_5835371a5f_c.jpg',
    thumbnail: 'https://c2.staticflickr.com/8/7538/15535067073_5835371a5f_s.jpg',
    srcset: [
            'https://c2.staticflickr.com/8/7538/15535067073_5835371a5f_b.jpg 1024w',
            'https://c2.staticflickr.com/8/7538/15535067073_5835371a5f_c.jpg 800w',
            'https://c2.staticflickr.com/8/7538/15535067073_5835371a5f.jpg 500w',
            'https://c2.staticflickr.com/8/7538/15535067073_5835371a5f_n.jpg 320w'
        ]
    },
    {
    src: 'https://c2.staticflickr.com/8/7550/15532469404_e39e2fe2e8_c.jpg',
    thumbnail: 'https://c2.staticflickr.com/8/7550/15532469404_e39e2fe2e8_s.jpg',
    srcset: [
            'https://c2.staticflickr.com/8/7550/15532469404_e39e2fe2e8_b.jpg 1024w',
            'https://c2.staticflickr.com/8/7550/15532469404_e39e2fe2e8_c.jpg 800w',
            'https://c2.staticflickr.com/8/7550/15532469404_e39e2fe2e8.jpg 500w',
            'https://c2.staticflickr.com/8/7550/15532469404_e39e2fe2e8_n.jpg 320w'
        ]
    },
    {
    src: 'https://c2.staticflickr.com/8/7581/16129016486_085eb8dedd_c.jpg',
    thumbnail: 'https://c2.staticflickr.com/8/7581/16129016486_085eb8dedd_s.jpg',
    srcset: [
            'https://c2.staticflickr.com/8/7581/16129016486_085eb8dedd_b.jpg 1024w',
            'https://c2.staticflickr.com/8/7581/16129016486_085eb8dedd_c.jpg 800w',
            'https://c2.staticflickr.com/8/7581/16129016486_085eb8dedd.jpg 500w',
            'https://c2.staticflickr.com/8/7581/16129016486_085eb8dedd_n.jpg 320w'
        ]
    },
];

class ChatroomContainer extends Component {

    static childContextTypes={
         commentMaxLines:React.PropTypes.number.isRequired,
         commentLineHeight:React.PropTypes.number.isRequired,
         topicLineHeight:React.PropTypes.number.isRequired,
         topicMaxLines:React.PropTypes.number.isRequired,
         minInterval:React.PropTypes.object.isRequired
    }

    getChildContext() {
         return {
            commentMaxLines:2,
            commentLineHeight:18,
            topicLineHeight:18,
            topicMaxLines:2,
            minInterval:{
                info: 60 * 1000,//basic info的请求，60s轮询一次
                comment: 5 * 1000,//评论，5s
                article: 90 * 1000,//资讯
                topic: 5 * 1000//话题
            }
         };
    }

    constructor(props, context) {
        super(props, context)

    }

    componentDidMount() {
        const store = this.props.store
        store.loadChatroomAjax('fasle')
    }

    componentWillUnmount() {

    }

    render() {
        const store = this.props.store;
        const state = store.getState();
        const detail = state.detail
        // if (detail.id) {
        //     var includeArr = [];
        //     var include = detail.include;
        //     for (let pop in transformsMap) {
        //         this.judgeInclude(include, pop, includeArr)
        //     }
        // } else {
        //     return <div></div>
        // }

        return (
            <div className="react-container">
                <div className='broadcast-header'>
                    <div className='wscn'></div>
                    <div className="header-num">{detail.numOfUsers}人参与</div>
                </div>
                <ButtonA images={IMAGES}/>
                {/*{includeArr}*/}
                <ArticleElement />
                <TabContainer />
            </div>
        )
    }

    judgeInclude(arr, str, include) {
        if (arr.indexOf(str) >= 0) {
            return include.push(transformsMap[str])
        }
    }

}

export default ChatroomContainer;




