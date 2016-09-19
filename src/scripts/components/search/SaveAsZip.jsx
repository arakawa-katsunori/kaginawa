import React from 'react'

export default class SaveAsZip extends React.Component {
  handleClick(e) {
    this.props.onSaveButtonClicked(this.props.list);
  }

  render() {
    return(
      <div className='header__buttons'>
        <button onClick={this.handleClick.bind(this)}><i className="fa fa-download" /></button>
      </div>

    );
  }
}
