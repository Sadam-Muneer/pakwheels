import { auth } from "express-oauth2-jwt-bearer";

const jwtCheck = auth({
  audience: "http://localhost:6000",
  issuerBaseURL: "https://dev-pcwp2gensj50g46z.us.auth0.com/",
  tokenSigningAlg: "RS256",
});

export default jwtCheck;
