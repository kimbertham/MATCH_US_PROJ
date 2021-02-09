import React from 'react'
import axios from 'axios'
import { headers } from '../../Lib/auth'

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

  addWishlist = async (id) => {
    await axios.post('/api/wishlist/', { a_id: id } , headers())
  }

  render(){
    const { keyword, results } = this.state
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <label>Add Items:</label>            
          <input className='e-input'
            name='keyword'
            value={keyword}
            onChange={this.handleChange}/>
          <button>Search</button>
        </form>

        <div className='flex-wrap'>
          {results.map(r=>{
            return <div  className='wishlist-item' key={r.product_id}>
              <p>{r.title}</p>
              <p>{r.price.current_price}</p>
              <p>{r.reviews.rating}</p>
              <img src={r.thumbnail}/>

              <button onClick={ () => {
                this.addWishlist(r.asin)
              }}> +Add </button>
            </div>
          })}
        </div>
      </>
    )
  }
}
export default WishlistSearch