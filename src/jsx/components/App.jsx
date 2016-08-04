import React from 'react'
import ImageList from './ImageList'
import Showcase from './Showcase'
import Status from './Status'
import SaveAsZip from './SaveAsZip'
import SearchForm from './SearchForm'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tweets: [],
      showImageId: null
    }
  }

  saveAsZip(json) {
    json = JSON.parse(json)
    console.log(json)
  }

  requestImages(array) {
    $.ajax({
      type: 'GET',
      url: '/download.json',
      dataType: 'json',
      data: encodeURIComponent(JSON.stringify(array)),
      success: (data) => {
        this.saveAsZip(data)
        console.log(data)
      },
      error: (xh4, status, err) => {
        console.error(err)
      }
    });
  }

  imageShowcase(id) {
    this.setState({showImageId: id})
  }

  render() {
    return(
      <div className='dashboard'>
        <Showcase
          tweets={this.state.tweets}
          targetId={this.state.showImageId}
        />
        <header>
          <Status query={this.state.query} />
          <SaveAsZip
            list={this.state.selectedImageUrl}
            onSaveButtonClicked={this.requestImages.bind(this)}
          />
          <div className='header__forms clearfix'>
            <SearchForm
            />
          </div>
        </header>
        <ImageList
          data={this.state}
          onShowButtonClicked={this.imageShowcase.bind(this)}
        />
      </div>
    )
  }
}
