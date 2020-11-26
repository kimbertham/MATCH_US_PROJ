import React from 'react'
import { Link } from 'react-router-dom'

const MenuUser = ({ user, connections }) => {

  return (
    <>
      <div className='m-user flex'>
        <div>
          <h1>{user.first_name} {user.last_name}</h1>
          <p>{user.username}</p>
        </div>
        <img src={user.profile_image} 
          className='user-img' alt='profile-img'/>
      </div>

      <div className='m-connections'>
        <h1>My Connections</h1>
        {connections.map(c => {
          return <Link  key={c.id} to={`/connection/${c.id}`}>  
            <div className='menu-c' id={c.id}>
              <img src={c.participants.profile_image} className='c-img'/>
              {c.participants.first_name} {c.participants.last_name}
            </div>
          </Link>
        })}
      </div>
    </>
  )
}

export default MenuUser