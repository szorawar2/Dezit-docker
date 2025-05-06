## Overview

The Dezit application is a client-server-based system. The client is a front-end application that interacts with users, while the server handles business logic, data processing, and communication with the database. The two components communicate via REST APIs.

**Site URL:** [Visit Dezit Application](https://dezit.site)

The app allows you to:

- Add users.
- Add messages and files.
- View messages and files later.

## Requirements

- **Docker**: Required to run the application using Docker.
- **Node.js & PostgreSQL**: Required for development purposes.

## Running the Application with Docker

Follow these steps to run the Dezit application using Docker:

1. **Clone the Repository**  
   Clone the project repository to your local machine:

   ```bash
   git clone https://github.com/szorawar2/Dezit-docker.git
   cd Dezit-docker
   ```

2. **Prepare Environment Variables**  
   Rename the `.env.example` file to `.env`:

   ```bash
   mv .env.example .env
   ```

   Update the `.env` file with the required configuration values. Below is an example of the `.env` file:

   ```properties
   DB_DATABASE="mydb" # CHANGE DATABASE NAME IF REQUIRED
   DB_PASSWORD="" # ADD PASSWORD HERE
   ```

   Replace `DB_PASSWORD` with your database password and update other values as necessary.

3. **Build Docker Images**  
   Build the Docker images for both the client and server:

   ```bash
   docker-compose build
   ```

4. **Start the Application**  
   Start the application using Docker Compose:

   ```bash
   docker-compose up
   ```

5. **Access the Application**

   - The client login page will be accessible at `http://localhost:5005/<route>`.
   - To access the login page at default port, enter `localhost:5005` on your browser.

6. **Stop the Application**  
   To stop the application, press `Ctrl+C` in the terminal where `docker-compose up` is running, or use:

   ```bash
   docker-compose down
   ```

7. **Optional: Clean Up Docker Resources**  
   To remove unused Docker images, containers, and volumes:
   ```bash
   docker system prune -a
   ```
