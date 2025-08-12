import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { ToastContainer } from "react-toastify";
import Router from './routes/Routes'
import {Provider} from "react-redux"
import { PersistGate } from 'redux-persist/integration/react'
import {persistStore, type Persistor} from "redux-persist";
let persistor: Persistor = persistStore(store)
import store from './redux/reduxStore'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
              <RouterProvider router={Router} />
              <ToastContainer position="top-left" autoClose={5000} />
        </PersistGate>
     </Provider>
  </StrictMode>,
)
