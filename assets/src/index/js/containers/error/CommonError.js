import React from 'react'

export default class CommonError extends React.Component{

    render(){
        var errMsg = this.props.errMsg
        return (
            <div className='error'>
                {errMsg}
            </div>
        )
    }
}