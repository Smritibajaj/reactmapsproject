import axios from 'axios';
import {RECEIVE_CLIENT_LOC, RECEIVE_ZOOM, RECEIVE_CLIENT_MARK, RECEIVE_CLIENT_DROP, RECEIVE_CLIENT_DROP_MARK,RECEIVE_DIRECTIONS, RECEIVE_CLIENT_LOC_NAME, RECEIVE_FILTERED_MARKERS, RECEIVE_PLACES} from '../actions'
const initialPlacesState = {

    clientLocation: { lat: 39.5, lng: -98.35 },
    zoomLevel: 3,
    clientMarker: {
        position: { lat: 39.5, lng: -98.35 },
        
    },
    clientLocationName:'clientLoc',
    dropLocation: {lat:28.4978046,lng:78.43339569999999},
    dropLocatinName:'drop',
    dropMarker: {lat:28.4978046,lng:77.43339569999999},
    directions: null,
    filteredMarkers: [],
    filterLevel: 1,
};
export default function (state = initialPlacesState, action) {
    const newState = Object.assign({}, state);
  
    switch (action.type) {
      case RECEIVE_CLIENT_LOC:
        newState.clientLocation = action.location;
        break;
  
      case RECEIVE_ZOOM:
        newState.zoomLevel = action.zoom;
        break;
  
      case RECEIVE_CLIENT_MARK:
        newState.clientMarker = action.clientMarker;
        break;
      
      case RECEIVE_CLIENT_DROP:
        newState.dropLocation = action.dropLocation;
        break;
      
      case RECEIVE_CLIENT_DROP_MARK:
          newState.dropMarker = action.dropMarker;
          break;
      case RECEIVE_DIRECTIONS:
        newState.directions = action.directions;
        break;
    case RECEIVE_CLIENT_LOC_NAME:
        newState.clientLocationName = action.clientLocationName;
        break;
        case RECEIVE_PLACES:
      newState.markers = action.places;
      break;
      case RECEIVE_FILTERED_MARKERS:
      newState.filteredMarkers = action.filteredMarkers;
      break
  
      default:
        return state;
    }
  
    return newState;
  }

  