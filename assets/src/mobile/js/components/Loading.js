import './loading.less'
import {Component} from 'react'

export default class Loading extends Component{
    constructor(props, context) {
        super(props, context)
    }

    static contextTypes = {}

    state = {

    }

    componentDidMount() {

    }
    render() {
        return (
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
        )
    }

}

export default Loading;