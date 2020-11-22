import React from 'react'

const MenuUser = ({ user }) => {
  return (
    <div className='m-user flex'>
      <div>
        <h1>{user.first_name} {user.last_name}</h1>
        <p>{user.username}</p>
      </div>
      <img src={user.profile_image} 
        className='user-img' alt='profile-img'/>
    </div>

  )
}

export default MenuUser