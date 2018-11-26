import React from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import SingleCountryInfo from './components/SingleCountryInfo'
import Country from './components/Country'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [
      ],
      filter : ''
    }
    console.log("constructor")
  }

  // pulls data from the restcountries.eu api
  componentDidMount() {
    console.log("mounting")
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        this.setState({countries: response.data})
      })
  }
  // responsible  for changing the filter-state
  handleCountryChange = (event) => {
    console.log(event.target.value)
    this.setState({filter: event.target.value})
  }

  handleCountryClick = (event) => {
    console.log(event.currentTarget.textContent)
    this.setState({filter: event.currentTarget.textContent})
  }
  // handles when user clicks on a country name

  render() {
    const countrylist = this.state.countries.filter(country => country.name.toLowerCase().includes(this.state.filter.toLowerCase()))
    const countriesToShow = countrylist.length > 1 ? countrylist.map((country,i) => <Country key={i} name={country.name} handleClick={this.handleCountryClick}/>) : 
                                                     countrylist.map((country,i) => <SingleCountryInfo key={i} name={country.name} capital={country.capital} 
                                                                                              population={country.population} flag={country.flag}/>)
    return (
      <div>
          <Filter
          filter = {this.state.filter}
          handleCountryChange = {this.handleCountryChange} 
          />

          <div>
            <ul>
              {countriesToShow}
            </ul>
          </div>
      </div>
    );
  }
}

export default App;
