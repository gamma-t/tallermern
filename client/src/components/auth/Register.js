import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
import Swal from 'sweetalert2';

const Register = () => {

  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;

  const { register } = authContext;

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const {
    name,
    email,
    password,
    password2
  } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      name === '' ||
      email === '' ||
      password === '' ||
      password2 === ''
    ) {
      setAlert('Por favor ingrese todos los campos', 'danger');
    } else if (password !== password2) {
      setAlert('Las contraseñas no coinciden', 'danger');
    } else {
      try{
        register({
          name,
          email,
          password
        });
        Swal.fire({
          icon: 'success',
          title: 'Se ha registrado.',
          showConfirmButton: false,
          timer: 1500,
        });
      } catch(err){
        setAlert('Email already exists', 'danger');
      }
      
    }
  };
  return (
    <>
      <div class='container'>
        <form className='form-row' onSubmit={onSubmit}>
          <div className='form-group col-md-6'>
            <div className='col'>
              <label htmlFor='name'>Name</label>
              <input
                type='text'
                name='name'
                value={name}
                className='form-control'
                onChange={onChange}
              />
            </div>
          </div>

          <div className='form-group col-md-12'>
            <div className='col'>
              <label htmlFor='name'>Email</label>
              <input
                type='email'
                name='email'
                value={email}
                className='form-control'
                onChange={onChange}
              />
            </div>
          </div>
          <div className='form-group col-md-6'>
            <div className='col'>
              <label htmlFor='name'>Password</label>
              <input
                type='password'
                name='password'
                value={password}
                className='form-control'
                onChange={onChange}
                minLength='6'
              />
              <small className='form-text text-muted'>
                Your password must have more than 6 characters
              </small>
            </div>
          </div>
          <div className='form-group col-md-6'>
            <div className='col'>
              <label htmlFor='name'>Reenter password</label>
              <input
                type='password'
                name='password2'
                value={password2}
                className='form-control'
                onChange={onChange}
                minLength='6'
              />
            </div>
          </div>
          <div class='container'>
            <div class='centerRegister'>
              <button className='defaultButton' type='submit'>
                Register
              </button>
              <button
                onClick={() => {
                  window.open('/', '_self');
                }}
              >
                Back
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default Register