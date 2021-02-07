import React from 'react'

const ToggleView = ({ changeView, view }) => {
  console.log(view)
  return (
    <>
      <div onClick={changeView} className='list-icon'> view
      </div>
    </>
  )
} 
export default ToggleView