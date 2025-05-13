# Indie Campers API Integration Documentation

## General Overview

This documentation provides a comprehensive guide to the integration of the Indie Campers API into our application. The integration allows users to fetch a list of available locations and check the availability of campers between specified locations and dates. The backend is implemented using NestJS, and it communicates with the Indie Campers API to retrieve the necessary data.

## Quick Start Guide

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- Docker (optional, for running the server remotely)
- Environment variable: `INDIE_CAMPERS_API_KEY` (API key for Indie Campers)

### Running the Backend Server Locally

1. **Clone the Repository:**

   ```bash
   git clone <repository-url>
   cd <repository-directory>/be
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Set Environment Variables:**

   Create a `.env` file in the `be` directory with the following content:

   ```plaintext
   INDIE_CAMPERS_API_KEY=your_api_key_here
   ```

4. **Start the Server:**

   ```bash
   npm run start:dev
   ```

   The server will start on `http://localhost:3000`.

### Running the Backend Server Remotely

1. **Build Docker Image:**

   ```bash
   docker build -t indie-campers-backend .
   ```

2. **Run Docker Container:**

   ```bash
   docker run -d -p 3000:3000 -e INDIE_CAMPERS_API_KEY=your_api_key_here indie-campers-backend
   ```

   The server will be accessible on the configured remote server's IP at port 3000.

### Running the Frontend Locally

1. **Navigate to the Frontend Directory:**

   ```bash
   cd <repository-directory>/fe
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Start the Frontend:**

   ```bash
   npm run start
   ```

   The frontend will start on `http://localhost:4200`.

### Running the Frontend Remotely

1. **Build Docker Image:**

   ```bash
   docker build -t indie-campers-frontend .
   ```

2. **Run Docker Container:**

   ```bash
   docker run -d -p 4200:4200 indie-campers-frontend
   ```

   The frontend will be accessible on the configured remote server's IP at port 4200.

### Testing Options

- **Integration Tests:**

  Integration tests are available in the `integration_tests.py` file. To run the tests, ensure you have Python and the necessary dependencies installed.

  ```bash
  python integration_tests.py
  ```

## Troubleshooting Guide

- **Common Issues:**

  - **API Key Missing:** Ensure that the `INDIE_CAMPERS_API_KEY` environment variable is set correctly.
  - **Network Errors:** Check your network connection and ensure the Indie Campers API is accessible.
  - **Docker Issues:** Ensure Docker is installed and running correctly.

- **Logs:**

  Check the console logs for detailed error messages. The backend logs requests and responses, which can help in diagnosing issues.

## Support Contact Information

For support, please contact the development team at:

- Email: support@example.com
- Phone: +1-234-567-890

## Links to API Provider Documentation

- [Indie Campers API Documentation](https://developers.goindie.online/docs)