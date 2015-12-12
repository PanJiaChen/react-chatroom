import {Component} from 'react'
import utils from '../../../../common/utils/utils.js'
import './vote.less'
//对应的VoteStore

class VoteContainer extends Component{

    static contextTypes={
        minInterval:React.PropTypes.object.isRequired
    }

    state={
        isOpen:false,
        voteLength:0,
        hasNewVote:0
    }
    constructor(props,context){
        super(props,context)
    }

    componentDidMount(){
        const store = this.props.store;
        store.loadVoteAjax('false',this.context.minInterval.vote);
    }

    componentDidUpdate() {
        const store = this.props.store;
        const state = store.getState();
        if(state.voteList.length>this.state.voteLength){
            const newVoteL=state.voteList.length-this.state.voteLength;
            this.setState({voteLength: state.voteList.length});
            this.setState({hasNewVote: newVoteL});
        }

    }

    handleClick(){
        const isOpen=this.state.isOpen
        if(!isOpen){
            $('body').addClass('show-menu')
            this.setState({isOpen: true});
            this.setState({hasNewVote: 0});

        }else{
            $('body').removeClass('show-menu')
            this.setState({isOpen: false});
        }
    }

    closeClick(){
        const isOpen=this.state.isOpen;
        if(isOpen){
            $('body').removeClass('show-menu')
            this.setState({hasNewVote: 0});
            this.setState({isOpen: false});
        }
    }

    postVote(event){
        const store = this.props.store;
        const voteId=event.target.getAttribute('data-id');
        const $parent=$(event.target).closest('.vote-item-main');
        const optionId=$parent.find('input:checked').attr('data-id');
        store.postVote(voteId,optionId)
    }

    countVote(a,b){
        if(b==0){
            return 0
        }else{
            return Math.round(a/b*100)
        }

    }
    render(){
        const store = this.props.store;
        const state = store.getState();

        const  list=state.voteList;
        if (list.length <= 0) {
            return (
                <div className='vote-empty-container'>
            
                </div>
            )
        }

        if(this.state.hasNewVote>0){
            var voteBtn=(<div className="vote-btn" onClick={this.handleClick.bind(this)}>投票
                <div className="hasNewVote">{this.state.hasNewVote}</div>
            </div>)
        }else{
            var voteBtn=<div className="vote-btn" onClick={this.handleClick.bind(this)}>{'投票'}</div>
        }


        var repeatLi = list.map(item=> {
            const publishTime = utils.formatTime(item.createdAt);
            const finishTime = utils.formatTimeTwo(item.expiredAt);
            var publishStatus=item.status;

            if(publishStatus=='published'){
                //还在publish的
    
                if(item.voted!=0){
                    //投过票显示百分比
                     var isDisabled=true;
                    //总人数
                    var count=0;
                    item.options.map(option=>{
                        return count+=option.count
                    })
                    var options=item.options.map(option=>{
                        const per=this.countVote(option.count,count)

                        if(option.id==item.voted){
                            const checked=true
                            var vInput=<input name={item.id} type="radio"  defaultChecked={checked}  data-id={option.id} value={option.name} />
                        }else{
    
                            var vInput=<input name={item.id} type="radio"  disabled  data-id={option.id} value={option.name} />
                        }
                        return (
                            <div className="option-item" key={option.id}>
                                {vInput}
                                <label htmlFor={option.id}>{option.name}</label>
                                <div className="vote-percentage-container">
                                    <div className="vote-percentage"><div style={{width:per+'%'}} className="vote-percentage-in" ></div></div>
                                    <div className="vote-percentage-people"> {option.count+'('+per+'%)'}</div>
                                </div>
                            </div>)
                    })
                }else{
                    //不显示百分比
                    var isDisabled=false;
                    var options=item.options.map(option=>{
                        const per=this.countVote(option.count,count)
                        return (
                            <div className="option-item" key={option.id}>
                                <input name={item.id} type="radio" data-id={option.id} value={option.name} />
                                <label htmlFor={option.id}>{option.name}</label>
                            </div>)
                    })
                }
               
            }else{
                //显示投票百分比
                var isDisabled=true;
                //总人数
                var count=0;
                item.options.map(option=>{
                    return count+=option.count
                })
                var options=item.options.map(option=>{
                    const per=this.countVote(option.count,count)
                    return (
                        <div className="option-item" key={option.id}>
                            <input name={item.id} type="radio"  disabled data-id={option.id} value={option.name} />
                            <label htmlFor={option.id}>{option.name}</label>
                            <div className="vote-percentage-container">
                                <div className="vote-percentage"><div style={{width:per+'%'}} className="vote-percentage-in" ></div></div>
                                <div className="vote-percentage-people"> {option.count+'('+per+'%)'}</div>
                            </div>
                        </div>)
                })
            }

            return (
                <li key={item.id} className="icon-list-item">
                    <div className="vote-item-meta">
                        <div className="vote-createdAt">{publishTime}</div>
                        <div className="vote-finishAt">投票结束时间:{finishTime}</div>
                        <div className={"vote-publish-status "+publishStatus}></div>
                    </div>
                    <div className="vote-item-main">
                        <div className="vote-item-title">{item.description}</div>
                        <div className="options">
                            {options}
                        </div>
                        <button className={"vote-button "+isDisabled} disabled={isDisabled} data-id={item.id} onClick={this.postVote.bind(this)}>投票</button>
                    </div>
                </li>
            )
        })
        return (
            <div className='vote-container'>
                <div className="menu-wrap">
                    {voteBtn}
                    <nav className="menu">
                        <div className="vote-title">投票区</div>
                        <button className="close-button" onClick={this.closeClick.bind(this)} >Close Menu</button>
                        <div className="icon-list-container">
                        <div className="icon-list">
                            {repeatLi}
                        </div>
                        </div>
                    </nav>
                </div>
            </div>
            
        )
    }

}

export default VoteContainer;