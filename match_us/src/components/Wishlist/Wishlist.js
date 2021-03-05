import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import WishlistSearch from './WishlistSearch'
import Loader from '../Common/Loader'
import WishListCard from './WishlistCard'

class Wishlist extends React.Component{
state = {
  wishlist: false
}

async componentDidMount() {
  this.getWishlist()
}

getWishlist = async () => {
  const r = await axios.get(`/api/wishlist/${this.props.user.id}/`)
  this.setState({ wishlist: r.data })
}

render(){
  const { user,match } = this.props
  const home = match.path.includes('home')
  const { wishlist } = this.state

  if (!wishlist) return <Loader type='Puff'/>

  return (
    <div className='fh scroll'>
  
      <div className='center'>
        <h1 className='r-title'>{user.first_name}&apos;s Wishlist </h1>
        {home ? <WishlistSearch getWishlist={this.getWishlist}/> : null}
      </div>

      <div className='flex wrap center'>
        {wishlist.length > 0 ?
          wishlist.map((r,i) => {
            return  <div  className='w-item' key={i}>
              <WishListCard r={r} home={home} deleteWish={this.deleteWish}/>
            </div>
          }) : 'No wishlist items'}
      </div>

    </div>
  )
}
}
export default withRouter(Wishlist)