import React from 'react'
import { connect } from 'react-redux'

import Image from './Image'
import { search } from '../actions/search'

const mapStateToProps = state => {
  return {
    isFetching: state.fetchedItems.isFetching,
    tweets: state.fetchedItems.tweets,
    nextResults: state.fetchedItems.nextResults
  }
}

const mapDispatchToProps = dispatch => {
  return {
    search: (query, endpoint) => dispatch(search(query, endpoint))
  }
}

class ImageList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      boxWidth: window.innerWidth - 1
    }
  }
  componentDidMount() {
    this.props.search('?q=着てみた', 'tweets') //TODO: remove in production
    window.addEventListener('resize', this.handleResize.bind(this))
    window.addEventListener('scroll', this.handleScroll.bind(this))
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize.bind(this))
    window.removeEventListener('scroll', this.handleScroll.bind(this))
  }
  componentDidUpdate() {
    let windowHeight = window.innerHeight
    let scrollHeight = document.body.offsetHeight

    if (scrollHeight < windowHeight && !this.props.isFetching) {
      this.props.search(this.props.nextResults, 'tweets')
    }
  }
  handleResize() {
    this.setState({boxWidth: window.innerWidth - 1})
  }
  handleScroll() {
    let scrollTop = document.body.scrollTop
    let windowHeight = window.innerHeight
    let scrollHeight = document.body.scrollHeight

    let remain = scrollHeight - windowHeight - scrollTop

    if (remain <= 0) this.props.search(this.props.nextResults, 'tweets')
  }
  handleContinue() {
    this.props.search(this.props.nextResults, 'tweets')
  }
  render() {
    const defaultHeight = 180
    const margin = 2
    let boxWidth = this.state.boxWidth
    let imageWidthSum = 0
    let currentLine = 1
    let lineHeight = []

    let prepare = this.props.tweets.map( tweet => {
      let imageWidth = tweet.entities.media[0].sizes.large.w / (tweet.entities.media[0].sizes.large.h / defaultHeight)
      let result = {
        key: tweet.id_str,
        id: tweet.id_str,
        screenName: tweet.user.screen_name,
        imageUrl: tweet.entities.media[0].media_url,
        width: imageWidth,
        line: currentLine
      }
      imageWidthSum += imageWidth
      if (imageWidthSum >= boxWidth) {
        lineHeight[currentLine] = defaultHeight * (boxWidth / (imageWidthSum - imageWidth))
        result.line = currentLine + 1
        imageWidthSum = imageWidth
        currentLine++
      }
      return result
    })

    let tweetNodes = prepare.map( tweet => {
      return(
        <Image
          key={tweet.key}
          tweetId={tweet.id}
          imageUrl={tweet.imageUrl}
          tweetLink={'https://twitter.com/' + tweet.screenName + '/status/' + tweet.id}
          width={tweet.width * (lineHeight[tweet.line] / defaultHeight) - (margin * 2)}
          height={lineHeight[tweet.line] || defaultHeight}
        />
      )
    })
    return(
      <div className='container' ref='imageList'>
        <div className='images clearfix'>
          {tweetNodes}
        </div>
        <div className='images__continue_bar' onClick={ event => this.handleContinue(event) }>
          { this.props.isFetching ? <i className='fa fa-spinner fa-pulse' /> : <a>続きを表示</a> }
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageList)
