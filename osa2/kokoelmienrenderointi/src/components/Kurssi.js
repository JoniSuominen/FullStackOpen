import React from 'react'

const Kurssi = ({kurssi}) => {
    return (
        <div>
            <Otsikko otsikko={kurssi.nimi} />
            <Sisalto osat={kurssi.osat}/>
            <Maara osat={kurssi.osat}/>
        </div>
    )
}

const Otsikko = ({otsikko}) => {
    return (
        <div>
            <h1>{otsikko}</h1>
        </div>
    )
}

const Sisalto = ({osat}) => {
    return (
        <div>
            <ul>
                {osat.map(osa => <Osa key={osa.id} sisalto={osa}/>)}
            </ul>
        </div>

    )
}

const Osa = ({sisalto}) => {
    return (
        <li>{sisalto.nimi} {sisalto.tehtavia}</li>
    )
}

const Maara = ({osat}) => {
    const reducer = (accumulator, currValue) => accumulator + currValue;
    const maarat = osat.map(osa => osa.tehtavia)
    return (
        <div>
            yhteensä {maarat.reduce(reducer)} tehtävää
        </div>
    )
}

export default Kurssi