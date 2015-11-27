import {Component} from 'react'
import ReactDom from 'react-dom'
import utils from '../../../../../common/utils/utils.js'
import '../discuss.less'
import Modal from 'react-modal'
//它对应的store是TopicStore^_^
//
const customStyles = {
   overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(0, 0, 0, 0.75)'
  },
  content : {
    position                   : 'absolute',
    top                        : '40px',
    left                       : '40px',
    right                      : '40px',
    bottom                     : '40px',
    border                     : '1px solid #ccc',
    background                 : '#fff',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '4px',
    outline                    : 'none',
    padding                    : '0px'

  }
};

export default class TopicList extends Component {

    static contextTypes={
        
        minInterval:React.PropTypes.object.isRequired
    }


    constructor(props, context) {
        super(props, context)
    }

    state = {
        'modalIsOpen': false
    }

    componentDidMount() {
        console.log('topic列表mount')
    }



    showModal() {
        this.setState({'modalIsOpen': true});
    }

    closeModal() {
       this.setState({'modalIsOpen': false});
    }

    render() {
        var list=this.props.topicDetail;
        var repeatLi = list.map(item=> {
            const publishTime = utils.formatTime(item.createdAt);
            return(
                <div className='topic-container' key={item.id}>
                    <div className='list-item-container '>
                        <div className="user-avatar">
                            {/*<img src={detail.user['avatar']}/>*/}
                            <img
                                src='http://cv.qiaobutang.com/uploads/social_avatars/2015/9/10/10/55f0e5880cf20c2d88d33a43/large.JPG?v1441850761756 '/>
                        </div>
                        <div className="user-content">
                            <div className='chat-meta clearfix'>
                                <div className="user-detail">
                                    {item.user["username"]}
                                </div>
                                <div className="user-time">
                                   {publishTime}
                                </div>
                            </div>
                            <div className="user-word-container">
                                <div className="user-word">
                                    {item.text}
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
            )
        })
        return (
            <ul className='topic-list'>
                <img className='forward_arrow' onClick={this.showModal.bind(this)} src={require('../../../../img/forward_arrow@2x.png')} />
                <Modal isOpen={this.state.modalIsOpen}  style={customStyles} >
                    <span onClick={this.closeModal.bind(this)} className="modal-close"></span>
                    <div className='topic-list-container'>
                        <div className="title" >主持人话题区</div>
                        {repeatLi}
                    </div>
                </Modal>
            </ul>
        )
    }
}
