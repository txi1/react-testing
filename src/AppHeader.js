import React, {Component} from 'react'
import Button from "./Button"
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from "react-scroll";

  

class AppHeader extends React.Component{
    constructor(props){
        super(props)
        this.state = {isHeaderVisible: true}
        this.handleClick = this.handleClick.bind(this);
        this.scrollToTop = this.scrollToTop.bind(this);
    }

    handleClick(){
        this.setState(state => ({
            isHeaderVisible: !state.isHeaderVisible 
        }))
    }

    scrollToTop(){
        scroll.scrollToTop({
            duration: 500,
            smooth: true
        });
    }

    render(){
        if(this.state.isHeaderVisible){
        return(
         <header>
             <nav>
             {this.state.isHeaderVisible &&
                 <div className='header-container'>
                     <ul className='link-container'>
                     <li><a href="#" onClick={this.scrollToTop}>Home </a></li>
                     <li><Link 
                            to="clock"
                            spy={true}
                            smooth={true}
                            duration={500}
                            className='scroll-link' 
                            >Date
                     </Link></li>
                     <li><Link 
                            to="form"
                            spy={true}
                            smooth={true}
                            duration={500}
                            className='scroll-link' 
                            >Form
                     </Link></li>
                     <li><Link 
                            to="alarm"
                            spy={true}
                            smooth={true}
                            duration={500}
                            className='scroll-link' 
                            >Alarm
                     </Link></li>
                     </ul>
                     <div onClick={this.handleClick}>
                        <Button isOn={false}/>
                     </div>
                 </div>
             }
            </nav>
         </header>
        )

        }
        return(
            <div onClick={this.handleClick} className="invisible-header-container">
                <Button isOn={true}/>
            </div>
        )
    }
}

export default AppHeader