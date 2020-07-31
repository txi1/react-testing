import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Clock from './Clock'
import Button from './Button'
import {Element} from 'react-scroll'
import Table from './Table'
import Form from './Form'
import Alarm from './Alarm'

class App extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      characters: [        
      ],
    }
  }

  removeCharacter = (index) => {
    const {characters} = this.state
  
    this.setState({
      characters: characters.filter((character, i) => {
        return i !== index
      }),
    })
  }

  handleSubmit = (character) =>{
    this.setState({characters:[...this.state.characters, character]})
  }


  render(){
    return(
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          This will be the starting point.
        </p>
      </header>

      <div className='clock-container'>
        <Element id='clock' name='clock'>
          <Clock />
        </Element>
        <Button isOn={false}/>
      </div>

      <div className='form-container'>
        <Element id='form' name='form'>
          <Table characterData={this.state.characters} removeCharacter={this.removeCharacter}/>
          <Form handleSubmit={this.handleSubmit}/>
        </Element>
      </div>

      <div className='alarm-container'>
        <Element id='alarm' name='alarm'>
          <Alarm />
        </Element>
      </div>

    </div>
    );
}
}

export default App;
