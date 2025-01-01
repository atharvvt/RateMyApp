# React + Vite

# App Management System

This project is a web-based application designed to manage and display various apps. Users can create, view, and delete apps from the system. The app includes features such as categorization, sub-categorization, and points tracking.

## Features

- View a list of apps with categories and points
- Add new apps with title, link, category, sub-category, and points
- Delete apps
- User authentication with access token for secure operations

## Libraries Used

### Frontend Libraries (React)

- **React**: A JavaScript library for building user interfaces.
- **React Router**: A library for handling routing in the React application.
- **Axios**: A promise-based HTTP client for making API requests.
- **Lucide React**: A set of SVG-based icons for use in React components.
- **Vite**: A build tool and development server for fast React development.
- **React Hook Form**: A library to handle form validation and submission.

### Backend Libraries (Django)

- **Django**: A high-level Python web framework for rapid development of secure and maintainable websites.
- **Django REST Framework (DRF)**: A powerful toolkit for building Web APIs in Django.
- **Django CORS Headers**: A Django app for handling Cross-Origin Resource Sharing (CORS), allowing the frontend to access the API.
- **Django JWT (djangorestframework-simplejwt)**: A library for using JWT (JSON Web Token) authentication with Django REST Framework.
- **Django Dotenv**: A package for loading environment variables from a `.env` file.
- **Django Rest Auth**: Provides authentication endpoints for Django REST Framework.

## Installation

### Frontend (React)

1. Clone the repository:
    ```bash
    git clone https://github.com/your-repository.git
    ```

2. Navigate to the frontend directory:
    ```bash
    cd frontend
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Run the frontend:
    ```bash
    npm start
    ```

### Backend (Django)

1. Navigate to the backend directory:
    ```bash
    cd backend
    ```

2. Set up a virtual environment:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    ```

3. Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```

4. Apply database migrations:
    ```bash
    python manage.py migrate
    ```

5. Create a superuser (optional, for accessing the admin panel):
    ```bash
    python manage.py createsuperuser
    ```

6. Run the backend server:
    ```bash
    python manage.py runserver
    ```

## Environment Variables

### Frontend

- `VITE_API_URL`: The URL of the backend API (e.g., `http://localhost:8000`).

### Backend

- `PORT`: The port on which the backend server runs (default: `8000`).
- `DATABASE_URL`: The URL for the database connection (e.g., PostgreSQL or SQLite).
- `JWT_SECRET`: Secret key for JWT authentication.
- `CORS_ALLOWED_ORIGINS`: Allowed frontend origins for CORS.

## Contributing

If you'd like to contribute, please fork the repository and submit a pull request. We welcome any improvements and fixes!


# Atharv VT