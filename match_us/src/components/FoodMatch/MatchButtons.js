import React from 'react'

const MatchButtons = ({ getDetail, id }) => {
  return (
    <>
      <button id={id} onClick={e => e.stopPropagation(), getDetail}>See Details</button>
      <button>Create date event</button>
    </>
  )
}
export default MatchButtons