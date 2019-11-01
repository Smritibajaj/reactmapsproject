import React from 'react';
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker, Polyline, DirectionsRenderer } from "react-google-maps";
import Autocomplete from 'react-google-autocomplete';

class Map extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            direction: null,
            mapPosition: {
                lat: this.props.center.lat,
                lng: this.props.center.lng
            },
            pickUpLocation: {
                lat: this.props.center.lat,
                lng: this.props.center.lng
            },
            dropLocation: {
                lat: this.props.center.lat,
                lng: this.props.center.lng
            }
        }
    }

    onInfoWindowClose = (event) => {
    };

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    onMarkerDragEndForPickup = (event) => {
        console.log('event', event);
        let newLat = event.latLng.lat(),
            newLng = event.latLng.lng();
        this.setState({
            ...this.state,
            pickUpLocation: {
                lat: parseFloat(newLat),
                lng: parseFloat(newLng)
            },
        })
    }

    onMarkerDragEndForDrop = (event) => {
        console.log('event', event);
        let newLat = event.latLng.lat(),
            newLng = event.latLng.lng();
        this.setState({
            ...this.state,
            dropLocation: {
                lat: parseFloat(newLat),
                lng: parseFloat(newLng)
            },
        })
    }


    onPickUpLocation = (place) => {
        console.log(place);
        const latValue = place.geometry.location.lat(),
            lngValue = place.geometry.location.lng();
        // Set these values in the state.
        this.setState({
            ...this.state,
            pickUpLocation: {
                lat: parseFloat(latValue),
                lng: parseFloat(lngValue)
            },
        })
    };

    onDropLocation = (place) => {
        console.log(place);
        const latValue = place.geometry.location.lat(),
            lngValue = place.geometry.location.lng();
        // Set these values in the state.
        this.setState({
            ...this.state,
            dropLocation: {
                lat: parseFloat(latValue),
                lng: parseFloat(lngValue)
            },
        })
    };

    render() {
        const AsyncMap = withScriptjs(
            withGoogleMap(
                props => (
                    <GoogleMap google={window.google}
                        defaultZoom={6}
                        defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
                    >
                        {/* For Auto complete Search Box */}
                        <Autocomplete
                            style={{
                                width: '100%',
                                height: '40px',
                                paddingLeft: '16px',
                                marginTop: '2px',
                                marginBottom: '100px'
                            }}
                            onPlaceSelected={this.onPickUpLocation}
                            types={['(regions)']}
                        />
                        <Autocomplete
                            style={{
                                width: '100%',
                                height: '40px',
                                paddingLeft: '16px',
                                marginTop: '2px',
                                marginBottom: '100px'
                            }}
                            onPlaceSelected={this.onDropLocation}
                            types={['(regions)']}
                        />
                        <Marker google={window.google}
                            name={'Dolores park'}
                            draggable={true}
                            onDragEnd={this.onMarkerDragEndForPickup}
                            position={{ lat: this.state.pickUpLocation.lat, lng: this.state.pickUpLocation.lng }}
                        />
                        <Marker />
                        <Marker google={window.google}
                            name={'Dolores park'}
                            draggable={true}
                            onDragEnd={this.onMarkerDragEndForDrop}
                            position={{ lat: this.state.dropLocation.lat, lng: this.state.dropLocation.lng }}
                        />
                        <Marker />
                        {/* InfoWindow on top of marker */}
                        <InfoWindow
                            onClose={this.onInfoWindowClose}
                            position={{ lat: (this.state.pickUpLocation.lat + 0.0018), lng: this.state.pickUpLocation.lng }}
                        >
                            <div>
                                <span style={{ padding: 0, margin: 0 }}>{this.state.address}</span>
                            </div>
                        </InfoWindow>
                        <InfoWindow
                            onClose={this.onInfoWindowClose}
                            position={{ lat: (this.state.dropLocation.lat + 0.0018), lng: this.state.dropLocation.lng }}
                        >
                            <div>
                                <span style={{ padding: 0, margin: 0 }}>{this.state.address}</span>
                            </div>
                        </InfoWindow>


                    </GoogleMap>

                )
            )
        )
        let map;
        if (this.props.center.lat !== undefined) {
            map = <div>
                <AsyncMap
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBnbUh1crm71pJfxpuC3z_9ViBH3A1zu3c&v=3.exp&libraries=geometry,drawing,places&sensor=false"
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

export default Map;