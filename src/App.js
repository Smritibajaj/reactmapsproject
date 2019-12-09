import React from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";
import {receiveClientLoc, receiveZoom, receiveClientMarker, receiveClientDrop } from './actions';
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";


function App(props) {
  const { isAuthenticated, isVerifying } = props;
  return (
    <Switch>
      <ProtectedRoute
        exact
        path="/"
        component={Home}
        onEnter={props.onAppEnter()}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />

    </Switch>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isVerifying: state.auth.isVerifying
  };
}
const mapDispatchToProps = (dispatch) => {
return{
  onAppEnter(){
    new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    }).then(res => {
    let coords = { lat: res.coords.latitude, lng: res.coords.longitude };
    dispatch(receiveClientLoc(coords));
    dispatch(receiveZoom(17));
    dispatch(receiveClientMarker({ position: coords}));
  })
  .catch(err => {
    console.error(err.message);
  })
  }
}
}
export default connect(mapStateToProps,mapDispatchToProps)(App);