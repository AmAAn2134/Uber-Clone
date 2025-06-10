# User Registration Endpoint

## Endpoint
`POST /users/register`

## Description
This endpoint allows a new user to register by providing their details. Upon successful registration, a JSON Web Token (JWT) is generated and returned along with the user information.

## Required Data
The request body must be in JSON format and include the following fields:

- `fullname`: An object containing:
  - `firstname`: A string that must be at least 3 characters long (required).
  - `lastname`: A string that must be at least 3 characters long (optional).
- `email`: A string that must be a valid email format and at least 5 characters long (required).
- `password`: A string that must be at least 6 characters long (required).

### Example Request Body
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securepassword"
}

## Responses
- **201 Created**: User successfully registered. Returns the generated token and user information.
- **400 Bad Request**: Validation errors. Returns an array of error messages indicating what fields are invalid or missing.