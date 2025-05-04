# 📚 Library API - Spring Boot + JWT + Swagger

This project is a secured REST API built with Spring Boot. It uses **JWT (JSON Web Tokens)** for authentication and integrates **Swagger UI** for easy API documentation and testing.
🔐 Authentication
Login Endpoint (Public)

POST /authenticate


{
  "username": "yourUsername",
  "password": "yourPassword"
}
Response:
{
  "your.jwt.token"
}

🧪 How to Test the API
✅ Option 1: Use Postman (Recommended)
First, send a POST request to /authenticate with your credentials.

Copy the returned JWT.

For subsequent requests to secured endpoints, add this header:

Authorization: Bearer your.jwt.token

✅ Postman handles this perfectly.

 Option 2: Swagger UI (Limited Functionality in Browser)
Swagger is configured and should load at:

http://localhost:8080/swagger-ui/index.html
BUT, due to browser and MIME type issues, Swagger UI might not display properly. If that happens:

Swagger still works behind the scenes.

All API endpoints are accessible and testable via Postman.

🙋 Troubleshooting
❌ Swagger UI not loading?

Likely due to Spring Security blocking static resources or MIME issues in browser. We had a problem implementing swagger ui for the browser, but in postman it works all right, im sorry teacher, too much work from all teachers and oracle :(

Use Postman instead.
