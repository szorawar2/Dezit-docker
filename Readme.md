## Overview

The Dezit application is a client-server-based system. The client is a front-end application that interacts with users, while the server handles business logic, data processing, and communication with the database. The two components communicate via REST APIs.

The app allows you to:

- Add users.
- Add messages and files.
- View messages and files later.

## Running the Application with Docker

Follow these steps to run the Dezit application using Docker:

1. **Clone the Repository**  
   Clone the project repository to your local machine:

   ```bash
   git clone <repository-url>
   cd Dezit-docker
   ```

2. **Build Docker Images**  
   Build the Docker images for both the client and server:

   ```bash
   docker-compose build
   ```

3. **Start the Application**  
   Start the application using Docker Compose:

   ```bash
   docker-compose up
   ```

4. **Access the Application**

   - The client will be accessible at `http://localhost:<client-port>`.
   - The server will be running at `http://localhost:<server-port>`.

5. **Stop the Application**  
   To stop the application, press `Ctrl+C` in the terminal where `docker-compose up` is running, or use:

   ```bash
   docker-compose down
   ```

6. **Optional: Clean Up Docker Resources**  
   To remove unused Docker images, containers, and volumes:
   ```bash
   docker system prune -a
   ```

## Notes

- Ensure Docker and Docker Compose are installed on your system.
- Replace `<repository-url>`, `<client-port>`, and `<server-port>` with the actual values for your setup.
- Update environment variables in the `.env` file if required before building the images.
