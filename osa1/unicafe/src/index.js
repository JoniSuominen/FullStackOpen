import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            hyva: 0,
            neutraali: 0,
            huono: 0,
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
                    <Button handleClick={this.annaPalaute("hyva")} text="hyvä"/>
                    <Button handleClick={this.annaPalaute("neutraali")} text="neutraali"/>
                    <Button handleClick={this.annaPalaute("huono")} text="huono"/>
                </div>
                <div>
                    <Statistics tila={this.state}/>
                </div>
            </div>
        )
    }
}

// vastaa tilastojen näyttämisestä
const Statistics = (props) => {
    const kaikki = props.tila.hyva + props.tila.huono + props.tila.neutraali
    const keskiarvo = ((props.tila.hyva - props.tila.huono) / kaikki).toFixed(1)
    if (kaikki > 0) {
        return (
            <div>
            <div>
                <h1>statistiikka</h1>
            </div>
            <div>
                <table>
                    <tbody>
                        <Statistic text="hyvä" arvo={props.tila.hyva}/>
                        <Statistic text="neutraali" arvo={props.tila.neutraali}/>
                        <Statistic text="huono" arvo={props.tila.huono}/>
                        <Statistic text="keskiarvo" arvo={keskiarvo}/>
                        <Statistic text="positiivisia" arvo={percentageOf(props.tila.hyva, kaikki)}/>
                    </tbody>
                </table>
            </div>
            </div>
        )
    } 
    return (
        <div>
        <div>
            <h1>statistiikka</h1>
        </div>
            <div> 
                <p>ei yhtään palautetta annettu </p>
            </div>
        </div>
    )
}

// vastaa yksittäisestä tilastosta
const Statistic = (props) => {
    return (
        <tr><td>{props.text}</td><td>{props.arvo}</td></tr>
    )

}

const percentageOf = (maara, kaikki) => {
    if (maara === 0) {
        return 0 + " %"
    } else {
        return (maara / kaikki * 100).toFixed(1) + " %"
    }
}

// vastaa nappien näyttämisestä
const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

ReactDOM.render(<App />, document.getElementById('root'));

