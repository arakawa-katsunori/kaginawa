import React from 'react'
import ReactDOM from 'react-dom'

export default class SearchFrom extends React.Component {
  handleSubmit(e) {
    e.preventDefault();
    let query = ReactDOM.findDOMNode(this.refs.query).value.trim();
    if(!query) return;
    this.props.onSearchSubmit(query);
    ReactDOM.findDOMNode(this.refs.query).value = '';
  }

  render() {
    return(
      <form className='searchFrom' onSubmit={this.handleSubmit.bind(this)}>
        <input type="text" placeholder="type here search words" ref="query" />
        <input type="submit" value="Post" />
      </form>
    )
  }
}
