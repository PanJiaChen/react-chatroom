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
        
    }

    showModal=(e)=>{
        this.setState({'modalIsOpen': true});
    }

    closeModal=(e)=> {
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
                            <img src={item.user['avatar']} />
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
                <div className='forward_arrow' onClick={this.showModal} ></div>
                <Modal isOpen={this.state.modalIsOpen}  style={customStyles} >
                    <span onClick={this.closeModal} className="modal-close"></span>
                    <div className='topic-list-container'>
                        <div className="title" >主持人话题区</div>
                        {repeatLi}
                    </div>
                </Modal>
            </ul>
        )
    }
}
