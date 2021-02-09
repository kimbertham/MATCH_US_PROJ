import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import WishlistSearch from './WishlistSearch'
import Loader from '../Common/Loader'

class Wishlist extends React.Component{
state = {
  wishlist: []
}

async componentDidMount() {
  this.getWishlist()
}

getWishlist = async () => {
  const r = await axios.get(`/api/wishlist/${this.props.id}/`)
  console.log(r)
  this.setState({ wishlist: r.data })
}

render(){
  const search = this.props.match.path.includes('home')
  const { wishlist } = this.state

  if (!wishlist.message && wishlist.length === 0) return <Loader/>
  return (
    <div>
  

      <h1>{this.props.name}&apos;s Wishlist </h1>
      {search ?  <WishlistSearch getWishlist={this.getWishlist}/> : true}

      <div className='flex wrap'>

          
        {wishlist.message ? wishlist.message :
          wishlist.map(w => {
            return <a href={w.link} key={w.link}>
              <div className='wishlist-item center'>
                <img src={w.image} className='wishlist-img'/>
                <p>{w.name.slice(0,50)}</p>
              </div>
            </a>
          })}
      </div>
        
    

    </div>
  )
}
}
export default withRouter(Wishlist)