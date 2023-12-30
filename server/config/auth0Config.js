import { auth } from 'express-oauth2-jwt-bearer';
import dotenv from 'dotenv';
dotenv.config();

const DOMAIN_URL = process.env.AUTH0_DOMAIN_URL;
// The purpose of this middleware is to authenticate users based on their JWT. When a user sends a request with a JWT in the AUTHORIZATION HEADER, "JWTCHECK" will validate the JWT and add the decoded token to "REQ.USER". If the JWT is invalid or missing, jwtCheck will send a 401 Unauthorized response. This ensures that only authenticated users can access certain routes in your application.
// So to cretae you must provide a valid JWT in the AUTHORIZATION HEADER. The JWT 

const jwtCheck = auth({
    // The middleware checks that the aud claim in the JWT includes this "http://localhost:8000". If it doesn't, the token is rejected.
    audience: "http://localhost:8000",
    //  The middleware checks that the iss claim in the JWT matches this DOMAIN_URL. If it doesn't, the token is rejected.
    issuerBaseURL: DOMAIN_URL,
    // Auth0 default algorithm is "RS256"  when Registering Users. So here we are ensuring that only we accept tokens that have been signed with the RS256 algorithm. If a token has been signed with a different algorithm, the auth function will reject it.
   // Auth0 also support other algorithms such as HS256, HS384, HS512, RS256, RS384 etc. you can choose which one you want to use.
    tokenSigningAlg: "RS256"
});


export default jwtCheck;