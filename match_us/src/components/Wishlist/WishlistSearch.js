import React from 'react'
import axios from 'axios'
import { headers } from '../../Lib/auth'
import WishlistCard from './WishlistCard'

class WishlistSearch extends React.Component{
  state = {
    keyword: '',
    results: []
  }

  handleChange = (e) => {
    this.setState({ keyword: e.target.value  })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const r = await axios.post('/api/wishlist/0/', { keyword: this.state.keyword } )
    this.setState({ results: r.data })
  }

  addWishlist = async (id, i) => {
    await axios.post('/api/wishlist/', { a_id: id } , headers()) 
    const results = [...this.state.results, Object.assign(this.state.results[i], { ...this.state.results[i], added: true } )]
    this.setState({ results })
  }

  render(){
    const { keyword, results  } = this.state
    return (
      <>

        <form onSubmit={this.handleSubmit}>
          <label>Add Items: </label>            
          <input
            name='keyword'
            value={keyword}
            onChange={this.handleChange}/>
          <button>Search</button>
        </form>

        <div className='w-cont'>
          {results.map((r,i)=>{
            return <div  className='w-item' key={i}>
              <WishlistCard r={r}/>

              {!r.added ? 
                <button onClick={() => {
                  this.addWishlist(r.asin, i)
                }} className='button'> +Add </button> : 
                <button disabled className='button'>Added</button>}
            </div>
          })}
        </div>
      </>
    )
  }
}
export default WishlistSearch