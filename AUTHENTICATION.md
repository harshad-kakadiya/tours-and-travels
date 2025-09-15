# Authentication System Documentation

## Overview
This WanderWise Tours application now includes a complete authentication system with login and registration functionality.

## Features

### 🔐 Authentication Features
- **User Registration** with email validation and password confirmation
- **User Login** with email and password
- **Protected Routes** - Access control for authenticated users
- **Persistent Sessions** - Users stay logged in across browser sessions
- **Automatic Logout** - Token expiration handling
- **Responsive Design** - Works on desktop and mobile devices

### 📱 User Interface
- **Login Page** (`/login`) - Clean, modern login form
- **Register Page** (`/register`) - Registration form with password confirmation
- **User Dashboard** (`/dashboard`) - Protected user area (requires authentication)
- **Navbar Integration** - Login/Register buttons for guests, user info for authenticated users

## API Integration

### Endpoints
- `POST /login` - User login
- `POST /register` - User registration

### Login Payload
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Register Payload
```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password123"
}
```

### Environment Variables
Create a `.env` file in the root directory:
```
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_NAME=WanderWise Tours
```

## File Structure

```
src/
├── contexts/
│   └── AuthContext.jsx          # Authentication state management
├── pages/
│   ├── auth/
│   │   ├── LoginPage.jsx        # Login form
│   │   └── RegisterPage.jsx     # Registration form
│   └── UserDashboard.jsx        # Protected user dashboard
├── components/
│   ├── ProtectedRoute.jsx       # Route protection component
│   └── ui/
│       └── Header.jsx           # Updated with auth buttons
├── utils/
│   └── api.js                   # Axios configuration and API calls
└── Routes.jsx                   # Updated with auth routes
```

## Usage

### 1. Authentication Context
The `AuthContext` provides authentication state and methods throughout the app:

```jsx
import { useAuth } from '../contexts/AuthContext';

const { user, isAuthenticated, login, register, logout } = useAuth();
```

### 2. Protected Routes
Wrap components that require authentication:

```jsx
import ProtectedRoute from '../components/ProtectedRoute';

<ProtectedRoute>
  <YourProtectedComponent />
</ProtectedRoute>
```

### 3. Authentication State
Check if user is authenticated:

```jsx
const { isAuthenticated, user } = useAuth();

if (isAuthenticated) {
  // User is logged in
  console.log('User:', user.name, user.email);
}
```

## Security Features

- **Token Storage** - JWT tokens stored in localStorage
- **Automatic Token Refresh** - Handled by axios interceptors
- **Input Validation** - Client-side form validation
- **Error Handling** - Comprehensive error messages
- **Password Confirmation** - Registration requires password confirmation

## Styling

The authentication system uses the existing design system:
- Consistent with WanderWise branding
- Responsive design for all screen sizes
- Modern UI with gradients and shadows
- Accessible form controls

## Testing the System

1. **Start the development server**: `npm start`
2. **Visit the app**: Navigate to any page
3. **Try Registration**: Click "Register" in the navbar
4. **Try Login**: Click "Login" in the navbar
5. **Access Dashboard**: After login, click on your name to access the dashboard
6. **Test Logout**: Use the logout button to sign out

## API Server Requirements

Your backend server should handle:

1. **POST /api/login**
   - Accept email and password
   - Return JWT token and user data
   - Handle validation errors

2. **POST /api/register**
   - Accept name, email, and password
   - Return JWT token and user data
   - Handle validation errors

Example response format:
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "user@example.com"
  }
}
```

## Error Handling

The system handles various error scenarios:
- Network errors
- Invalid credentials
- Server errors
- Token expiration
- Validation errors

All errors are displayed to users with appropriate messages.