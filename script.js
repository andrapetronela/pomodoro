class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            break_length: 5,
            session_length: 25,
            
        }
    }
    
    render() {
        return (
            <div id="container">
                <div id="break-label">
                    <p id="break-title">Break Length</p>
                    <button id="break-increment">Up</button>
                    <p id="break-length">{this.state.break_length}</p>
                    <button id="break-decrement">Down</button>
                </div>
                <div id="session-label">
                    <p id="session-title">Session Length</p>
                    <button id="session-increment">Up</button>
                    <p id="session-length">25</p>
                    <button id="session-decrement">Down</button>
                </div>
                <div id="timer-label">
                    <div id="timer-title">
                        <p>Session</p>
                        <p id="time-left">25:00</p>
                    </div>
                    <button id="start_stop">Play</button>
                    <button id="reset">Reset</button>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));