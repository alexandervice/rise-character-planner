import React, { useEffect, useState } from 'react'
import LoginForm from '../components/LoginForm';
import RegistrationForm from '../components/RegistrationForm';

const LoginRegistration = () => {
  
  return (
    <div className='p-5 bg-gray-300 dark:bg-gray-600 text-black dark:text-white'>
      <LoginForm/>
      <RegistrationForm/>
    </div>
  )
}
export default LoginRegistration;