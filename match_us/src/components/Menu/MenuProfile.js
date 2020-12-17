import React from 'react'

const MenuProfile = ({ user }) => {

  return (
    <>
      <div className='m-user flex'>
        <img src={user.profile_image}  alt='profile-img'/>
        <div>
          <h1>{user.first_name} {user.last_name}</h1>
          <p>@{user.username}</p>
        </div>
      </div>
    </>
  )
}

export default MenuProfile