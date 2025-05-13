# Indie Campers API Integration Documentation

## General Overview

This documentation provides a comprehensive guide to the integration of the Indie Campers API into our backend system. The integration allows us to fetch a list of locations from Indie Campers, a platform offering campervan rentals across Europe. The integration is implemented using NestJS, a progressive Node.js framework for building efficient and scalable server-side applications.

## Quick Start Guide

### Prerequisites

- Node.js (version 14.x or later)
- npm (version 6.x or later)
- Docker (optional, for containerized deployment)
- Environment variables:
  - `INDIE_CAMPERS_API_KEY`: Your API key for accessing the Indie Campers API.
  - `PORT`: The port number on which the server will run (default is 5000).

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

   Create a `.env` file in the root directory and add the following:

   ```plaintext
   INDIE_CAMPERS_API_KEY=your_api_key_here
   PORT=5000
   ```

4. **Start the Server:**

   ```bash
   npm run start
   ```

   The server will start on `http://localhost:5000`.

### Running the Backend Server Remotely

1. **Build the Docker Image:**

   ```bash
   docker build -t indie-campers-api .
   ```

2. **Run the Docker Container:**

   ```bash
   docker run -d -p 5000:5000 --env-file .env indie-campers-api
   ```

   The server will be accessible on the configured remote host and port.

### Running the Frontend Locally

- **Note:** The frontend implementation is not provided in the current codebase. Ensure you have a compatible frontend setup to interact with the backend API.

### Running the Frontend Remotely

- **Note:** Similar to the local setup, ensure your frontend is deployed and configured to communicate with the backend API.

### Testing Options

- **Integration Tests:**

  Integration tests are available in the `integration_tests.py` file. To run the tests, ensure you have Python and the necessary testing libraries installed.

  ```bash
  python integration_tests.py
  ```

## Troubleshooting Guide

- **Common Issues:**

  - **API Key Errors:** Ensure that the `INDIE_CAMPERS_API_KEY` is correctly set in the environment variables.
  - **Network Errors:** Check your network connection and ensure the Indie Campers API endpoint is accessible.
  - **CORS Issues:** If you encounter CORS issues, ensure that CORS is enabled in the `main.ts` file with `app.enableCors();`.

- **Logs:**

  - Check the console logs for detailed error messages. The backend logs requests and responses for debugging purposes.

## Support Contact Information

- **Technical Support:** For technical support, please contact [support@example.com](mailto:support@example.com).

## Links to API Provider Documentation

- [Indie Campers API Documentation](https://developers.goindie.online/docs)