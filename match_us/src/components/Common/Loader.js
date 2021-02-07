
import React from 'react'
import Loader from 'react-loader-spinner'

class Loading extends React.Component {

  render() {
    return (
      <>
        <div className='center fh'>
          <Loader
            type="Bars"
            color="#f20cd766"
            height={200}
            width={90}
          />
          <div className='flex loader-text'>
            <p>Searching, please wait... </p>
          </div>
        </div>
      </>
    )
  }
}

export default Loading