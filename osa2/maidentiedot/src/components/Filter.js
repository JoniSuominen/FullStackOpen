import React from 'react'

const Filter = ({handleCountryChange, filter}) => {
    return (
        <div>
            find countries:
            <input
            value={filter}
            onChange={handleCountryChange}
            />

        </div>
    )
}

export default Filter