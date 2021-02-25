
import React from 'react'
import Loader from 'react-loader-spinner'

const Loading = ({ type }) => {

  return (
    <>
      <div className='center fh'>
        <Loader
          type={type}
          color="#f20cd766"
          height={200}
          width={90}/>
        <div className='flex loader-text'>
          <p>Searching, please wait... </p>
        </div>
      </div>
    </>
  )
}

export default Loading