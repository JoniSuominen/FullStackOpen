import React from 'react'

const Person = (props) => {
    return (
        <div>
            {props.name} {props.numero}
            <button onClick={props.removePerson}>poista</button>
        </div>
    )
}
export default Person