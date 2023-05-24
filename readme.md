# Chat App

This is a chat application built with React for the client-side and Spring Boot for the server-side that allows users to communicate in real-time.

## Dependencies

### Client-Side:

- Node.js (version 16.0.0)
- React (version 18.0)

### Server-Side:

- Java (version 11)
- Spring Boot (version 2.7.0)
- PostgreSQL (version 13.0 or above)

## Getting Started

1. Set up the client-side dependencies:

   - Navigate to the `client` subdirectory of the root directory using the command:

     ```sh
     cd client
     ```

   - Install the necessary dependencies using npm:

     ```sh
     npm install
     ```

2. Set up the server-side dependencies:

   - Navigate back to the root directory of the root directory:

     ```sh
     cd ..
     ```

   - Create a PostgreSQL database and set the database configuration in the `application.properties` file located in the `src/main/resources` directory of the `server` subdirectory, like this:

     ```
     spring.datasource.url=jdbc:postgresql://localhost:5432/db_chat
     spring.datasource.username=<your_database_username>
     spring.datasource.password=<your_database_password>
     app.jwt.secret=chatsecret
     server.port=8080
     ```

3. Run the server-side application:

   - Navigate to the `server` subdirectory of the root directory:

     ```sh
     cd server
     ```

   - Start the server using the following command:

     ```sh
     ./gradlew bootRun
     ```

4. Run the client-side application:

   - Navigate back to the `client` subdirectory of the root directory:

     ```sh
     cd ../client
     ```

   - Start the client using the following command:

     ```sh
     npm start
     ```

5. Access the chat application at the following URL: http://localhost:3000/

## Features

- Users can login with username and name.
- Users can send and receive messages in real-time.
- Users can see other users.
