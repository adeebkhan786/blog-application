import { useState } from 'react';

import './App.css';
import DataProvider from './context/DataProvider';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Header from './components/header/Header';

//components
import Login from "./components/account/Login";
import ForgottenPassword from "./components/account/ForgottenPassword";
import Home from './components/home/Home';
import CreatePost from './components/create/CreatePost';
import DetailView from './components/details/DetailVew';
import Update from './components/create/Update';
import About from './components/about/About';
import Contact from './components/contact/Contact';

const PrivateRoute = ({ isAuthenticated, ...props }) => {
  return isAuthenticated ?
    <>
      <Header />
      <Outlet />
    </>
    : <Navigate replace to='/login' />
}


function App() {

  const [isAuthenticated, isUserAuthenticated] = useState(false);
  return (
    <DataProvider>
      <BrowserRouter>
        {/* <Header /> */}
        <div style={{ marginTop: 55 }}>   {/* backgroundColor: '#476b3c' */}
          <Routes>
            <Route path='/login' element={<Login isUserAuthenticated={isUserAuthenticated} />} />
            <Route path='/forgotten-password' element={<ForgottenPassword isUserAuthenticated={isUserAuthenticated} />} />
            {/* Private Route bnaayenge Home component ko jisse ki refresh hone pr wo login page pe lekr chlaa jayega */}
            <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path='/' element={<Home />} />
            </Route>

            {/* Private Route bnaayenge CreatePost component ko jisse ki refresh hone pr wo login pafe pe lekr chlaa jayega */}
            <Route path='/create' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path='/create' element={<CreatePost />} />
            </Route>

            <Route path='/details/:id' element={<PrivateRoute is isAuthenticated={isAuthenticated} />} >
              <Route path='/details/:id' element={<DetailView />} />
            </Route>

            <Route path='/update/:id' element={<PrivateRoute is isAuthenticated={isAuthenticated} />} >
              <Route path='/update/:id' element={<Update />} />
            </Route>

            <Route path='/about' element={<PrivateRoute is isAuthenticated={isAuthenticated} />} >
              <Route path='/about' element={<About />} />
            </Route>

            <Route path='/contact' element={<PrivateRoute is isAuthenticated={isAuthenticated} />} >
              <Route path='/contact' element={<Contact />} />
            </Route>

          </Routes>
        </div>
      </BrowserRouter>
    </DataProvider >
  );
}

export default App;
