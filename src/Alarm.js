import React, {Component} from 'react'


const AlarmForm = (props) =>{
    const {handleChange, handleSubmit, isButtonDisabled} = props
    return(
        <form>
            <div className="form-row">
                <label htmlFor="hours">Hours</label>
                <input 
                    id='hours'
                    name='hours'
                    type="number"
                    onChange={handleChange}
                    required
                    placeholder="0"
                    />
            </div>
            <div className="form-row">
                <label htmlFor="minutes">Minutes</label>
                <input 
                    id='minutes'
                    name='minutes'
                    type="number"
                    onChange={handleChange}
                    required
                    placeholder="0"
                    />
            </div>
            <div className="form-row">
                <label htmlFor="seconds">Seconds</label>
                <input 
                    id='seconds'
                    name='seconds'
                    type="number"
                    onChange={handleChange}
                    required
                    placeholder="0"
                    />
            </div>
            <div className="form-row">
                <label htmlFor="soundUrl">Url for alarm sound</label>
                <input 
                    id='soundUrl'
                    name='soundUrl'
                    type="text"
                    onChange={handleChange}
                    required
                    placeholder="https://wiki.teamfortress.com/w/images/f/f8/Spy_sf12_goodmagic08.wav"
                    />
            </div>
            <div className="form-row"></div>
            <div className="form-row">
                <input type="button" value="Submit" onClick={handleSubmit} disabled={isButtonDisabled}/>
            </div>
        </form>
    )
}

const AlarmDisplay = (props) =>{
    const hours = props.hours
    const minutes = props.minutes
    const seconds = props.seconds
    return(
        <div>
            <p>{hours +" Hours " +minutes +" Minutes " +seconds +" Seconds"}</p>
        </div>
    )
}


class Alarm extends React.Component{
    constructor(props){
        super(props)

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.rewindTime = this.rewindTime.bind(this);

        this.state = {
                hours: 0,
                minutes: 0,
                seconds: 0,
                isButtonDisabled: true,
                isPaused: true,
                soundUrl: ""
        }
    }
    
    
    handleChange = (event) =>{
        const{name, value} = event.target
        let s = true
        this.setState({
                [name]: value
        }, () =>{
            this.setState({
                hours: Number(this.state.hours),
                minutes: Number(this.state.minutes),
                seconds: Number(this.state.seconds),
            }, () =>{
                if(this.state.hours > 0 || this.state.minutes > 0 || this.state.seconds > 0){
                    s = false
                }
                this.setState({
                    isButtonDisabled: s
                })
            })
            
            })
    }
    
    handleSubmit(){  
        if(this.state.isPaused){
            this.timerId = setInterval(()=>{
                this.tick()
            }, 1000);
        }
            this.setState({
                isPaused: false
            })

            this.audio = new Audio(this.state.soundUrl)
            this.audio.load()
}

    rewindTime(){
        clearInterval(this.timerId);
        this.setState({
            isPaused: true
        })
        this.playAudio()
    }

    playAudio(){
        const audioPromise = this.audio.play()
        if(audioPromise !== undefined) {
            audioPromise.then(() =>{

            })
            .catch(err => {
                console.info(err)
                this.setState({
                    soundUrl: ""
                })
            })
        }
    }


    tick(){
        if(this.state.seconds === 0){
            if(this.state.minutes === 0){
                if(this.state.hours === 0){
                    this.rewindTime();
                }else{
                    this.setState(
                        {
                            hours: this.state.hours-1,
                            minutes: 59,
                            seconds: 59
                        }
                    )
                }

            }else{
                this.setState(
                        {
                            minutes: this.state.minutes-1,
                            seconds: 59
                        }
                    )
            }

        }else{
            this.setState(
                {
                    seconds: this.state.seconds-1
                }
            )
        }
    }

    render(){
        return(
            <div>
                {this.state.soundUrl === "" && <div className="error-message"><p>That is an invalid URL.</p></div>}
                <AlarmDisplay hours={this.state.hours} minutes={this.state.minutes} seconds={this.state.seconds}/>
                <AlarmForm handleChange={this.handleChange} handleSubmit={this.handleSubmit} isButtonDisabled={this.state.isButtonDisabled}/>
                <button onClick={this.rewindTime}>STOP</button>
            </div>
        )
    }
}

export default Alarm