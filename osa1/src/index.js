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
            <Osa sisalto={osat.osa1} tehtavia={osat.tehtavia1}/>
            <Osa sisalto={osat.osa2} tehtavia={osat.tehtavia2}/>
            <Osa sisalto={osat.osa3} tehtavia={osat.tehtavia3}/>
        </div>
    )
}

// huolehtii yksittäisten osien renderöinnin
const Osa = (tieto) => {
    return (
        <p> {tieto.sisalto} {tieto.tehtavia}</p>
    )
}
// huolehtii kurssien lukumäärän renderöinnistä
const Yhteensa = (maara) => {
    return (
        <p>Yhteensä {maara.maara} tehtävää</p>
    )
}

const App = () => {
    const kurssi = 'Half-stack -sovelluskehitys'
    const osa1 = 'Reactin perusteet'
    const tehtavia1 = 10
    const osa2 = 'Tiedonvälitys propseilla'
    const tehtavia2 = 7
    const osa3 = 'Komponenttien tila'
    const tehtavia3 = 14

    return (
        <div>
            <Otsikko kurssinNimi={kurssi}/>
            <Sisalto osa1={osa1} tehtavia1={tehtavia1} osa2={osa2} tehtavia2={tehtavia2}
                    osa3={osa3} tehtavia3={tehtavia3}/>
            <Yhteensa maara={tehtavia1 + tehtavia2 + tehtavia3}/>
        </div>
    )
}

ReactDOM.render(<App />,
     document.getElementById('root'));

