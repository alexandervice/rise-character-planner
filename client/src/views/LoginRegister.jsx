import React from 'react'
import LoginForm from '../components/LoginForm';
import RegistrationForm from '../components/RegistrationForm';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const LoginRegistration = () => {
  
  return (
    <div className='p-5 bg-gray-300 dark:bg-gray-600 text-black dark:text-white'>
      <Tabs>
        <TabList>
          <Tab>Register</Tab>
          <Tab>Log in</Tab>
        </TabList>
        <TabPanel>
          <RegistrationForm/>
        </TabPanel>
        <TabPanel>
          <LoginForm/>
        </TabPanel>
      </Tabs>
    </div>
  )
}
export default LoginRegistration;