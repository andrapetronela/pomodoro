class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            break_length: 5,
            session_length: 25,
            minutes: 25,
            seconds: 60,
            initialSeconds: 0,
            break_session: false,
            start: false,
            session_begun: false,
            session_time: false,
            menu: false,
        }
        
    this.startTimer = this.startTimer.bind(this);
    this.reset = this.reset.bind(this);
    this.breakInc = this.breakInc.bind(this);
    this.breakDec = this.breakDec.bind(this);
    this.sessionInc = this.sessionInc.bind(this);
    this.sessionDec = this.sessionDec.bind(this);
    this.pause = this.pause.bind(this);
    this.stopSound = this.stopSound.bind(this);
    this.showMenu = this.showMenu.bind(this);
    }
    
    startTimer = () => {
            this.state.minutes = this.state.session_length-1;
        
            this.interval = setInterval(() => {
            this.setState({
                seconds: this.state.seconds-1,
                start: true,
                session_begun: true,
                session_time: true,
            });
                                            
            this.state.seconds < 10 ? this.setState({seconds: '0' + this.state.seconds}) : this.state.seconds;
            

            if (this.state.seconds == 0 && this.state.minutes!==0) {
                this.state.minutes--;
                this.state.seconds = 60;
            } else if (this.state.seconds == 0 && this.state.minutes == 0 && this.state.session_time) {
                
                document.getElementById('beep').play();
                clearInterval(this.interval);
                this.setState({
                    minutes: this.state.minutes,
                    seconds: this.state.seconds,
                    break_session: true,
                    session_time: false,
                });
                
                // start break interval
                
                let minInterval = setTimeout(() => {
                    this.setState({
                        minutes: this.state.break_length,
                    });
                    
                }, 1000);
               
                let finalTime = setTimeout(() => {
                    this.setState({
                        minutes: this.state.minutes-1,
                        seconds: 60,
                    });
                }, 2000);
                    
                    this.breakTime = setInterval(() => {
                        
                        this.setState({
                            seconds: this.state.seconds-1,
                        })
                        this.state.seconds < 10 ? this.setState({seconds: '0' + this.state.seconds}) : this.state.seconds;

                        if (this.state.seconds == 0 && this.state.minutes!==0) {
                            this.state.minutes--;
                            this.state.seconds = 60;
                        }
                        
                        if (this.state.minutes === 0 && this.state.seconds == 0 && !this.state.session_time) {
                        window.clearInterval(this.breakTime);
                            this.setState({
                                session_time: true,
                                break_session: false,
                            });
           
                            let minInterval = setTimeout(() => {
                                this.setState({
                                    minutes: this.state.session_length,
                                    seconds: this.state.seconds,
                                });
                            }, 1000);

                            let finalTime = setTimeout(() => {
                                this.setState({
                                    minutes: this.state.minutes-1,
                                    seconds: 60,
                                });
                            }, 2000);
                            this.startTimer();
                        }
                    }, 1000);
            }                
        }, 1000); 
    }  
   
    reset = () => {
        this.state.seconds = '0' + this.state.initialSeconds;
        window.clearInterval(this.interval);
        window.clearInterval(this.breakTime);
        this.setState({
            seconds: 60,
            minutes: 25,
            break_length: 5,
            session_length: 25,
            break_session: false,
            session_begun: false,
        });
        
        if (this.state.start) {
            this.setState({
                start: false,
            })
        }
        document.getElementById('beep').pause();
        document.getElementById('beep').currentTime = 0;
    }
    // break length
    breakInc = () => {
        this.setState({
            break_length: this.state.break_length + 1
        })
        
        if (this.state.break_length === 60) {
            this.setState({
                break_length: 60,
            })
        }
    }
    
    breakDec = () => {
            this.setState({
            break_length: this.state.break_length - 1
            })
        if (this.state.break_length === 1) {
            this.setState({
                break_length: 1
            })
        }
       
    }
    
    // session length
    
    sessionInc = () => {
       
        this.setState({
            session_length: this.state.session_length + 1,
            minutes: this.state.session_length+1,
            seconds: this.state.seconds
        });
        if (this.state.session_length === 60) {
            this.setState({
                session_length: 60,
                minutes: 60,
            })
        }
    }
    
    sessionDec = () => {
        this.setState({
            session_length: this.state.session_length - 1,
            minutes: this.state.session_length-1,
            seconds: this.state.seconds
        })
        if (this.state.session_length === 1) {
            this.setState({
                session_length: 1,
                minutes: 1,
            })
        }
    }
    
    pause = () => {
        this.setState({
            start: false,
            minutes: this.state.minutes,
            seconds: this.state.seconds,
            session_length: this.state.session_length,
            break_length: this.state.break_length,
        })
        window.clearInterval(this.interval);
        window.clearInterval(this.breakTime);
        this.stopSound();
    }
    
    stopSound = () => {
        document.getElementById('beep').pause();
        document.getElementById('beep').currentTime = 0;
    }
    
    showMenu = () => {
        
       
//        this.state.menu ? document.getElementById('controls').style.opacity = '1' : document.getElementById('controls').style.opacity = '0';
        if (this.state.menu) {
           this.setState({
               menu: false,
           }); document.getElementById('controls').style.opacity = '0';
        } else {
           this.setState({
               menu: true,
           });  document.getElementById('controls').style.opacity = '1';
        }
    }
    
        
    render () {
        return (
            <div id="container">
                <div id="menu" onClick={this.showMenu}><i className="fas fa-bars arrow" ></i></div>
                <h1>Pomodoro timer</h1> 
                <div id="controls">
                    <div id="break-label">
                        <p id="break-title">Break Length</p>
                        <div id="break-increment" onClick={this.breakInc}><i className="fas fa-arrow-up arrow"></i></div>
                        <p id="break-length">{this.state.break_length}</p>
                        <div id="break-decrement" onClick={this.breakDec}><i className="fas fa-arrow-down arrow"></i></div>
                    </div>
                    <div id="session-label">
                        <p id="session-title">Session Length</p>
                        <div id="session-increment" onClick={this.sessionInc}><i className="fas fa-arrow-up arrow"></i></div>
                        <p id="session-length">{
                        this.state.session_length }</p>
                        <div id="session-decrement" onClick={this.sessionDec}><i className="fas fa-arrow-down arrow"></i></div>
                    </div>
                </div>
                <div id="timer-label">
                    {!this.state.break_session ? 'Choose a job you love and you will never have to work a day in your life.' : 'Break has begun'}
                    <div id="timer-title">
                        
                        <p id="time-left">
                            {this.state.minutes < 10 ? '0' + this.state.minutes + ':' : this.state.minutes+':'}
                            {!this.state.session_begun ? '0' + this.state.initialSeconds : this.state.seconds}
                        </p>
                    </div>
                    <div id="start_stop" onClick={!this.state.start ? this.startTimer : this.pause}>{this.state.start ? <i className="far fa-pause-circle pause"></i> : <i className="far fa-play-circle play"></i>}</div>
                    <div id="reset" onClick={this.reset}><i className="fas fa-power-off reset"></i>
                    <div id="hidden-reset">Reset</div></div>
                </div>
            <div id="sound">
                <audio id="beep" src="http://www.talkingwav.com/wp-content/uploads/2017/10/m16.wav" />
            </div>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));