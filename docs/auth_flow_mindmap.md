# Auth Flow in MSE

## Token management

Microservices typically use stateless authentication, most commonly with JWTs (JSON Web Tokens). After logging in, the user gets a token, which is sent with every request and validated by each service independently.

- User Login
  <!-- The client sends credentials (e.g., username/password) to an authentication service. -->
- Token Issuance
  <!-- The authentication service validates credentials and issues a signed JWT containing user identity and claims (roles, permissions, expiry). -->
- Token Storing
  <!-- The client stores the JWT (e.g., in local storage or memory) and includes it in the Authorization header (Bearer <token>) of subsequent API requests. -->
- Token Validation
  <!-- Each microservice or API Gateway validates the JWT signature and expiry independently, without needing to query a centralized session store. -->
- Authorization
  <!-- Services use the claims inside the JWT to enforce access control. -->
- Token Expiry & Refresh

## Common Authentication Methods

<!-- Method	Best Use Case	Key Strengths	Limitations -->

### JWT (JSON Web Token)

Usecase: Stateless microservices
Pros: Self-contained, stateless, scalable
Cons: No revocation, larger token size

### OAuth 2.0

Usecase: Third-party integrations, SSO
Pros: Fine-grained, delegated access
Cons: Complex setup, more interactions

### API Key

Usecase: Internal/public APIs, low security
Pros: Simple, easy to use
Cons: Low security, no user context

### Basic Authentication

Usecase: Legacy/low-security systems
Pros: Simple, easy to implement
Cons: Insecure, not recommended for production

### mTLS (Mutual TLS)

Usecase: High-security internal comms
Pros: Strong mutual authentication
Cons: Complex certificate management

### OpenID Connect

Usecase: Identity management, SSO
Pros: Adds identity layer to OAuth 2.0
Cons: Steep learning curve

## Strategies

Microservices architectures present unique authentication challenges due to their distributed, loosely coupled nature. Several strategies and protocols are commonly used-each with distinct strengths and trade-offs.

### Authentication in Each Microservice

Each service implements its own authentication logic.
Pros: Strong independence, fast to implement for small systems.
Cons: Code duplication, inconsistent security, hard to maintain, distracts from business logic.

### Shared Auth Library

Shared authentication libraries are practical only when your microservices use the same technology stack (like TypeScript). For heterogeneous environments, centralized authentication services or API gateways with standard token validation are better suited
Pros: Less duplication
Cons: Still distributed, update challenges

### Dedicated Auth/Authorization Svc

A dedicated service handles authentication; other services delegate auth checks to it.
Pros: Centralized control, consistent policy, easier updates.
Cons: Single point of failure, increased inter-service latency, potential bottleneck.

- With Api gateway

  - API Gateway as entry point
  - Gateway validates tokens
  - Microservices trust requests from the gateway
  - optional lightweight token validation for zero-trust models
  <!-- Flow: API Gateway handles initial authentication, forwards validated requests to microservices. Microservices validate tokens again (optional but recommended for zero-trust).
  Best For: Systems needing centralized security and simplified client interactions.
  Usecase: General-purpose, client-facing,
  Pros:	Centralized security, simplified clients,
  Cons: Gateway bottleneck -->

- Direct Authentication

  - Clients send JWT tokens directly to microservices
  - Each microservice independently validates tokens
  - No centralized gateway for authentication
  <!-- Flow: Microservices validate tokens independently without an API Gateway. CAS issues tokens, and services use public keys for validation.
  Best For: Small-scale systems or internal service communication.
  Usecase: Internal/low-scale systems
  Pros: No gateway dependency
  Cons: Duplicated logic, harder to scale-->

- Hybrid: API Gateway + Authorization Service
   <!-- Flow: API Gateway handles initial authentication. Microservices call a dedicated Authorization Service for complex permissions.
   Best For: Systems with dynamic or hierarchical authorization needs.
   Usecase: Complex permissions
   Pros: Fine-grained control
   Cons: Latency from auth checks-->

- Event-Driven Data Replication
   <!-- Flow: CAS publishes user/permission data to a message broker (e.g., Kafka). Microservices cache this data locally for authorization decisions.
   Best For: High-performance systems needing local authorization.
   Usecase: High-performance systems
   Pros: Local decisions, decoupled
   Cons: Sync complexity, eventual consistency-->

### API Gateway Authentication

All external requests go through an API gateway, which handles authentication and forwards only valid requests.
Pros: Centralized enforcement, simplifies service logic, enables SSO, supports rate limiting and logging.
Cons: Gateway becomes a critical component; may still require per-service checks for internal calls.

An API Gateway can centralize authentication (and sometimes authorization), routing requests to services after validating tokens. This reduces duplication and complexity in each service.

- Request Routing
  <!-- Routes incoming requests to appropriate microservices based on path, headers, or parameters. -->
  <!-- Ensures correct service handles each request, supports load balancing and failover. -->
- Authentication & Authorization
  <!-- Validates user identity and access rights before forwarding requests. -->
  <!-- Centralizes security, reduces burden on individual services. -->
- Rate Limiting & Throttling
  <!-- Controls the number of requests per client or user to prevent abuse. -->
  <!-- Protects backend services from overload and denial-of-service attacks. -->
- Protocol Translation
  <!-- Converts between protocols (e.g., HTTP to gRPC) if needed. -->
  <!-- Enables heterogeneous communication between clients and services. -->
- Request Aggregation/Composition
  <!-- Combines multiple service calls into a single response to reduce client requests. -->
  <!-- Improves performance by minimizing round-trips. -->
- Caching
  <!-- Caches responses to reduce load on backend services and improve latency. -->
  <!-- Enhances performance and scalability. -->
- Load Balancing
  <!-- Distributes requests across multiple instances of a service. -->
  <!-- Improves availability and fault tolerance. -->
- Monitoring & Logging
  <!-- Tracks API usage, response times, errors, and health metrics. -->
  <!-- Enables proactive issue detection and performance optimization. -->
- Security (SSL/TLS Termination)
  <!-- Manages SSL certificates and encrypts traffic between clients and gateway. -->
  <!-- Ensures secure communication and offloads encryption from backend services. -->
- API Versioning & Management
  <!-- Supports multiple API versions and lifecycle management. -->
  <!-- Facilitates backward compatibility and smooth upgrades. -->

### Data Replication

Pros: Local decisions, decoupled
Cons: Data sync complexity, eventual consistency

## Models

Simple permissions can be encoded in the JWT, but complex, context-dependent authorization (like hierarchical approvals) often requires services to fetch or cache additional data, or to call out to a dedicated Authorization Service.

- Role-based access control (RBAC)

- Relationship-based access control (ReBAC)

- Attribute-based access control (ABAC)

- Combining RBAC, ReBAC and ABAC
