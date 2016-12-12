import React, { Component } from 'react';

export default class Image extends Component {
  render(){
    return (
        <div className="image">
          <img src={this.props.path} alt={this.props.alt} style={{ width: '100%' }} />
        </div>
    );
  }
}
