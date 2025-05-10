Communication Flow:

1. **Login Request** <br> The SPA sends user credentials (username/password) to the Auth Service
2. **Auth Service Validation** <br> The Auth Service validates credentials (e.g., via UsersService), then generates a JWT containing user info/claims.
3. **Token Delivery** <br> The JWT is returned to the SPA, which stores it (e.g., in memory or secure cookie).
4. **API Requests with JWT** <br> The SPA attaches the JWT as a Bearer token in the Authorization header for requests to other microservices (Projects, Task Logger, Expense Tracker).
5. **Microservices Validate JWT** <br> Each microservice verifies the JWT on incoming requests using the shared secret/public key, extracting user info for authorization.
6. **Optional: Auth Service Token Introspection** <br> For advanced scenarios, microservices can call Auth Service to validate or refresh tokens, but usually JWT verification is local.
