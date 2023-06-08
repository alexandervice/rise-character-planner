import React, { useEffect, useState } from 'react'
import axios from 'axios';
import LoginForm from '../components/LoginForm';
import RegistrationForm from '../components/RegistrationForm';

const LoginRegistration = (props) => {

  return (
    <div>
      <LoginForm/>
      <RegistrationForm/>
    </div>
  )
}
export default LoginRegistration;