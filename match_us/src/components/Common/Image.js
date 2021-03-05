/* eslint-disable no-unused-vars */
import React from 'react'
import axios from 'axios'
import Loader from 'react-loader-spinner'

const uploadUrl = 'https://api.cloudinary.com/v1_1/diyxyp4qk/image/upload'
const uploadPreset = 'eceecv3s'


class ImageUpload extends React.Component {
  state = {
    formData: {
      image: ''
    },
    loading: false
  }

  toggleLoad = () => { 
    this.setState({ loading: !this.state.loading })
  }

  handleUpload = async event => {
    this.toggleLoad()
    const data = new FormData()
    data.append('file', event.target.files[0])
    data.append('upload_preset', uploadPreset)
    const photoRes = await axios.post(uploadUrl, data)
    this.setState({ formData: { image: photoRes.data.url } },
      () => {
        this.props.handleImage(photoRes.data.url)
        this.toggleLoad()
      }
    )
  }

  render() {
    const { loading } = this.state
    return (
  
      <div> 

        <input 
          name='image'
          className='img-input'
          type="file"
          onChange={this.handleUpload}/>

        {loading ? <Loader
          type='ThreeDots'
          color="#f20cd766"
          height={30}
          width={50}/> : null}

      </div>

    )
  }
}
export default ImageUpload