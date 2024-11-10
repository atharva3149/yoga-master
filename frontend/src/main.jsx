// eslint-disable-next-line no-unused-vars
import React from 'react';
import ReactDOM  from 'react-dom/client'
import './index.css';
import { RouterProvider } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';
import Aos from 'aos';
import {
  QueryClient,
  QueryClientProvider, 
  // eslint-disable-next-line no-unused-vars
  useQuery,
} from '@tanstack/react-query'
import { router } from './routes/router';


const queryClient = new QueryClient()


Aos.init();
ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);