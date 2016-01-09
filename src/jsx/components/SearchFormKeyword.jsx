import React from 'react'
import ReactDOM from 'react-dom'

export default class SearchFormKeyword extends React.Component {
  handleSubmit(e) {
    e.preventDefault();
    let query = ReactDOM.findDOMNode(this.refs.query).value.trim();
    if(!query) return;
    this.props.onSearchKeywordSubmit(query);
    ReactDOM.findDOMNode(this.refs.query).value = '';
  }

  render() {
    return(
      <form className='searchForm' onSubmit={this.handleSubmit.bind(this)}>
        <input type="text" placeholder="検索ワード" ref="query" />
        <input type="submit" value="検索" />
      </form>
    )
  }
}
