import axios from 'axios';
export const RECEIVE_CLIENT_LOC = 'RECEIVE_CLIENT_LOC';
export const RECEIVE_ZOOM = 'RECEIVE_ZOOM';
export const RECEIVE_CLIENT_MARK = 'RECEIVE_CLIENT_MARK';
export const RECEIVE_CLIENT_DROP = 'RECEIVE_CLIENT_DROP';
export const RECEIVE_CLIENT_DROP_MARK = 'RECEIVE_CLIENT_DROP_MARK';
export const RECEIVE_DRIVER_LOCATION = 'RECEIVE_DRIVER_LOCATION';
export const RECEIVE_DIRECTIONS = 'RECEIVE_DIRECTIONS';
export const RECEIVE_CLIENT_LOC_NAME = 'RECEIVE_CLIENT_LOC_NAME';
export const RECEIVE_PLACES = 'RECEIVE_PLACES';
export const RECEIVE_FILTERED_MARKERS = 'RECEIVE_FILTERED_MARKERS';

export const receiveClientLoc = location => ({ type: RECEIVE_CLIENT_LOC, location });
export const receiveZoom = zoom => ({ type: RECEIVE_ZOOM, zoom });
export const receiveClientMarker = clientMarker => ({ type: RECEIVE_CLIENT_MARK, clientMarker });
export const receiveClientDrop = location => ({type: RECEIVE_CLIENT_DROP , location});
export const receiveClientDropMark = dropMarker => ({type : RECEIVE_CLIENT_DROP_MARK,dropMarker});
export const receiveDirections = directions => ({ type: RECEIVE_DIRECTIONS, directions });
export const receiveDriverLocation = location => ({ type: RECEIVE_DRIVER_LOCATION, location});
export const receiveClientLocName= name => ({type: RECEIVE_CLIENT_LOC_NAME, name});
export const receiveFilteredMarkers = filteredMarkers => ({ type: RECEIVE_FILTERED_MARKERS, filteredMarkers });
export const receivePlaces = places => ({ type: RECEIVE_PLACES, places });

export const getPlaces = (lat, lng, type='restaurant', fL='5') => {
    return dispatch => {
      // console.log(lat, lng, type, fL)
      axios.get(`/place/nearbysearch/json?location=${lat},${lng}&rankby=distance&type=${type}&key=AIzaSyD_AZqRShVfhj4LQrCjwRTt1ZBQXIlGjGc`)
      .then(res => {
        let places = res.data.results;
        dispatch(receivePlaces(places));
        return places;
      })
      .then(places => {
        let i = 0;
        let filtered = [];
        while (i < fL) {
          filtered.push(places[i]);
          i++;
        }
        console.log(dispatch(receiveFilteredMarkers(filtered)));

      })
      .catch(err => console.error('loading places unsuccessful', err));
    };
  };
  