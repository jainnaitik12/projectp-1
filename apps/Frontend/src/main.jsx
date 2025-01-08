import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { hydrate, render } from 'react-dom'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  // now you can add more path to component and pages here
])

const APP = (
  <StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </StrictMode>
)

const rootElement = document.getElementById('root');
if (rootElement.hasChildNodes()) {
  hydrate(APP, rootElement);
} else {
  render(APP, rootElement);
}
