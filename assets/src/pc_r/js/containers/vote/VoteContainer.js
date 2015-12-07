import {Component} from 'react'
import utils from '../../../../common/utils/utils.js'
import './vote.less'
//对应的VoteStore

class VoteContainer extends Component{

    static contextTypes={
        minInterval:React.PropTypes.object.isRequired
    }

    state={
        isOpen:false
    }
    constructor(props,context){
        super(props,context)
    }

    componentDidMount(){
        const store = this.props.store;
        store.loadVoteAjax('false',this.context.minInterval.vote);
    }

    handleClick(){
        const isOpen=this.state.isOpen
        if(!isOpen){
            $('body').addClass('show-menu')
            this.setState({isOpen: true});
        }else{
            $('body').removeClass('show-menu')
            this.setState({isOpen: false});
        }
    }
    closeClick(){
        const isOpen=this.state.isOpen;
        if(isOpen){
            $('body').removeClass('show-menu')
            this.setState({isOpen: false});
        }
    }

    render(){
        const store = this.props.store;
        const state = store.getState();
        var publishStatus=state.status;

        if(publishStatus=='published'){
            var publishStatus='vote-publish-status published'
        }else{
            var publishStatus='vote-publish-status closed'
        }
        const  list=state.voteList;
        if (list.length <= 0) {
            return (
                <div className='vote-empty-container'>
                    <div className='vote-empty-img'>
                    </div>
                    暂无投票
                </div>
            )
        }
        var repeatLi = list.map(item=> {
            const publishTime = utils.formatTime(item.createdAt);
            const finishTime = utils.formatTime(item.expiredAt);
            const content = item.text;


            return (
                <li key={item.id} className="icon-list-item">
                    <div className="vote-item-meta">
                        <div className="vote-createdAt">{publishTime}</div>
                        <div className="vote-finishAt">投票结束时间:{finishTime}</div>
                        <div className={publishStatus}></div>
                    </div>
                    <div className="vote-item-main">
                        <div className="vote-item-title">{item.description}</div>
                        <div className="vote-item-title option"></div>
                    </div>
                </li>
            )
        })
        return (
            <div className='vote-container'>
                <div className="menu-wrap">
                    <div className="vote-btn" onClick={this.handleClick.bind(this)}>投票</div>
                    <nav className="menu">
                        <div className="vote-title">投票区</div>
                        <div className="icon-list">
                            {repeatLi}
                        </div>
                    </nav>
                    <button className="close-button" onClick={this.closeClick.bind(this)} >Close Menu</button>
                </div>
            </div>
            
        )
    }

}

export default VoteContainer;