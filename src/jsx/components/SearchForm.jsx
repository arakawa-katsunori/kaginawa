import React from 'react'
import { findDOMNode } from 'react-dom'

export default class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchType: 'keyword',
      placeholder: {
        keyword: 'キーワード検索',
        account: 'アカウント検索'
      }
    };
  }

  handleChange(e) {
    this.setState({
      searchType: findDOMNode(this.refs.inputType).value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let query = findDOMNode(this.refs.query).value.trim();
    if (!query) return;
    switch (this.state.searchType) {
      case 'account':
        this.props.onAccountSubmit(query);
        break;
      case 'keyword':
        this.props.onKeywordSubmit(query);
        break;
      default:
        this.props.onKeywordSubmit(query);
        break;
    }
    findDOMNode(this.refs.query).value = '';
  }

  render() {
    return(
      <form
        className='searchForm'
        onChange={this.handleChange.bind(this)}
        onSubmit={this.handleSubmit.bind(this)}
      >
        <button type='button'>
          <i className='fa fa-caret-down' />
          <select ref='inputType'>
            <option value='keyword'>キーワード検索</option>
            <option value='account'>アカウント検索</option>
          </select>
        </button>
        <input
          type='text'
          ref='query'
          placeholder={this.state.placeholder[this.state.searchType]}
        />
        <button type='submit'><i className='fa fa-search' /></button>
      </form>
    )
  };
}
