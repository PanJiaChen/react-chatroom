import {Component} from 'react'
import utils from '../../../../../common/utils/utils.js'


export default class LeftbarList extends Component{

    static defaultProps={
        list:[]
    }


    constructor(props,context){
        super(props,context)
    }

    render(){
        var list = this.props.listDetail;
        console.log(list)
        var repeatLi = list.map(item=>{
            var publishTime=utils.formatTime(item.createdAt)
            return (

                <li key={item.id} className="list-item-container">
                    <div className="list-item">
                        <div className="timer-circle"></div>
                        <div className="list-content">{item.title}</div>
                        <div className="timer">{publishTime}</div>

                    </div>
                </li>
            )
        })

        return (
            <ul className='artivle-list'>
                {repeatLi}
            </ul>
        )
    }

}
