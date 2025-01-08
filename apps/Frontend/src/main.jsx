
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Home from "./pages/HomePage"
import Login from "./components/auth/Login"
import Signup from "./components/auth/Signup"
import JNFForm from "./components/JNF/JNFForm"
import StudentDashboard from "./components/student/StudentDashboard"
import ProfileSection from "./components/student/sections/Profile/ProfileSection"
import ProfileEdit from "./components/student/sections/Profile/ProfileEdit/ProfileEdit"
import ApplicationsSection from "./components/student/sections/Applications/ApplicationSection"
import ResumeBuilder from "./components/student/sections/resume/ResumeBuilder"
import JobSection from "./components/student/sections/jobs/JobSection"
import NotificationsSection from "./components/student/sections/NotificationSection"
import ErrorBoundary from './components/ErrorBoundary.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "jnf-form", element: <JNFForm /> },
      {
        path: "student/:id",
        element: <StudentDashboard />,
        children: [
          { index: true, element: <ProfileSection /> },
          { path: "profile", element: <ProfileSection /> },
          { path: "profile/edit", element: <ProfileEdit /> },
          { path: "applications", element: <ApplicationsSection /> },
          { path: "resume", element: <ResumeBuilder /> },
          { path: "jobs", element: <JobSection /> },
          { path: "notifications", element: <NotificationsSection /> }
        ]
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)