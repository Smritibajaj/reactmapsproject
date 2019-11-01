import React, { Component } from 'react';
import {geolocated} from 'react-geolocated';
import Map from './Map';
class Home extends Component {
  render() {

    return (
      <div>
      <Map
           center={{lat: this.props.coords ? this.props.coords.latitude : 10, lng: this.props.coords ? this.props.coords.longitude : 73.8567}}
           height='300px'
           zoom={8}
          />
      <p>{this.props.coords && this.props.coords.latitude}</p>
      </div>
    )
  }
}


const HomeWithGeoloc = geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(Home);

export default HomeWithGeoloc


