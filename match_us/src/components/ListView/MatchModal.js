import React from 'react'

const MatchModal = ({ modal, error }) => {
  return (
    <div className='match-modal' onClick={modal}>
      <div className='modal'>
        <div className='modal-pop'>
          <p>{error}</p>
        </div>
      </div>
    </div>
  )
}

export default MatchModal