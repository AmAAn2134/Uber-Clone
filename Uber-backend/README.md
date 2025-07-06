# User Registration & Login Endpoints

## Register

### Endpoint
`POST /users/register`

### Description
Allows a new user to register by providing their details. Upon successful registration, a JSON Web Token (JWT) is generated and returned along with the user information.

### Required Data
The request body must be in JSON format and include:

- `fullname`: An object containing:
  - `firstname`: A string, at least 3 characters long (required).
  - `lastname`: A string, at least 3 characters long (optional).
- `email`: A string, valid email format, at least 5 characters long (required).
- `password`: A string, at least 6 characters long (required).

#### Example Request Body
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securepassword"
}
```

### Responses
- **201 Created**: User successfully registered. Returns the generated token and user information.
- **400 Bad Request**: Validation errors. Returns an array of error messages indicating what fields are invalid or missing.

---

## Login

### Endpoint
`POST /users/login`

### Description
Allows an existing user to log in using their email and password. If the credentials are valid, a JWT token and user information are returned.

### Required Data
The request body must be in JSON format and include:

- `email`: A string, valid email format (required).
- `password`: A string, at least 6 characters long (required).

#### Example Request Body
```json
{
  "email": "john.doe@example.com",
  "password": "securepassword"
}
```

### Responses
- **200 OK**: Login successful. Returns the generated token and user information.
- **400 Bad Request**: Validation errors. Returns an array of error messages indicating what fields are invalid or missing.
- **401 Unauthorized**: Inval// ...existing code...

## Get User Profile

### Endpoint
`GET /users/profile`

### Description
Retrieves the profile information of the currently authenticated user. Requires a valid JWT token.

### Authentication
Requires a valid JWT token in one of the following:
- Cookie named 'token'
- Authorization header: `Bearer <token>`

### Responses
- **200 OK**: Returns the user profile information
- **401 Unauthorized**: Invalid or missing token
- **404 Not Found**: User not found

---

## Logout

### Endpoint
`GET /users/logout`

### Description
Logs out the current user by clearing the authentication token cookie and blacklisting the current token.

### Authentication
Requires a valid JWT token in one of the following:
- Cookie named 'token'
- Authorization header: `Bearer <token>`

### Responses
- **200 OK**: Successfully logged out
- **401 Unauthorized**: Invalid or missing token
// ...existing code...

## Get User Profile

### Endpoint
`GET /users/profile`

### Description
Retrieves the profile information of the currently authenticated user. Requires a valid JWT token.

### Authentication
Requires a valid JWT token in one of the following:
- Cookie named 'token'
- Authorization header: `Bearer <token>`

### Responses
- **200 OK**: Returns the user profile information
- **401 Unauthorized**: Invalid or missing token
- **404 Not Found**: User not found

---

## Logout

### Endpoint
`GET /users/logout`

### Description
Logs out the current user by clearing the authentication token cookie and blacklisting the current token.

### Authentication
Requires a valid JWT token in one of the following:
- Cookie named 'token'
- Authorization header: `Bearer <token>`

### Responses# Captain Registration Endpoints

## Register Captain

### Endpoint
`POST /captain/register`

### Description
Allows a new captain to register by providing their personal details and vehicle information. Upon successful registration, the captain account is created in the system.

### Required Data
The request body must be in JSON format and include:

- `fullname`: An object containing:
  - `firstname`: A string, at least 3 characters long (required)
  - `lastname`: A string (required)
- `email`: A string, valid email format (required)
- `password`: A string, at least 6 characters long (required)
- `vehicle`: An object containing:
  - `color`: A string, at least 3 characters long (required)
  - `plate`: A string, at least 3 characters long (required)
  - `capacity`: A positive integer (required)
  - `vehicleType`: A string, must be one of: 'car', 'motorcycle', 'auto' (required)

#### Example Request Body
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.driver@example.com",
  "password": "securepass123",
  "vehicle": {
    "color": "Black",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### Responses
- **201 Created**: Captain successfully registered
- **400 Bad Request**: Validation errors. Returns an array of error messages for:
  - Invalid email format
  - First name less than 3 characters
  - Password less than 6 characters
  - Vehicle color less than 3 characters
  - Invalid plate number format
  - Invalid capacity (must be positive)
  - Invalid vehicle type (must be car/motorcycle/auto)
- **409 Conflict**: Email already registered
- **200 OK**: Successfully logged out
- **401 Unauthorized**: Invalid or missing token
id email or password.