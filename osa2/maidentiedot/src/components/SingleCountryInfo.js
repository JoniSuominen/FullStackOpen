import React from 'react'

const SingleCountryInfo = (props) => {
    return (
        <li>
            <div>
                <h2>{props.name}</h2>
                <p>{props.capital}</p>
                <p>{props.population}</p>
                <img src={props.flag} alt={props.name + " flag"}></img>
            </div>
        </li>
    )
}

export default SingleCountryInfo