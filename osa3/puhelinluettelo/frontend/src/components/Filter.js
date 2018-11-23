import React from 'react'

const Filter = ({handleFilterChange, filter}) => {
    return (
        <div>
            rajaa näytettäviä
            <input
            value={filter}
            onChange={handleFilterChange}
            />
        </div>
    )

}

export default Filter