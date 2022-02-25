import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Todo from './components/Todo';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import Alerts from './components/layouts/Alerts';
import './App.css';

const App = () => {
  return (
    <Router>
      <Fragment>
        <AuthState>
          <AlertState>
            <Alerts />
              <div className='container'>
                <Routes>
                  <Route exact path='/todo' element={<Todo/>} />
                  <Route exact path='/register' element={<Register/>} />
                  <Route exact path='/' element={<Login/>} />
                </Routes>
              </div>
          </AlertState>
        </AuthState>
      </Fragment>
    </Router>
  );
};

export default App;