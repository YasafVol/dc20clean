import { httpRouter } from 'convex/server';
import { auth } from './auth';

const http = httpRouter();

// Required for Convex Auth OAuth routes and JWKS endpoints.
auth.addHttpRoutes(http);

export default http;
