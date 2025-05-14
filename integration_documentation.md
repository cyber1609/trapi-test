# Duffel API Integration Documentation

## General Overview

This documentation provides a comprehensive guide to integrating with the Duffel API using a NestJS backend. The integration allows you to list flight offers by making requests to the Duffel API. The backend is built using NestJS and communicates with the Duffel API to fetch flight offers based on the request parameters.

## Quick Start Guide

### Prerequisites

- Node.js (version 14.x or later)
- npm (version 6.x or later)
- A Duffel API key
- Docker (optional, for running the server remotely)

### Running the Backend Server Locally

1. **Clone the Repository:**

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Set Environment Variables:**

   Create a `.env` file in the root directory and add your Duffel API key:

   ```plaintext
   DUFFEL_API_KEY=your_duffel_api_key
   PORT=5000
   ```

4. **Start the Server:**

   ```bash
   npm run start
   ```

   The server will start on `http://localhost:5000`.

### Running the Backend Server Remotely

1. **Build Docker Image:**

   ```bash
   docker build -t duffel-api-integration .
   ```

2. **Run Docker Container:**

   ```bash
   docker run -d -p 5000:5000 -e DUFFEL_API_KEY=your_duffel_api_key duffel-api-integration
   ```

   The server will be accessible on your server's IP address at port 5000.

### Running the Frontend Locally

1. **Navigate to the Frontend Directory:**

   ```bash
   cd <frontend-directory>
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Start the Frontend:**

   ```bash
   npm run start
   ```

   The frontend will start on `http://localhost:3000`.

### Running the Frontend Remotely

- Deploy the frontend code to your preferred hosting service (e.g., Vercel, Netlify, AWS S3).

### Testing Options

- **Integration Tests:**

  Integration tests are available in the `integration_tests.py` file. To run the tests, ensure you have Python and the necessary dependencies installed.

  ```bash
  python integration_tests.py
  ```

## Troubleshooting Guide

- **Common Issues:**

  - **API Key Errors:** Ensure that the Duffel API key is correctly set in the `.env` file.
  - **Network Errors:** Check your network connection and ensure that the Duffel API endpoint is reachable.
  - **CORS Issues:** Ensure CORS is enabled in the backend by calling `app.enableCors()` in `main.ts`.

- **Logs:**

  Check the console logs for detailed error messages. The backend logs request and response bodies, as well as any errors encountered.

## Support Contact Information

For support, please contact:

- **Email:** support@example.com
- **Phone:** +1-800-555-0199

## Links to API Provider Documentation

- [Duffel API Documentation](https://duffel.com/docs/api)

This documentation should help you get started with the Duffel API integration and troubleshoot any issues you may encounter. For further assistance, please reach out to the support contact provided.