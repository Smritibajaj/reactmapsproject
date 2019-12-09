import React from 'react';
import Map from './Map';
import { connect } from 'react-redux';
import HaversineGeolocation from 'haversine-geolocation';
import { receiveDirections,receiveClientLocName,receiveClientDrop,receiveClientMarker,receiveClientDropMark,receiveClientLoc,getPlaces } from '../actions';
class Home extends React.Component{
    constructor(props){
      super(props);
      this.onGeoCodeCallback=this.onGeoCodeCallback.bind(this);
      this.onGeocodeAddress=this.onGeocodeAddress.bind(this);
      this.onDropLocation=this.onDropLocation.bind(this);
      this.onInfoWindowClose=this.onInfoWindowClose.bind(this);
      this.onChange=this.onChange.bind(this);
      this.onMarkerDragEndForPickup=this.onMarkerDragEndForPickup.bind(this);
      this.onMarkerDragEndForDrop=this.onMarkerDragEndForDrop.bind(this);
      this.onPickUpLocation=this.onPickUpLocation.bind(this);
    }

  onGeoCodeCallback = (results, status, event) => {
    const google = window.google; // eslint-disable-line
   if (status === google.maps.GeocoderStatus.OK) {
    if (results[0]) {
      const add = results[0].formatted_address;
      console.log(add);
      this.props.setLocationName(add);
      // here we can dispatch action to search by city name and autofill the autocomplete
    } else {
      console.log("address not found");
    }
    } else {
      console.log(status);
    }
  }
  
  componentDidMount(){
    this.props.getPlaces(this.props.clientLocation.lat, this.props.clientLocation.lng, 'restaurant', 5);
    console.log(this.props.getPlaces(this.props.clientLocation.lat, this.props.clientLocation.lng, 'restaurant', 5))
  }
  onGeocodeAddress = () => {
  const google = window.google; // eslint-disable-line
  const geocoder = new google.maps.Geocoder();
  console.log(this.props.clientLocation)
  geocoder.geocode({ location: this.props.clientLocation }, this.onGeoCodeCallback);
  }

  calCulateDistance(){
    const {clientLocation,dropLocation} = this.props
    const p = HaversineGeolocation.getDistanceBetween({latitude: clientLocation.lat , longitude:clientLocation.lng}, {latitude: dropLocation.lat, longitude:dropLocation.lng}, 'mi');
    console.log("distance is ", p);
    return p;
  }

  calculateFare(){
    const distanceFare = 7;
    const dist = this.calCulateDistance()
    return (distanceFare*dist)
  }

  onDropLocation = (place) => {
    console.log(place);
    const lat = place.geometry.location.lat(),
        lng = place.geometry.location.lng();
    this.props.setClientDrop({lat,lng})
    this.props.setClientDropMark({lat,lng})
  };

  onInfoWindowClose = (event) => {
  };

  onChange = (event) => {
      this.setState({ [event.target.name]: event.target.value });
  };

  onMarkerDragEndForPickup = (event) => {
      let lat = event.latLng.lat(),
          lng = event.latLng.lng();
      this.props.setClientLocation({lat,lng})
      this.props.setClientMarker({lat,lng})
  }

  onMarkerDragEndForDrop = (event) => {
      console.log('event', event);
      let lat = event.latLng.lat(),
          lng = event.latLng.lng();
      this.props.setClientDrop({lat,lng})
      this.props.setClientDropMark({lat,lng})
  }


  onPickUpLocation = (place) => {
      console.log(place);
      const lat = place.geometry.location.lat(),
          lng = place.geometry.location.lng();
      // Set these values in the state.
      this.props.setClientLocation({lat,lng});
  };

render(){
  return (
    <>
    <Map
         center={this.props.clientLocation}
         height='300px'
         zoom={this.props.zoomLevel}
         clientLocation={this.props.clientLocation}
         directions={this.props.directions}
         dropLocation={this.props.dropLocation}
         geocodeAddress={this.onGeocodeAddress}
         clientLocationName={this.props.clientLocationName}
         updateDrop={this.onDropLocation}
         updatePickUp={this.onPickUpLocation}
         updatePickupMark={this.onMarkerDragEndForPickup}
         updateDropMark={this.onMarkerDragEndForDrop}
         onInfoWindowClose={this.onInfoWindowClose}
         dropLocationMarker={this.props.dropLocationMark}
         clientLocationMarker={this.props.clientMarker}
        />
        <div id="hero">{this.calCulateDistance()}</div>
        <div id="fare">{this.calculateFare()}</div>
        </>
);
}    
}

const mapStateToProps = state => ({
  zoomLevel: state.maps.zoomLevel,
  clientLocation: state.maps.clientLocation,
  clientMarker: state.maps.clientMarker,
  dropMarker:state.maps.dropMarker,
  dropLocation: state.maps.dropLocation,
  clientLocationName : state.maps.clientLocationName
});

const mapDispatchToProps = (dispatch) => {
  return {
    getPlaces(lat, lng, type, fL) {
      dispatch(getPlaces(lat, lng, type, fL));
    },
    setLocationName(address) {
      dispatch(receiveClientLocName(address));
    },
    setClientLocation(location){
      dispatch(receiveClientLoc(location))
    },
    setClientMarker(clientMarker){
      dispatch(receiveClientMarker(clientMarker))
    },
    setClientDrop(location){
      dispatch(receiveClientDrop(location))
    },
    setClientDropMark(dropMarker){
      dispatch(receiveClientDropMark(dropMarker))
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);