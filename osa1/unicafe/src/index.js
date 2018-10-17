import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            hyvä: 0,
            neutraali: 0,
            huono: 0
        }

    }

    annaPalaute = (text) => {
        return () => {
            this.setState({
                [text]: this.state[text] + 1
            })
        }
    }

    render() {
        return (
            <div>
                <div>
                    <h1>anna palautetta</h1>
                </div>
                <div>
                    <Button handleClick={this.annaPalaute("hyvä")} text="hyvä"/>
                    <Button handleClick={this.annaPalaute("neutraali")} text="neutraali"/>
                    <Button handleClick={this.annaPalaute("huono")} text="huono"/>
                </div>
            </div>
        )
    }
}

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>
        {text}
    </button>
)
ReactDOM.render(<App />, document.getElementById('root'));

