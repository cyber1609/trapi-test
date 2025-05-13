# Indie Campers Booking Integration Documentation

## General Overview

This documentation provides a comprehensive guide to the integration of the Indie Campers Booking API within our application. The integration allows users to create bookings through the Indie Campers platform by leveraging a backend service built with NestJS. The service communicates with the Indie Campers API to facilitate booking operations.

## Quick Start Guide

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- NestJS CLI
- Docker (for remote deployment)
- Environment variables:
  - `INDIE_CAMPERS_API_KEY`: Your Indie Campers API key
  - `PORT`: Port number for the server (default is 5000)

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
   npm run start:dev
   ```

   The server will start on `http://localhost:5000`.

### Running the Backend Server Remotely

1. **Build Docker Image:**

   ```bash
   docker build -t indie-campers-booking .
   ```

2. **Run Docker Container:**

   ```bash
   docker run -d -p 5000:5000 -e INDIE_CAMPERS_API_KEY=your_api_key_here indie-campers-booking
   ```

   The server will be accessible on your server's IP at port 5000.

### Running the Frontend Locally

- Ensure that the frontend application is configured to communicate with the backend server at `http://localhost:5000`.

### Running the Frontend Remotely

- Deploy the frontend application to your preferred hosting service and configure it to communicate with the backend server's remote URL.

### Testing Options

- Integration tests are available in the `integration_tests.py` file. Ensure you have Python and the necessary testing libraries installed.

  ```bash
  python integration_tests.py
  ```

## Troubleshooting Guide

- **Common Issues:**
  - **API Key Errors:** Ensure that the `INDIE_CAMPERS_API_KEY` is correctly set in your environment variables.
  - **Network Errors:** Check your network connection and ensure that the Indie Campers API endpoint is accessible.
  - **CORS Issues:** Ensure that CORS is enabled in the backend by calling `app.enableCors()` in `main.ts`.

- **Logs:**
  - Check the console logs for detailed error messages during API requests.

## Support Contact Information

For further assistance, please contact our support team at:

- Email: support@example.com
- Phone: +1-800-555-0199

## Links to API Provider Documentation

- [Indie Campers API Documentation](https://developers.goindie.online/docs)

This documentation should provide you with the necessary information to successfully integrate and operate the Indie Campers Booking API within your application. For any additional questions or issues, please refer to the support contact information provided above.