import React from 'react'
import { Link } from 'react-router-dom'

const MenuUser = ({ user, connections }) => {

  return (
    <div className='m-user'>

      <div className='m-profile flex'>
        <img src={user.profile_image}  className='m-img' alt='profile-img'/>
        <div>
          <h1>{user.first_name} {user.last_name}</h1>
          <p>@{user.username}</p>
        </div>
      </div>

      <div className='m-connections'>
        <h1>My Connections</h1>
        {connections.map(c => {
          return <Link  key={c.id} to={`/connection/${c.id}/overview`}>  
            <div className='menu-c' id={c.id}>
              <img alt='profile-img' className='con-img' 
                src={c.participants.profile_image} />
              {c.participants.first_name} {c.participants.last_name}
            </div>
          </Link>
        })}
      </div>
    </div>
  )
}

export default MenuUser