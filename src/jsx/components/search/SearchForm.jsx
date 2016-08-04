import React from 'react'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'

import { search, deleteSearch } from '../../actions/search'

const mapStateToProps = state => {
  return {
    isFetching: state.fetchedItems.isFetching
  }
}

const mapDispatchToProps = dispatch => {
  return {
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
  }

  handleSubmit(event) {
    event.preventDefault()
    if(this.props.isFetching) return

    let query = findDOMNode(this.refs.query).value.trim()
    let firstChar = query.charAt(0)

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
  }

  render() {
    return(
      <form
        className='search_form'
        onSubmit={ event => this.handleSubmit(event) }
      >
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
