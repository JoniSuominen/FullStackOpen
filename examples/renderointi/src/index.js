import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            counter: 1
        }
    }

    asetaArvoon = (arvo) =>() => this.setState({counter: arvo})

    render() {
        return (
            <div>
                <div>
                    <Display counter={this.state.counter}/>
                </div>
                <div>
                    <Button
                        handleClick={this.asetaArvoon(this.state.counter + 1)}
                        text="Plus"
                    />
                    <Button
                        handleClick={this.asetaArvoon(this.state.counter - 1)}
                        text="Minus"
                    />
                    <Button
                        handleClick={this.asetaArvoon(0)}
                        text="Zero"
                    />

                </div>
            </div>
            
        )
    }

}

const Display = ({counter}) => <div>{counter}</div>

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>
        {text}
    </button>
)


ReactDOM.render(
    <App />,
    document.getElementById('root') 
)

