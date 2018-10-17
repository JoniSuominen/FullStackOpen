import React from 'react';
import ReactDOM from 'react-dom';

// huolehtii kurssien otsikoiden renderöinnistä
const Otsikko = (kurssi) => {
    return (
        <div>
            <h1>{kurssi.kurssinNimi}</h1>
        </div>
    )

}

// huolehtii kurssien sisällön ja tehtävämäärän renderöinnistä
const Sisalto = (osat) => {
    return (
        <div>
            <Osa sisalto={osat.osat[0]}/>
            <Osa sisalto={osat.osat[1]}/>
            <Osa sisalto={osat.osat[2]}/>
        </div>
    )
}

// huolehtii yksittäisten osien renderöinnin
const Osa = (tieto) => {
    return (
        <p> {tieto.sisalto.nimi} {tieto.sisalto.tehtavia}</p>
    )
}
// huolehtii kurssien lukumäärän renderöinnistä
const Yhteensa = (osat) => {
    return (
        <p>Yhteensä {osat.osat[0].tehtavia + osat.osat[1].tehtavia + osat.osat[2].tehtavia} tehtävää</p>
    )
}

const App = () => {
    const kurssi = {

        nimi: 'Half-stack -sovelluskehitys',
        osat: [
            {
                nimi: 'Reactin perusteet',
                tehtavia: 10
            },

            {
                nimi: 'Tiedonvälitys propseilla',
                tehtavia: 7
            },

            {
                nimi: 'Komponenttien tila',
                tehtavia: 14
            }
        ]
    }

    return (
        <div>
            <Otsikko kurssinNimi={kurssi.nimi}/>
            <Sisalto osat={kurssi.osat}/>
            <Yhteensa osat={kurssi.osat}/>
        </div>
    )
}

ReactDOM.render(<App />,
     document.getElementById('root'));

