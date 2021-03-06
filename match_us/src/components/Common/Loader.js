
import React from 'react'
import Loader from 'react-loader-spinner'

const Loading = ({ type }) => {

  return (
    <div className='center fh'>

      <Loader
        className='loader'
        type={type}
        color='#f40bd8'
        height={200}
        width={90}/>

      <div className='loader-text'>
        <p>Searching, please wait... </p>
        <small className='loader-access'>*Turn on browser location access for best results</small>
      </div>
      
    </div>
  )
}

export default Loading