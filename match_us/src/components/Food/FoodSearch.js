
import React from 'react'
import axios from 'axios'
import { geoURL } from '../../Lib/common'

class  FoodSearch extends React.Component {
state = {
  data: {
    location: '',
    rankby: '',
    keyword: '',
    address: ''
  },
  show: null,
  errors: false
}

handleChange = (e) => {
  const data = { ...this.state.data, [e.target.name]: e.target.value }
  this.setState({ data })
}

setLocation = async (e) => {
  e.preventDefault()
  const { data } = this.state
  
  if (Object.values(data).some(o => o === '')) {
    this.setState({ errors: true })
  } else {
    const coOrd = (await axios.get(`${geoURL}${data.address}`)).data.results[0].geometry.location
    const location = { ...data, location: `${coOrd.lat},${coOrd.lng}` }
    this.setState({ data: location }, () => {
      this.props.submit(this.state.data)
    }) 
  }
}

showSearch = () => {
  this.setState({ show: !this.state.show })
}

render() {
  const { data, show, errors } = this.state
  const errorC = errors ?  'red' : '' 
  
  return (

    <div className='flex'>
      <div onClick={this.showSearch}> Filter</div>
      <div className={show ? 'inline' : 'display-none'}>
        <section className='f-search'>
          <form  onSubmit={this.setLocation} className='f-form'>
            <div className='flex'>

              <div className='keyword-field'>
                <input 
                  onChange={this.handleChange}
                  name='keyword' 
                  value={data.keyword}
                  className={`${errorC} form-input`}
                  placeholder='Search...'/>
              </div>

              <div className='address-field'>
                <input 
                  onChange={this.handleChange}
                  name='address' 
                  value={data.address}
                  className={`${errorC} form-input`}
                  placeholder='Location'/>
              </div>
          
              <div className='radius-field'>
                <select 
                  onChange={this.handleChange}
                  name='rankby'
                  className={`${errorC} form-input`}
                  value={data.radius}>
                  <option defaultValue value='10'> Sort by </option>  
                  <option value='distance' >Distance</option>
                  <option value='prominence' >Popularity</option>
                </select>
              </div>

              <div className='search-button'>
                <button type='submit'>Search</button>
              </div>
            </div>  
          </form>
        </section>
      </div>
    </div>
      

  )
}
}

export default FoodSearch