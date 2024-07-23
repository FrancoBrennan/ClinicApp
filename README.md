# ClinicApp

ClinicApp es una aplicación web diseñada para gestionar el registro y la autenticación de usuarios como pacientes o médicos, y proporcionar una plataforma de chat en vivo entre médicos y pacientes. La aplicación está compuesta por un backend desarrollado con Spring Boot y un frontend hecho con Angular. Además, incluye un servidor de chat en vivo implementado con Node.js y Express.js.

## Características Actuales

- Registro de usuarios como pacientes.
- Inicio de sesión y autenticación utilizando JSON Web Tokens (JWT).
- Los pacientes pueden ver sus datos personales.

### Funcionalidades en Desarrollo

- Gestión de permisos basada en roles (paciente y médico).
- Chat en vivo entre médicos y pacientes.
- Los médicos podrán ver y modificar sus datos personales y ver los datos de los pacientes.

## Tecnologías Utilizadas

### Backend

- **Spring Boot**: Framework para el desarrollo del backend.
- **Spring Security**: Manejo de autenticación y autorización.
- **JSON Web Tokens (JWT)**: Autenticación basada en tokens.
- **MySQL**: Base de datos relacional para almacenar la información de los usuarios.

### Frontend

- **Angular**: Framework para el desarrollo del frontend.
- **HTML/CSS**: Estructura y estilos de la aplicación web.

### Chat en Vivo

- **Node.js**: Entorno de ejecución para el servidor de chat.
- **Express.js**: Framework para el servidor de chat.
- **Socket.io**: Biblioteca para la implementación de websockets.

## Estructura del Proyecto

- **Backend/**: Contiene el código del backend desarrollado con Spring Boot.
- **Frontend/**: Contiene el código del frontend desarrollado con Angular.
- **Chat/**: Contiene el código del servidor de chat desarrollado con Node.js y Express.js.

## Configuración del Proyecto

### Requisitos Previos

- **Java**
- **Node.js**
- **MySQL**

### Configuración del Backend

1. Clonar el repositorio:

    ```sh
    git clone https://github.com/FrancoBrennan/ClinicApp.git
    ```

2. Navegar al directorio del backend:

    ```sh
    cd ClinicApp/Backend/demo.jwt
    ```

3. Configurar la base de datos MySQL en el archivo `application.properties`:

    ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/clinicapp
    spring.datasource.username=tu_usuario
    spring.datasource.password=tu_contraseña
    spring.jpa.hibernate.ddl-auto=update
    spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
    ```

4. Ejecutar la aplicación Spring Boot:

    ```sh
    ./mvnw spring-boot:run
    ```

### Configuración del Frontend

1. Navegar al directorio del frontend:

    ```sh
    cd ClinicApp/Frontend/frontend
    ```

2. Instalar las dependencias:

    ```sh
    npm install
    ```

3. Ejecutar la aplicación Angular:

    ```sh
    ng serve
    ```

### Configuración del Chat en Vivo

1. Navegar al directorio del servidor de chat:

    ```sh
    cd ClinicApp/Chat
    ```

2. Instalar las dependencias:

    ```sh
    npm install
    ```

3. Ejecutar el servidor de chat:

    ```sh
    node server.js
    ```

## Uso de la Aplicación

1. **Registro**: Los usuarios pueden registrarse como pacientes o médicos.
2. **Inicio de Sesión**: Los usuarios pueden iniciar sesión y recibir un token JWT.
3. **Datos Personales**: Las funcionalidades para que los médicos puedan ver y editar sus datos, y los pacientes solo puedan ver sus datos están en desarrollo.
4. **Chat en Vivo**: Los médicos y pacientes pueden comunicarse en tiempo real a través del chat en vivo.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o envía un pull request para mejoras o correcciones.
