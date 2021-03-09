import React from 'react'
import axios from 'axios'
import { headers } from '../../Lib/auth'
import WishlistCard from './WishlistCard'
import Loader from 'react-loader-spinner'

class WishlistSearch extends React.Component{
  state = {
    keyword: '',
    results: [],
    loader: false
  }

  handleChange = (e) => {
    this.setState({ keyword: e.target.value  })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    this.handleLoader()
    const r = await axios.post('/api/wishlist/0/', { keyword: this.state.keyword } )
    this.setState({ results: r.data }, () => this.handleLoader())
  }

  addWishlist = async (id, i) => {
    await axios.post('/api/wishlist/', { a_id: id } , headers()) 
    const results = [...this.state.results, Object.assign(this.state.results[i], { ...this.state.results[i], added: true } )]
    this.setState({ results })
  }

  handleLoader = () => {
    this.setState({ loader: !this.state.loader })
  }

  render(){
    const { keyword, results, loader  } = this.state
    return (
      <>
      
        {!loader ? 
          <form onSubmit={this.handleSubmit}>
            <label>Add Items: </label>            
            <input
              name='keyword'
              value={keyword}
              onChange={this.handleChange}/>
            <button>Search</button>
          </form>
          :
          <Loader
            type='ThreeDots'
            color="#f20cd766"
            height={30}
            width={50}/> 
        }
    

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