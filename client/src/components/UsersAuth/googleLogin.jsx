import React from 'react';
import {GoogleLogin} from 'react-google-login';
import axios from 'axios';
import { authenticate, isAuth } from '../../actions/userAuth.js';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons' 
import './googleLogin.css';
import { baseUrl } from '../../api/index';

const Google = (client) => {

  const isClient = client.isClient

    const history = useHistory()

    const icon = <FontAwesomeIcon icon={faGoogle} />

const sendGoogleToken = tokenId => {
  if(isClient == "true"){
  axios
    .post(`${baseUrl}/basicUsers/googlelogin`, {
      idToken: tokenId
    })
    .then(res => {
      console.log(res.data);
      informParent(res);
    })
    .catch(error => {
      window.location.reload();
      console.log('GOOGLE SIGN IN ERROR', error.response);
    });
  }
  else{
    axios
    .post(`${baseUrl}/professionalUsers/googlelogin`, {
      idToken: tokenId
    })
    .then(res => {
      console.log(res.data);
      informParent(res);
    })
    .catch(error => {
      window.location.reload();
      console.log('GOOGLE SIGN IN ERROR', error.response);
    });
  }
};

const informParent = response => {
  authenticate(response, () => {
    isAuth()
    if(isClient == "true")
      if(response.data.isNew){
        history.push(`/user/quiz/${JSON.parse(localStorage.getItem('user'))._id}`);
      }
      else {
        history.push(`/clientDashboard/${JSON.parse(localStorage.getItem('user'))._id}`);
      }
    else{
      if(response.data.isNew)
      {
        history.push(`/professional/quiz/${JSON.parse(localStorage.getItem('user'))._id}`);
      }
      else
      {
        history.push(`/professionalDashboard/${JSON.parse(localStorage.getItem('user'))._id}`);
      }
    }
  });
};


const responseGoogle = response => {
  console.log(response);
  sendGoogleToken(response.tokenId);
};
    return (
        <GoogleLogin
          clientId='490602914779-7kv3ltvaluhh4ca4f3p7skuhv065dn6a.apps.googleusercontent.com'
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          render={renderProps => (
            <button
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              className='GoogleLogin'
              >
              <div className=' p-2 rounded-full '>
                <i style={{'marginLeft': '5px'}}>{icon}</i>
              </div>
              <span style={{'marginTop': '8px', 'marginLeft': '8px' }}>Sign In with Google</span>
            </button>
          )}
          cookiePolicy={'single_host_origin'}
        />
    );
  };

  export default Google;