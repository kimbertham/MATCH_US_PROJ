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
  const r = await axios.get(`/api/wishlist/${this.props.id}/`)
  this.setState({ wishlist: r.data })
}

render(){
  const search = this.props.match.path.includes('home')
  const { wishlist } = this.state

  return (
    <div className='fh scroll'>
  
      {!wishlist ? <Loader type='Puff'/>  :
        <>
          <div className='center'>
            <h1 className='r-title'>{this.props.name}&apos;s Wishlist </h1>
            {search ?  <WishlistSearch getWishlist={this.getWishlist}/> : null}
          </div>
          <div className='flex wrap center'>
            {wishlist.length > 0 ?
              wishlist.map((r,i) => {
                return  <div  className='w-item' key={i}>
                  <WishListCard r={r}/>
                </div>
              }) : 'No wishlist items'}
          </div>
        </>
      }
    </div>
  )
}
}
export default withRouter(Wishlist)