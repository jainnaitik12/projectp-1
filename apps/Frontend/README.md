# TPC Portal Frontend

A comprehensive Training and Placement Cell Portal built with React + Vite, designed to streamline the placement process for students, companies, and administrators.

## 🚀 Quick Start

### Prerequisites

- Node.js (v16.0.0 or higher)

- npm (v7.0.0 or higher)

### Installation

1. Clone the repository
```bash
git clone https://github.com/DeependraVarshney/projectp.git
cd apps/Frontend
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

## 📁 Project Structure

```
apps/Frontend/
├── public/                 # Static files
├── src/
│   ├── assets/            # Images, fonts, and other static resources
│   ├── components/        # Reusable components
│   │   ├── admin/        # Admin-specific components
│   │   │   ├── analytics/    # Analytics and reporting
│   │   │   ├── automation/   # Automated processes
│   │   │   ├── backup/       # Data backup management
│   │   │   ├── calendar/     # Event scheduling
│   │   │   ├── companies/    # Company management
│   │   │   ├── dashboard/    # Admin dashboard
│   │   │   ├── documents/    # Document management
│   │   │   ├── email/       # Email templates and settings
│   │   │   ├── jnf/         # Job Notification Form
│   │   │   ├── reports/     # Report generation
│   │   │   ├── settings/    # System settings
│   │   │   └── students/    # Student management
│   │   ├── company/      # Company-specific components
│   │   │   ├── dashboard/    # Company dashboard
│   │   │   ├── jobs/        # Job posting management
│   │   │   ├── profile/     # Company profile
│   │   │   └── students/    # Student applications
│   │   ├── student/      # Student-specific components
│   │   │   ├── dashboard/    # Student dashboard
│   │   │   ├── applications/ # Job applications
│   │   │   ├── profile/     # Student profile
│   │   │   └── resources/   # Learning resources
│   │   └── shared/       # Shared components
│   ├── contexts/         # React context providers
│   ├── hooks/           # Custom React hooks
│   ├── routes/          # Route configurations
│   ├── services/        # API and other services
│   ├── store/           # Redux store configuration
│   ├── styles/          # Global styles and theme
│   └── utils/           # Utility functions
```

## 🛠 Development Guidelines

### Component Creation

1. **Module Selection**:

   - `/admin` - Administrative features
   
   - `/company` - Company-related features
   
   - `/student` - Student-related features
   
   - `/shared` - Cross-module components
   
2. **Component Structure**:
```jsx
// ComponentName.jsx
import React from 'react';
import PropTypes from 'prop-types';

const ComponentName = ({ prop1, prop2 }) => {
  return (
    // JSX
  );
};

ComponentName.propTypes = {
  prop1: PropTypes.string.required,
  prop2: PropTypes.number
};

export default ComponentName;
```

3. **Styling**:

   - Use Tailwind CSS for styling
   
   - Create styled components for complex styling
   
   - Follow the existing theme configuration
   
### State Management

1. **Redux**:

   - Global application state
   
   - User authentication
   
   - Shared data across components
   
2. **Context**:

   - Theme management
   
   - User preferences
   
   - Feature flags
   
3. **Local State**:

   - Component-specific state
   
   - Form handling
   
   - UI interactions
   
## 🔍 Available Scripts

```bash
# Development
npm run dev         # Start development server

# Building
npm run build      # Build for production
npm run preview    # Preview production build

# # Testing
# npm run test       # Run tests
# npm run test:watch # Run tests in watch mode

# Linting
npm run lint       # Run ESLint
npm run lint:fix   # Fix ESLint errors
```

## 🧪 Testing

- Write tests for all new components

- Place test files next to components

- Follow existing test patterns

- Maintain good test coverage

```jsx
// ComponentName.test.jsx
import { render, screen } from '@testing-library/react';
import ComponentName from './ComponentName';

describe('ComponentName', () => {
  it('renders correctly', () => {
    render(<ComponentName />);
    // Add assertions
  });
});
```

## 📚 API Integration

- Use axios for API calls

- Create service files for API endpoints

- Handle errors consistently

- Implement proper loading states

```javascript
// services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const fetchData = async () => {
  try {
    const response = await api.get('/endpoint');
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
```

## 🔐 Environment Variables

Create a `.env` file in the root directory:
VITE_API_URL=http://localhost:3000
VITE_ENV=development

## 🤝 Contributing

1. Create a new branch
```bash
git checkout -b feature/your-feature-name
```

2. Make your changes following the guidelines

3. Commit your changes
```bash
git commit -m "feat: add new feature"
```

4. Push to your branch
```bash
git push origin feature/your-feature-name
```

5. Create a Pull Request

### Commit Message Format
- feat: New feature
- fix: Bug fix
- docs: Documentation changes
- style: Code style changes
- refactor: Code refactoring
- test: Test updates
- chore: Build tasks, configs, etc.

## 📦 Dependencies

- React 18
- Redux Toolkit
- React Router 6
- Axios
- Tailwind CSS
- React Query
- React Hook Form
- Yup
- React Icons
- Chart.js

## 🎨 Design System

- Follow Material Design principles
- Use consistent spacing (0.25rem increments)
- Follow color palette from theme
- Maintain responsive design patterns

## 🚀 Deployment

1. Build the application
```bash
npm run build
```

2. Test the production build
```bash
npm run preview
```

3. Deploy to hosting platform of choice

<!-- ## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details. -->

<!-- ## 🤝 Support

For support, email support@tpcportal.com or join our Slack channel. -->

## 🙏 Acknowledgments

- React team
- Vite team
- All contributors

---

Remember to update this README as the project evolves. For detailed documentation, visit our [Wiki](link-to-wiki).