import { lazy } from 'react';

// Admin Pages
const Dashboard = lazy(() => import('../pages/admin/Dashboard'));
const Students = lazy(() => import('../pages/admin/Students'));
const Companies = lazy(() => import('../pages/admin/Companies'));
const JNF = lazy(() => import('../pages/admin/JNF'));
const Placements = lazy(() => import('../pages/admin/Placements'));
const Templates = lazy(() => import('../pages/admin/Templates'));
const Reports = lazy(() => import('../pages/admin/Reports'));
const Profile = lazy(() => import('../pages/admin/Profile'));
const Settings = lazy(() => import('../pages/admin/Settings'));
const Audit = lazy(() => import('../pages/admin/Audit'));
const Automation = lazy(() => import('../pages/admin/Automation'));
// Auth Pages
const Login = lazy(() => import('../pages/auth/Login'));
const ForgotPassword = lazy(() => import('../pages/auth/ForgotPassword'));
const ResetPassword = lazy(() => import('../pages/auth/ResetPassword'));
const Notifications = lazy(() => import('../pages/admin/Notifications'));
// Error Pages
const Error404 = lazy(() => import('../pages/Error404'));

const routes = [
  {
    path: '/admin',
    children: [
      {
        path: 'dashboard',
        element: Dashboard,
      },
      {
        path: 'students',
        element: Students,
      },
      {
        path: 'companies',
        element: Companies,
      },
      {
        path: 'jnf',        // Added JNF route
        element: JNF,
      },
      {
        path: 'placements',
        element: Placements,
      },
      {
        path: 'notifications',
        element: Notifications,
      },
      {
        path: 'templates',
        element: Templates,
      },
      {
        path: 'automation',
        element: Automation,
      },
      {
        path: 'audit',
        element: Audit,
      },
      {
        path: 'reports',
        element: Reports,
      },
      {
        path: 'profile',
        element: Profile,
      },
      {
        path: 'settings',
        element: Settings,
      },
    ],
  },
  {
    path: '/auth',
    children: [
      {
        path: 'login',
        element: Login,
      },
      {
        path: 'forgot-password',
        element: ForgotPassword,
      },
      {
        path: 'reset-password',
        element: ResetPassword,
      },
    ],
  },
  {
    path: '*',
    element: Error404,
  },
];

export default routes;