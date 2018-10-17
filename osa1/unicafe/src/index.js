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
    if (kaikki > 0) {
        return (
            <div>
                <Statistic text="hyvä" arvo={(props.tila.hyva / kaikki) * 100 + "%"}/>
                <Statistic text="neutraali" arvo={(props.tila.neutraali / kaikki) * 100 + "%"}/>
                <Statistic text="huono" arvo={(props.tila.huono / kaikki) * 100 + "%"}/>

            </div>
        )
    } 
    return (
        <div>
        <Statistic text="hyvä" arvo='0%'/>
        <Statistic text="neutraali" arvo='0%'/>
        <Statistic text="huono" arvo='0%'/>
        </div>
    )
}

// vastaa yksittäisestä tilastosta
const Statistic = (props) => {
    return (
        <div> {props.text} {props.arvo}</div>
    )

}

// vastaa nappien näyttämisestä
const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

ReactDOM.render(<App />, document.getElementById('root'));

