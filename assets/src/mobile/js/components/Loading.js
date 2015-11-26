import './loading.less'
import {Component} from 'react'
class Loading extends Component {
    constructor(props, context) {
        super(props, context)
    }

    static contextTypes = {}

    state = {

    }

    componentDidMount() {

    }

    show(){
    	console.log('我在显示loading啊啊')
    }
    render() {
        return (
            <div id='js-loading' className={"loading-container "+this.props.loadingClass}>
				<div className="la-ball-spin la-2x">
				    <div></div>
				    <div></div>
				    <div></div>
				    <div></div>
				    <div></div>
				    <div></div>
				    <div></div>
				    <div></div>
				</div>
			</div>
        )
    }

}

export default Loading;

// console.log(Loading.show().bind(this))
// global.ALoading.show = Loading.show;