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
    console.log(osat.osa1.nimi)
    console.log(osat.osa1.tehtavia)
    return (
        <div>
            <Osa sisalto={osat.osa1}/>
            <Osa sisalto={osat.osa2}/>
            <Osa sisalto={osat.osa3}/>
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
const Yhteensa = (maara) => {
    return (
        <p>Yhteensä {maara.maara} tehtävää</p>
    )
}

const App = () => {
    const kurssi = 'Half-stack -sovelluskehitys'
    const osa1 = {
        nimi: 'Reactin perusteet',
        tehtavia: 10
    }

    const osa2 = {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7
    }

    const osa3 = {
        nimi: 'Komponenttien tila',
        tehtavia: 14
    }

    return (
        <div>
            <Otsikko kurssinNimi={kurssi}/>
            <Sisalto osa1={osa1} osa2={osa2} osa3={osa3}/>
            <Yhteensa maara={osa1.tehtavia + osa2.tehtavia + osa3.tehtavia}/>
        </div>
    )
}

ReactDOM.render(<App />,
     document.getElementById('root'));

