import React from 'react'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import NotificationSystem from 'react-notification-system'

import { search, deleteSearch } from '../../actions/search'

const mapStateToProps = state => {
  return {
    isFetching: state.fetchedItems.isFetching
  }
}

const mapDispatchToProps = dispatch => {
  return {
    push: path => dispatch(push(path)),
    search: (query, endpoint) => dispatch(search(query, endpoint)),
    deleteSearch: () => dispatch(deleteSearch())
  }
}

class SearchForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      placeholder: 'キーワード検索'
    }
    this._notification = null
  }

  _addNotification(event) {
    event.preventDefault()
    this._notification.addNotification({
      level: 'info',
      position: 'tc',
      message: 'キーワードを入力してください'
    })
  }

  componentDidMount() {
    this._notification = this. refs.notification
  }

  handleSubmit(event) {
    event.preventDefault()
    if(this.props.isFetching) return

    let query = findDOMNode(this.refs.query).value.trim()
    let firstChar = query.charAt(0)

    if(query.length <= 0) {
      this._addNotification(event)
      return
    }

    this.setState({placeholder: query})

    this.props.deleteSearch()
    switch (firstChar) {
      case '@':
        query = query.substr(1)
        query = '?q='+query
        this.props.search(query, 'account')
        break
      default:
        query = '?q='+query
        this.props.search(query, 'tweets')
    }
    this.props.push('/search' + query)
  }

  render() {
    return(
      <form
        className='search_form'
        onSubmit={ event => this.handleSubmit(event) }
      >
        <NotificationSystem ref='notification' />
        <input
          type='text'
          ref='query'
          placeholder={this.state.placeholder}
        />
        <button type='submit'>
          { this.props.isFetching ? <i className='fa fa-spinner fa-pulse' /> : <i className='fa fa-search' /> }
        </button>
      </form>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchForm)
