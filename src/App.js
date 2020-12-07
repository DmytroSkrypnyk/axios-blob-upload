
import React from 'react'
import axios from 'axios';

class SimpleReactFileUpload extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      file:null
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
  }
  onFormSubmit(e){
    e.preventDefault()
    this.fileUpload(this.state.file).then((response)=>{
      console.log(response.data);
    })
  }
  onChange(e) {
    this.setState({file:e.target.files[0]})
  }
  fileUpload(file){
    const formData = new FormData();

    console.log('file', file)

    formData.append('chunk',file)
    formData.append('fileExtension', file.name.split('.')[1])
    formData.append('isLastChunk', String(true))

    const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxODIiLCJyb2xlIjoiVGVhbSBBZG1pbiIsInRlYW1JZCI6IjM2IiwiZXhwIjoxNjA3MzIyNzA2LCJpc3MiOiJteXJhIHN0YWdpbmcifQ.fYgjmy6xdP-tbYOlDNDAurXh-7FTDRYHVusZ0l0TtxM'


    return axios({
        method: 'POST',
        url: 'https://media.staging.antourage.com/api/v1/videos',
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': token
        },
        data: formData
      })
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <h1>File Upload</h1>
        <input type="file" onChange={this.onChange} />
        <button type="submit">Upload</button>
      </form>
   )
  }
}

export default SimpleReactFileUpload
