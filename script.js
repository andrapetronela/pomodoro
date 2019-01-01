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
        }
        
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.breakInc = this.breakInc.bind(this);
    this.breakDec = this.breakDec.bind(this);
    this.sessionInc = this.sessionInc.bind(this);
    this.sessionDec = this.sessionDec.bind(this);
    this.pause = this.pause.bind(this);
    }
    
    startTimer() {
            this.state.minutes = this.state.session_length-1;
        
            this.interval = setInterval(() => {
            this.setState({
                seconds: this.state.seconds-1,
                start: true,
                session_begun: true,
            });
                            
            console.log(this.state.minutes + ':' + this.state.seconds);
                
            if (this.state.seconds < 10) {
                this.setState({
                    seconds: '0' + this.state.seconds,
                })
            }

            if (this.state.seconds == 0 && this.state.minutes!==0) {
                this.state.minutes--;
                this.state.seconds = 60;
            } 
            if (this.state.seconds == 0 && this.state.minutes == 0) {
                this.setState({
                    break_session: true,
                });
                this.state.minutes = this.state.break_length;
                this.state.minutes--;
                this.state.seconds = 60;
            }
                
            if (this.state.minutes == 0 && this.state.seconds == 0 && this.state.break_session == true) {
                    console.log('finish');
                }
        }, 1000);  
    }      

   
    stopTimer() {

        clearInterval(this.interval);
        this.setState({
            seconds: 60,
            minutes: 25,
            break_length: 5,
            session_length: 25,
            break_session: false,
            session_begun: false,
        });
        if (this.state.start == true) {
            this.setState({
                start: false,
            })
        }
        
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
    
    pause() {
        this.setState({
            start: false,
            minutes: this.state.minutes,
            seconds: this.state.seconds,
            session_length: this.state.session_length,
            break_length: this.state.break_length,
        })
        clearInterval(this.interval);
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
                    {this.state.break_session == false ? 'Session' : 'Break has begun'}
                    <div id="timer-title">
                        
                        <p id="time-left">
                            {this.state.minutes < 10 ? '0' + this.state.minutes + ':' : this.state.minutes+':'}
                            {this.state.session_begun == false ? '0' + this.state.initialSeconds : this.state.seconds}
                        </p>
                    </div>
                    <button id="start_stop" onClick={this.state.start===false ?       this.startTimer : this.pause}>{this.state.start ? 'Stop' : 'Play'}</button>
                    <button id="reset" onClick={this.stopTimer}>Reset</button>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));