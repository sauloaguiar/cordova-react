import React, { Component } from 'react';
import Image from './Image.jsx';
import InfiniteScroll from 'react-infinite-scroll-component';
var axios = require('axios');

export default class ImageList extends Component {
  constructor(props){
    super(props);
    this.state = {list: [], max: -1, elements: 10, hasMore: true, loading: true}
  }

  getCurrentNum = () => {
    const { list } = this.state;
    var _this = this;
    axios.get("http://xkcd.com/info.0.json").then(function(response){
        _this.setState({
          list: [ ...list, response.data],
          max: response.data.num,
        });
        _this.getImages();
    });
  }

  updateState(data){
    const { list } = this.state;
    this.setState({
      list : [
        ...list,
        data,
      ],
      loading: false
    });
  }

  getImages = () => {
    const {max, elements, list} = this.state;
    if(list.length == max) {
      this.setState({
        ...this.state,
        hasMore: false
      });
      return;
    }
    var _this = this;
    const size = list.length/elements;
    var requests = [];
    [...Array(elements)].map((elem, index) => {
      const curr = max - (size * elements) - index;
      requests.push("http://xkcd.com/" + curr + "/info.0.json");
    });
    let promiseArray = requests.map(url => axios.get(url));
    axios.all(promiseArray).then(function(response){
      response.map(r => _this.updateState(r.data));
    });
  }

  componentDidMount(){
    this.getCurrentNum()
  }

  renderLoading = () => {
    console.log("loading: " + this.state.loading);
    if (!this.state.loading) {
      return null;
    }
    return (
      <h4 style={{paddingTop: '200px'}}>Loading...</h4>
    );
  }

  render() {
    const {list, hasMore} = this.state;
    if(list.length > 0) {
      const list = this.state.list;
      const images = list.map((elem) => <Image key={elem.num} id={elem.num} path={elem.img} alt={elem.alt}/>);
      return (
        <div className="gallery">
          <div className="images">
          <InfiniteScroll
            next={this.getImages}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}>
            {images}
          </InfiniteScroll>
        </div>
      </div>
      );
    } else {
      return (
        <div>
          {this.renderLoading()}
        </div>
      );
    }

  }
}
