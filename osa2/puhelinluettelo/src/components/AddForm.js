import React from 'react'


const AddForm = (props) => {
    return (
        <div>
            <h2>Lisää uusi</h2>
        <form onSubmit={props.submit}>
            nimi:
            
            <input
            value = {props.name}
            onChange = {props.handleName}
            />

            numero:
            <input
            value = {props.number}
            onChange = {props.handleNumber}
            />
        <div>
            <button type="submit">Lisää</button>
        </div>
        </form>    
        </div>      
    )
}

export default AddForm