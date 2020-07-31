import React, {Component} from 'react'

class Button extends React.Component{
    constructor(props){
        super(props)
        this.state = {isOn: props.isOn}
    
        this.updateButton = this.updateButton.bind(this);
    }


    updateButton(){
        this.setState(state => ({
            isOn: !state.isOn 
        }))
    }

    render(){
        return(
            <div>
                <button onClick={this.updateButton}>
                    {this.state.isOn ? 'On' : 'Off'}
                </button>
            </div>
        )
    }

}

export default Button