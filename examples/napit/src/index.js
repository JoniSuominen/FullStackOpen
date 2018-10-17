import React from 'react';
import ReactDOM from 'react-dom';


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            vasen: 0,
            oikea: 0,
            kaikki: []
        }
    }

    klikVasen = () => {
        this.setState({
            vasen: this.state.vasen + 1,
            kaikki: this.state.kaikki.concat('v')
        })
    }

    klikOikea = () => {
        this.setState({
            oikea: this.state.oikea + 1,
            kaikki: this.state.kaikki.concat('o')
        })
    }

    render() {
        const historia = () => {
            if (this.state.kaikki.length === 0) {
                return (
                    <div>
                        <em> sovellusta käytetään nappeja painamalla</em>
                    </div>
                )
            }
            return (
                <div>
                    näppäilyhistoria: {this.state.kaikki.join(' ')}
                </div>

            )
        }
        return (
            <div>
                <div>
                    {this.state.vasen}
                    <button onClick={this.klikVasen}>vasen</button>
                    <button onClick={this.klikOikea}>oikea</button>
                    {this.state.oikea}
                    <div> {historia()}</div>
                </div>
            </div>
        )
    }
}


ReactDOM.render(<App />, document.getElementById('root'));

