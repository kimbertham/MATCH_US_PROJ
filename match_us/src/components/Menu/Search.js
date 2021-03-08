/* eslint-disable no-unused-vars */
import React from 'react'
import axios from 'axios'
import { headers } from '../../Lib/auth'
import Friend from '../../styles/assets/menu-icons/friend.jpg'
import sent from '../../styles/assets/menu-icons/sent.jpg'



class SidebarSearch extends React.Component {
  state = {
    query: '',
    results: []
  }

  handleChange = async e => {
    const value = e.target.value
    if (value === '' ) {
      this.clearSearch()
    } else {
      this.setState({ query: value }, async () => {
        const r = await axios.post('/api/profiles/' , { query: value  }, headers())
        this.setState({ results: r.data })
      })
    }
  }

  clearSearch = () => {
    this.setState({ query: '', results: [] }) 
  }

  createReq = async (e) => {
    const { results } = this.state
    await axios.post(`/api/connections/${results[e.target.id].id}/`, {} , headers())
    results[e.target.id]['img'] = true
    this.setState({ results })
  }

  render() {
    const { query, results } = this.state
    return (
      <div>
      
        <form className='s-form'>
          <input name="query"
            autoComplete='off'
            className='s-input'
            placeholder='Search for new users...'
            onChange={this.handleChange}
            value={query}/>

          <button className='button'>
            {query === '' ? 'Search' : <p onClick={(e) => {
              e.preventDefault(),this.clearSearch()
            }}>Clear </p>}
          </button>
        </form>

        {results.length > 0 ? 
          <div className='s-result-cont'>
            <h3>Search Results</h3>
            {results.map((u,i) => {
              return (
                <div key={u.id} className='s-result'>
                  <div className='m-img-cont'>
                    <div  className='m-img' style={{  
                      backgroundImage: `url(${u.profile_image})` }}/>
                  </div>
                  <p> {u.first_name} {u.last_name}</p>

                  {u.img ?  <img src={sent} alt='add' className='add-icon'/> :
                    <img onClick={this.createReq} src={Friend}
                      alt='add' id={i} className='add-icon'/>
                  }
                </div>
              ) 
            })}
          </div> : null}
      </div>
    )
  }
}
export default SidebarSearch