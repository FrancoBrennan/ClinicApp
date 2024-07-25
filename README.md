# ClinicApp

ClinicApp is a web application designed to manage user registration and authentication as patients or doctors and provide a live chat platform between doctors and patients. The application consists of a backend developed with Spring Boot and a frontend made with Angular. Additionally, it includes a live chat server implemented with Node.js and Express.js.

## Current Features

- User registration as patients.
- Login and authentication using JSON Web Tokens (JWT).
- Patients can view their personal data.

### Features in Development

- Role-based permission management (patient and doctor).
- Live chat between doctors and patients.
- Doctors will be able to view and modify their personal data and see patient data.

## Technologies Used

### Backend

- **Spring Boot**: Framework for backend development.
- **Spring Security**: Authentication and authorization management.
- **JSON Web Tokens (JWT)**: Token-based authentication.
- **MySQL**: Relational database for storing user information.

### Frontend

- **Angular**: Framework for frontend development.
- **HTML/CSS**: Structure and styles of the web application.

### Live Chat

- **Node.js**: Runtime environment for the chat server.
- **Express.js**: Framework for the chat server.
- **Socket.io**: Library for implementing WebSockets.

## Project Structure

- **Backend/**: Contains the backend code developed with Spring Boot.
- **Frontend/**: Contains the frontend code developed with Angular.
- **Chat/**: Contains the chat server code developed with Node.js and Express.js.

## Project Setup

### Prerequisites

- **Java**
- **Node.js**
- **MySQL**

### Backend Setup

1. Clone the repository:

    ```sh
    git clone https://github.com/FrancoBrennan/ClinicApp.git
    ```

2. Navigate to the backend directory:

    ```sh
    cd ClinicApp/Backend/demo.jwt
    ```

3. Configure the MySQL database in the `application.properties` file:

    ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/clinicapp
    spring.datasource.username=your_username
    spring.datasource.password=your_password
    spring.jpa.hibernate.ddl-auto=update
    spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
    ```

4. Run the Spring Boot application:

    ```sh
    ./mvnw spring-boot:run
    ```

### Frontend Setup

1. Navigate to the frontend directory:

    ```sh
    cd ClinicApp/Frontend/frontend
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Run the Angular application:

    ```sh
    ng serve
    ```

### Live Chat Setup

1. Navigate to the chat server directory:

    ```sh
    cd ClinicApp/Chat
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Run the chat server:

    ```sh
    node server.js
    ```

## Application Usage

1. **Registration**: Users can register as patients or doctors.
2. **Login**: Users can log in and receive a JWT token.
3. **Personal Data**: Features for doctors to view and edit their data, and for patients to view only their data, are under development.
4. **Live Chat**: Doctors and patients can communicate in real-time via live chat.

## Contributions

Contributions are welcome. Please open an issue or submit a pull request for improvements or fixes.
