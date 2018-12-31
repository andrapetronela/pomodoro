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
        }
        
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.breakInc = this.breakInc.bind(this);
    this.breakDec = this.breakDec.bind(this);
    this.sessionInc = this.sessionInc.bind(this);
    this.sessionDec = this.sessionDec.bind(this);
    }
    
    startTimer() {
            this.state.minutes = this.state.session_length-1;
        
            this.interval = setInterval(() => {
            this.setState({
                seconds: this.state.seconds-1,
            });
            
        document.getElementById('seconds').textContent = this.state.seconds;
                
            console.log(this.state.minutes + ':' + this.state.seconds);
            if (this.state.seconds < 10) {
                document.getElementById('seconds').textContent = '0' + this.state.seconds;
            }
                
            if (this.state.seconds < 10) {
                console.log('seconds less than 10');
                this.setState({
                    seconds: '0' + this.state.seconds,
                })
            }

            if (this.state.seconds == 0 && this.state.minutes!==0) {
                console.log('STOOOOP');
                this.state.minutes--;
                this.state.seconds = 60;
            }
           
                
            if (this.state.minutes == 0 && this.state.seconds == 0) {
                document.getElementById('break-begun').textContent = 'Break has begun';
                this.state.minutes = this.state.break_length;
                
                this.setState({
                    break_session: true,
                    seconds: 60,
                    minutes: this.state.minutes-1, 
                });
            }
        }, 1000);  
    }      

   
    stopTimer() {
        document.getElementById('seconds').textContent = '0'+ this.state.initialSeconds;
        clearInterval(this.interval);
        this.setState({
            seconds: 60,
            minutes: 25,
            break_length: 5,
            session_length: 25,
        });
        
    }
    // break length
    breakInc() {
        this.setState({
            break_length: this.state.break_length + 1
        })
        
        if (this.state.break_length === 60) {
            this.setState({
                break_length: 60,
            })
        }
    }
    
    breakDec() {
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
    
    sessionInc() {
       
        this.setState({
            session_length: this.state.session_length + 1,
            minutes: this.state.session_length+1,
            seconds: this.state.seconds
        });
        if (this.state.session_length == 60) {
            this.setState({
                session_length: 60,
                minutes: 60,
            })
        }
    }
    
    sessionDec() {
        this.setState({
            session_length: this.state.session_length - 1,
            minutes: this.state.session_length-1,
            seconds: this.state.seconds
        })
        if (this.state.session_length == 1) {
            this.setState({
                session_length: 1,
                minutes: 1,
            })
        }
    }
    
    
        
    render() {
        return (
            <div id="container">
                <div id="break-label">
                    <p id="break-title">Break Length</p>
                    <button id="break-increment" onClick={this.breakInc}>Up</button>
                    <p id="break-length">{this.state.break_length}</p>
                    <button id="break-decrement" onClick={this.breakDec}>Down</button>
                </div>
                <div id="session-label">
                    <p id="session-title">Session Length</p>
                    <button id="session-increment" onClick={this.sessionInc}>Up</button>
                    <p id="session-length">{
                    this.state.session_length }</p>
                    <button id="session-decrement" onClick={this.sessionDec}>Down</button>
                </div>
                <div id="timer-label">
                    <div id="timer-title">
                        <p>Session</p>
                        <p id="time-left">
                            <span id="minutes">{this.state.minutes < 10 ? '0' + this.state.minutes + ':' : this.state.minutes+':'}</span>
                            <span id="seconds">{'0' + this.state.initialSeconds}</span>
                        </p>
                    </div>
                    <button id="start_stop" onClick={this.startTimer}>Play</button>
                    <button id="reset" onClick={this.stopTimer}>Reset</button>
                    <div id='break-begun'></div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));