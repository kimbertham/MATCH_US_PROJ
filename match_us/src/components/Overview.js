import React from 'react' 
import Events from './Events/Events'
import { Link } from 'react-router-dom'


const Overview = ({ user, connections }) => {
  return (
    <div>
      <h1>{user.first_name}&apos;s Overview </h1>
      <Events
        connections={connections}
        user={user}/>
      
      <Link to={'/home/wishlist'}>
        <h2>My Wishlist</h2>
      </Link>
    </div> 
  )
}

export default Overview