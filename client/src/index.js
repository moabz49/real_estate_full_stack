import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import { MantineProvider } from '@mantine/core';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <MantineProvider>
        <Auth0Provider
            domain={process.env.REACT_APP_DOMAIN}
            clientId={process.env.REACT_APP_CLIENT_ID}
            authorizationParams={{
                redirect_uri: 'http://localhost:3000',
                audience: "http://localhost:8000"
            }}
            scope="openid profile email"
        >   
                <App />
        </Auth0Provider>
    </MantineProvider>
);

// openid: This is a standard OAuth 2.0 scope that's used to authenticate users and get an ID token for them. 
// profile: This scope is used to request access to the user's profile information, such as their name, picture, and other information.
// email: This scope is used to request access to the user's email address.

// When your application requests these scopes, the user will be asked to consent to your application accessing this information. If the user consents, the information will be included in the ID token that Auth0 issues to your applicatio