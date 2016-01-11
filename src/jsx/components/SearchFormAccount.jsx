import React from 'react'
import ReactDOM from 'react-dom'

export default class SearchFormAccount extends React.Component {
  handleSubmit(e) {
    e.preventDefault();
    let query = ReactDOM.findDOMNode(this.refs.query).value.trim();
    if(!query) return;
    this.props.onSearchAccountSubmit(query);
    ReactDOM.findDOMNode(this.refs.query).value = '';
  }

  render() {
    return(
      <form className='searchForm' onSubmit={this.handleSubmit.bind(this)}>
        <input type="text" placeholder="ユーザーID" ref="query" />
        <button type="submit"><i className="fa fa-search"></i></button>
      </form>
    )
  }
}
