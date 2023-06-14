import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const Documentation = (props) => {
  const [races, setRaces] = useState([]);
  const [backgrounds, setBackgrounds] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [talents, setTalents] = useState([]);
  const loggedIn = props.loggedIn

  useEffect(() => {
    fetchRaceData();
    fetchBackgroundData();
    fetchSpecializationData();
    fetchTalentData();
    // Fetch data for additional tables as needed
  }, []);

  const fetchRaceData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/races/find/all');
      setRaces(response.data.races);
      // console.log(localStorage.getItem("user"))
      // console.log(response.data.races)
      console.log(loggedIn)
    } catch (error) {
      console.error('Error fetching data for races:', error);
    }
  };

  const fetchBackgroundData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/backgrounds/find/all'); 
      setBackgrounds(response.data.backgrounds);
      // console.log(response.data.backgrounds)
    } catch (error) {
      console.error('Error fetching data for backgrounds:', error);
    }
  };

  const fetchSpecializationData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/specializations/find/all'); 
      setSpecializations(response.data.specializations);
      // console.log(response.data.specializations)
    } catch (error) {
      console.error('Error fetching data for specializations:', error);
    }
  };

  const fetchTalentData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/talents/find/all'); 
      setTalents(response.data.talents);
      // console.log(response.data.talents)
    } catch (error) {
      console.error('Error fetching data for talents:', error);
    }
  };


  const renderRaceData = () => {
    return races.map((item, index)=> (
      <tr key={index}  className=' hover:bg-zinc-500'>
        <td className='py-2 px-3 border border-slate-200'>
          <img src={`/images/races/${item.image[0]}.jpg`} alt={`${item.name}`} />
        </td>
        <td className='py-2 px-3 border border-slate-200'>{item.name}</td>
        <td className='py-2 px-3 border border-slate-200 text-sm'>{item.description}</td>
      </tr>
      ))
  };
  
  const renderBackgroundData = () => {
    return backgrounds.map((item, index)=> (
      <tr key={index} className=' hover:bg-zinc-500'>
        <td className='py-2 px-3 border border-slate-200'>{item.name}</td>
        <td className='py-2 px-3 border border-slate-200'>{item.description}</td>
      </tr>
    ))
  };
  
  const renderSpecializationData = () => {
    return specializations.map((item, index)=> (
      <tr key={index}  className=' hover:bg-zinc-500'>
        <td className='py-2 px-3 border border-slate-200'>{item.name}</td>
        <td className='py-2 px-3 border border-slate-200'>{item.description}</td>
      </tr>
      ))
  };
  
  const renderTalentData = () => {
    return talents.map((item, index)=> (
      <tr key={index} className=' hover:bg-zinc-500'>
        <td className='py-2 px-3 border border-slate-200'>{item.name}</td>
        <td className='py-2 px-3 border border-slate-200'>{item.description}</td>
      </tr>
    ))
  };
  // Render data for additional tables as needed


  const renderRaces = () => {
    if (races.length === 0) {
      return <div>Loading Race data...</div>;
    }
  
    return (
      <table className='table-auto border border-slate-500'>
        {/* Render table1 header */}
        <thead className='text-xl'>
          <tr>
            <th className='border py-5 dark:border-slate-200 dark:bg-zinc-700'>Image</th>
            <th className='border py-5 dark:border-slate-200 dark:bg-zinc-700'>Name</th>
            <th className='border dark:border-slate-200 dark:bg-zinc-700'>Description</th>
          </tr>
        </thead>
        {/* Render table1 data */}
        <tbody>{renderRaceData()}</tbody>
      </table>
    );
  };
  
  const renderBackgrounds = () => {
    if (backgrounds.length === 0) {
      return <div>Loading Background data...</div>;
    }
  
    return (
      <table className='table-auto border border-slate-500'>
        {/* Render table1 header */}
        <thead>
          <tr>
            <th className='border py-5 dark:border-slate-200 dark:bg-zinc-700'>Name</th>
            <th className='border dark:border-slate-200 dark:bg-zinc-700'>Description</th>
          </tr>
        </thead>
        {/* Render table1 data */}
        <tbody>{renderBackgroundData()}</tbody>
      </table>
    );
  };
  
  const renderSpecializations = () => {
    if (specializations.length === 0) {
      return <div>Loading Specialization data...</div>;
    }
  
    return (
      <table className='table-auto border border-slate-500'>
        {/* Render table1 header */}
        <thead>
          <tr>
            <th className='border py-5 dark:border-slate-200 dark:bg-zinc-700'>Name</th>
            <th className='border dark:border-slate-200 dark:bg-zinc-700'>Description</th>
          </tr>
        </thead>
        {/* Render table1 data */}
        <tbody>{renderSpecializationData()}</tbody>
      </table>
    );
  };
  
  const renderTalents = () => {
    if (talents.length === 0) {
      return <div>Loading Talent data...</div>;
    }
  
    return (
      <table className='table-auto border border-slate-500'>
        {/* Render table1 header */}
        <thead>
          <tr>
            <th className='border py-5 dark:border-slate-200 dark:bg-zinc-700'>Name</th>
            <th className='border dark:border-slate-200 dark:bg-zinc-700'>Description</th>
          </tr>
        </thead>
        {/* Render table1 data */}
        <tbody>{renderTalentData()}</tbody>
      </table>
    );
  };

  return (
    <div className='p-5 bg-gray-300 dark:bg-zinc-800 text-black dark:text-white'>
      <Tabs>
        <TabList>
          <Tab>Races</Tab>
          <Tab>Backgrounds</Tab>
          <Tab>Specializations</Tab>
          <Tab>Talents</Tab>
        </TabList>
        <TabPanel>
          {renderRaces()}
        </TabPanel>
        <TabPanel>
          {renderBackgrounds()}
        </TabPanel>
        <TabPanel>
          {renderSpecializations()}
        </TabPanel>
        <TabPanel>
          {renderTalents()}
        </TabPanel>
      </Tabs>
    </div>
  );
  
};

export default Documentation