import React from 'react'

const MatchModal = ({ modal, error }) => {
  return (
    <div className='modal' onClick={modal}>
      <div className='m-pop'>
        <p>{error}</p>
      </div>
    </div>
  )
}

export default MatchModal