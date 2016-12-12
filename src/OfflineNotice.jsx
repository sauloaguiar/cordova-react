import React, {Component} from 'react';

export default class OfflineNotice extends Component {
  state = {
    isOnline : false,
  }

  wentOnline = () => {
    console.log("online");
    this.setState({isOnline: true});
  }

  wentOffline = () => {
    console.log("offline");
    this.setState({isOnline: false});
  }

  componentDidMount() {
    document.addEventListener("online", this.wentOnline, false);
    document.addEventListener("offline", this.wentOffline, false);
    const isOnline = navigator.connection.type !== 'none';
    this.setState({isOnline});
  }

  render() {
    const {isOnline} = this.state;
    console.log("render: " + isOnline);
    if (isOnline) {
      return <span>Online :)</span>;
    }
    return (
        <span>No internet connection...</span>
    );
  }
}
