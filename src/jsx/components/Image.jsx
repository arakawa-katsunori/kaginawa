import React from 'react'
import { connect } from 'react-redux'

import { addImage, deleteImage } from '../actions'

const mapDispatchToProps = dispatch => {
  return {
    addImage: url => dispatch(addImage(url)),
    deleteImage: url => dispatch(deleteImage(url))
  }
}

export default class Image extends React.Component {
  handleChange(event) {
    const url = event.target.value
    const checked = event.target.checked

    if (checked) {
      this.props.addImage(url)
    } else {
      this.props.deleteImage(url)
    }
  }

  handleClickShowcase(event) {
    event.preventDefault()
    this.props.onShowButtonClicked(this.props.tweetId)
  }

  openNewWindow(event, url) {
    event.preventDefault()
    window.open(url, '_blank', 'width=640, height=480')
  }

  render() {
    const favoriteUrl = 'https://twitter.com/intent/favorite?tweet_id=' + this.props.tweetIdStr
    const retweetUrl = 'https://twitter.com/intent/retweet?tweet_id=' + this.props.tweetIdStr
    return(
      <div className='image'>
        <input
          type='checkbox'
          name='selectImages'
          id={this.props.tweetId}
          value={this.props.imageUrl}
          onChange={ event => this.handleChange(event) }
        />
        <label htmlFor={this.props.tweetId} className='check_icon'>
          <i className='fa fa-check' />
        </label>
        <label htmlFor={this.props.tweetId}>
          <img
            ref={'imageId_' + this.props.tweetId}
            src={this.props.imageUrl}
            width={this.props.width+'px'}
            height={this.props.height+'px'}
          />
        </label>
        <div className='image_menu'>
          <a className='image_menu__links' onClick={ event => this.handleClickShowcase(event) } >
            <i className='fa fa-film' />
          </a>
          <a className='image_menu__links' href={this.props.tweetLink} target='_blank' >
            <i className='fa fa-twitter' />
          </a>
          <a className='image_menu__links' onClick={ (event, url) => this.openNewWindow(event, favoriteUrl) } >
            <i className='fa fa-heart' />
          </a>
          <a className='image_menu__links' onClick={ (event, url) => this.openNewWindow(event, retweetUrl) } >
            <i className='fa fa-retweet' />
          </a>
        </div>
      </div>
    )
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Image)
