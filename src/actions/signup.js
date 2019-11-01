import { myFirebase,googleProvider } from "../firebase/firebase";
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS'
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE'
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST'

const requestSignUp = () => {
    return {
        type: SIGN_UP_REQUEST
    };
};

const receiveSignUp = user => {
    return {
        type: SIGN_UP_SUCCESS,
        user
    };
};

const signUpError = () => {
    return {
        type: SIGN_UP_FAILURE
    };
};

export const signUpUser = (email, password) => dispatch => {
    dispatch(requestSignUp());
    myFirebase.auth().createUserWithEmailAndPassword(email, password)
        .then(dataBeforeEmail => {
            myFirebase.auth().onAuthStateChanged(function (user) {
                user.sendEmailVerification();
            });
        })
        .then(user => {
            console.log("i am here");
            console.log(receiveSignUp(user))
            dispatch(receiveSignUp(user));
        })
        .catch(error => {
            //Do something with the error if you want!
            dispatch(signUpError());
        });
};

export const googleLogin = () => dispatch =>{
  
    myFirebase.auth().signInWithRedirect(googleProvider)
    .then(result => {
        dispatch(receiveSignUp(result.user));
    })
    .catch(error => {
        //Do something with the error if you want!
        dispatch(signUpError());
      });
  }