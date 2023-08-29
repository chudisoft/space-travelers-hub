import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ErrorPage from './routes/error-page';
import store from './app/store';
import { Rockets, Missions, Profile } from './components';
import './index.css';
import { getRockets } from './features/rockets/rocketSlice';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Rockets />,
      },
      {
        path: '/missions',
        element: <Missions />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
    ],
  },
]);

store.dispatch(getRockets());

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
