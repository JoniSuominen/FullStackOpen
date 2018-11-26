import React from 'react'


const Country = ({handleClick, name}) => {
    return (
        <li>
            <div onClick={handleClick}>
             {name} 
            </div>
        </li>

    )
}

export default Country
