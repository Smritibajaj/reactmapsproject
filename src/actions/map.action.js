//const RECEIVE_PLACES = 'RECEIVE_PLACES';
const RECEIVE_CLIENT_PICK_LOC = 'RECEIVE_CLIENT_PICK_LOC';
const RECEIVE_ZOOM = 'RECEIVE_ZOOM';
const RECEIVE_CLIENT_MARK = 'RECEIVE_CLIENT_MARK';
const RECEIVE_CLIENT_DROP = 'RECEIVE_CLIENT_DROP';
const RECEIVE_CLIENT_DROP_MARK = 'RECEIVE_CLIENT_DROP_MARK';
const RECEIVE_DRIVER_LOCATION = 'RECEIVE_DRIVER_LOCATION';
//const RECEIVE_FILTER_LEVEL = 'RECEIVE_FILTER_LEVEL';
//const RECEIVE_FILTERED_MARKERS = 'RECEIVE_FILTERED_MARKERS';
const RECEIVE_SELECTED = 'RECEIVE_SELECTED';
const RECEIVE_DIRECTIONS = 'RECEIVE_DIRECTIONS';

//export const receivePlaces = places => ({ type: RECEIVE_PLACES, places });
export const receiveClientLoc = location => ({ type: RECEIVE_CLIENT_PICK_LOC, location });
export const receiveZoom = zoom => ({ type: RECEIVE_ZOOM, zoom });
export const receiveClientMarker = clientMarker => ({ type: RECEIVE_CLIENT_MARK, clientMarker });
export const receiveClientDrop = location => ({type: RECEIVE_CLIENT_DROP , location});
export const receiveClientDropMark = clientMarker => ({type : RECEIVE_CLIENT_DROP_MARK,clientMarker});
export const receiveDriverLocation = location => ({ type: RECEIVE_DRIVER_LOCATION, location});
//export const receiveFilterLevel = filterLevel => ({ type: RECEIVE_FILTER_LEVEL, filterLevel });
//export const receiveFilteredMarkers = filteredMarkers => ({ type: RECEIVE_FILTERED_MARKERS, filteredMarkers });
export const receiveSelected = selected => ({ type: RECEIVE_SELECTED, selected });
export const receiveDirections = directions => ({ type: RECEIVE_DIRECTIONS, directions });





// thunked actions

export const getPlaces = (lat, lng, type, fL) => {
  return dispatch => {
    // console.log(lat, lng, type, fL)
    axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&rankby=distance&type=${type}&key=AIzaSyD_AZqRShVfhj4LQrCjwRTt1ZBQXIlGjGc`)
    .then(places => {
        // console.log(places)
        res.json(places);
      })
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
      dispatch(receiveFilteredMarkers(filtered));
    })
    .catch(err => console.error('loading places unsuccessful', err));
  };
};
