import React from 'react';
import { withGoogleMap, GoogleMap, withScriptjs, Marker, DirectionsRenderer } from "react-google-maps";
import { connect } from 'react-redux';
import Autocomplete from 'react-google-autocomplete';
import { receiveDirections  } from '../actions';

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.getDirections=this.getDirections.bind(this);
    }
    getDirections() {
        let google = window.google;
        const DirectionsService = new google.maps.DirectionsService();
        DirectionsService.route({
          origin: this.props.clientLocation,
          destination: this.props.dropLocation,
          travelMode: google.maps.TravelMode.DRIVING,
        }, (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            this.props.setDirections(result);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        });
    }
    render() {
        const AsyncMap = withScriptjs(
            withGoogleMap(
                props => (
                    <>
                    <GoogleMap google={window.google}
                        defaultZoom={this.props.zoom}
                        defaultCenter={this.props.clientLocation}
                    >
                        {/* For Auto complete Search Box */}
                        <Autocomplete
                            style={{
                                width: '100%',
                                height: '40px',
                                paddingLeft: '16px',
                                marginTop: '2px',
                                marginBottom: '10px'
                            }}
                            onPlaceSelected={this.props.updatePickUp}
                            types={['(regions)']}
                            value={this.props.geocodeAddress()}
                            onChange={this.props.geocodeAddress()}
                        />
                        <Autocomplete
                            autoFocus
                            style={{
                                width: '100%',
                                height: '40px',
                                paddingLeft: '16px',
                                marginTop: '2px',
                                marginBottom: '10px'
                            }}
                            onPlaceSelected={this.props.updateDrop}
                            types={['(regions)']}
                        />
                        <Marker google={window.google}
                            name={'A'}
                            draggable={true}
                            onDragEnd={this.props.updatePickupMark}
                            position={this.props.clientLocation}
                        />
                        <Marker google={window.google}
                        name={'b'}
                        draggable={true}
                        onDragEnd={this.props.updateDropMark}
                        position={this.props.dropLocation}
                        />

                        {this.props.directions && <DirectionsRenderer directions={this.props.directions} />}

                    </GoogleMap>
                    <button onClick={this.getDirections()} > Get Directions </button>
                    </>

                )
            )
        )
        let map;
        if (this.props.center.lat !== undefined) {
            map = <div>
                <AsyncMap
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD_AZqRShVfhj4LQrCjwRTt1ZBQXIlGjGc&v=3.exp&libraries=geometry,drawing,places&sensor=false"
                    loadingElement={
                        <div style={{ height: `100%` }} />
                    }
                    containerElement={
                        <div style={{ height: this.props.height }} />
                    }
                    mapElement={
                        <div style={{ height: `100%` }} />
                    }
                />
            </div>
        } else {
            map = <div style={{ height: this.props.height }} />
        }

        return (map)
    }
}



const mapStateToProps = state => ({
    directions: state.maps.directions
});
const mapDispatchToProps= (dispatch) => {
    return {
        setDirections(directions) {
            dispatch(receiveDirections(directions));
        }
    }
}

export default  connect(mapStateToProps, mapDispatchToProps)(Map);