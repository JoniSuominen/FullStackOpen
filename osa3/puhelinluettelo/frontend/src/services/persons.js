import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    
    return request.then(response => response.data)
}

const destroy = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`) 
    return request.then(response => response.data)
}

const create = (Person) => {
    const request = axios.post(baseUrl, Person);
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    console.log(id);
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}


export default{getAll, create, destroy, update}