# Contact Management App

## Full-Stack ReactJS with Spring Boot

ContactFlow is a full-stack application built with Spring Boot and React. 
The project demonstrates key skills in developing modern web applications, including implementing CRUD operations, pagination, file manipulation, and client-server integration.
Below is a detailed description of the technologies and features implemented in the project.

### Features
- **Contact List Display**: Displays blocks of contact information, including a picture, state, and some other data.
- **Pagination**: Handles large numbers of contacts by dividing them into pages using ```react-router-dom```.
**Contact Details Editing**:
- Allows users to edit contact details, including uploading and changing the contact's picture dynamically.
- Deletion of pictures is also supported.
- **Toast Notifications**: Displays notifications for actions like saving, updating, and deleting contacts using ```react-toastify```.
- **Server Communication**: All operations (CRUD) are connected to the backend using ```react-axios```.

### Backend (Spring Boot)
- **Spring Boot**: Used to build a RESTful API service for managing contacts.
- **Spring Web**: Implemented RESTful endpoints for CRUD operations.
- **Spring JPA**: Simplified database interactions for CRUD operations.
- **PostgreSQL**: Integrated PostgreSQL as the database system, making sure data is stored and retrieved reliably.
- **Lombok**: Using Lombok annotations to reduce boilerplate code, improving code readability and maintainability.
- **File Handling**: Supports local file upload and deletion for managing profile pictures.
- **Pagination**: Efficiently handles large datasets by dividing them into smaller pages.
- **CORS Configuration:** Enabled communication between the React frontend and Spring Boot backend.

### Frontend (ReactJS)
- **React Components:** Built a responsive and dynamic user interface with reusable components.
- **React Hooks:** Used for managing state and lifecycle in functional components.
- **React Router DOM**: Implemented routing with React Router DOM to enable navigation between different pages and components within the application.
- **React Toastify**: Improved user experience with real-time notifications.

### Integration
- **API Integration**: Connected the React frontend with the Spring Boot backend via RESTful APIs for data exchange.
- **User Experience**: Delivered a user-friendly experience with efficient state management, responsive design, and intuitive navigation.

### Technologies Used
- **Backend**: Spring (Boot, Web, Data), Lomobk, PostgreSQL
- **Frontend**: React (Hooks, Router DOM, Toastify, Axios)

This project exemplifies my ability to build a full-stack application from scratch while following modern development practices.
It showcases my skills in both frontend and backend development.
