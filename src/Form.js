import React, {Component} from 'react'

class Form extends Component {
    handleChange = (event) => {
        const {name, value} = event.target
    
        this.setState({
            [name]: value,
        })
    }
    
    initialState = {
        name: '',
        job: '',
    }
    
    submitForm = () => {
        this.props.handleSubmit(this.state)
        this.setState(this.initialState)
    }

    state = this.initialState

    render(){
        const {name, job} = this.state;

        return(
            <form className="job-form">
                <div className='form-row'>
                    <label htmlFor="name">Name</label>
                    <input 
                        id="name"
                        name="name"
                        type="text"
                        value={name}
                        onChange = {this.handleChange} 
                    />
                </div>
                <div className='form-row'>
                    <label htmlFor="job">Job</label>
                    <input 
                        id="job"
                        name="job"
                        type="text"
                        value={job}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="form-row">
                    <input type="button" value="Submit" onClick={this.submitForm} />
                </div>
            </form>
        );

    }
   
}

export default Form;
