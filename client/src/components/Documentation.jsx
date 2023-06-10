import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

const Documentation = () => {
  const [races, setRaces] = useState([]);
  const [table2Data, setTable2Data] = useState([]);
  // Add more state variables for additional tables as needed

  const [racesOffset, setRacesOffset] = useState(0);
  const [table2Offset, setTable2Offset] = useState(0);
  // Add more offset state variables for additional tables as needed

  const [raceDataPerPage] = useState(2);
  const [table2PerPage] = useState(3);
  // Add more perPage state variables for additional tables as needed

  const [racesCurrentPage, setRacesCurrentPage] = useState(0);
  const [table2CurrentPage, setTable2CurrentPage] = useState(0);
  // Add more currentPage state variables for additional tables as needed

  useEffect(() => {
    fetchRaceData();
    fetchDataForTable2();
    // Fetch data for additional tables as needed
  }, []);

  const fetchRaceData = async () => {
    try {
      const response = await axios.get('/api/races/find/all');
      setRaces(response.data.races);
    } catch (error) {
      console.error('Error fetching data for table1:', error);
    }
  };

  const fetchDataForTable2 = async () => {
    try {
      const response = await axios.get('/api/table2'); // Replace with your backend API endpoint for table2
      setTable2Data(response.data);
    } catch (error) {
      console.error('Error fetching data for table2:', error);
    }
  };

  // Fetch data for additional tables as needed


  // Rest of the code...


  const handleRacePageChange = (selectedPage) => {
    const newOffset = selectedPage * raceDataPerPage;
    setRacesOffset(newOffset);
    setRacesCurrentPage(selectedPage);
  };
  
  const handleTable2PageChange = (selectedPage) => {
    const newOffset = selectedPage * table2PerPage;
    setTable2Offset(newOffset);
    setTable2CurrentPage(selectedPage);
  };
  
  // Implement page change handlers for additional tables as needed


  const renderRaceData = () => {
    const slice = races.slice(racesOffset, racesOffset + raceDataPerPage);
    return slice.map((item) => (
      <tr key={item.id}>
        <td>{item.name}</td>
        <td>{item.description}</td>
      </tr>
    ));
  };
  
  const renderTable2Data = () => {
    const slice = table2Data.slice(table2Offset, table2Offset + table2PerPage);
    return slice.map((item) => (
      <tr key={item.id}>
        <td>{item.name}</td>
        <td>{item.description}</td>
      </tr>
    ));
  };
  
  // Render data for additional tables as needed


  const renderRaces = () => {
    if (races.length === 0) {
      return <div>Loading Race data...</div>;
    }
  
    return (
      <table>
        {/* Render table1 header */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        {/* Render table1 data */}
        <tbody>{renderRaceData()}</tbody>
      </table>
    );
  };
  
  const renderTable2 = () => {
    if (table2Data.length === 0) {
      return <div>Loading table2 data...</div>;
    }
  
    return (
      <table>
        {/* Render table2 header */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        {/* Render table2 data */}
        <tbody>{renderTable2Data()}</tbody>
      </table>
    );
  };
  
  // Render tables for additional tables as needed
  
  const renderTable1Pagination = () => {
    const pageCount = Math.ceil(races.length / raceDataPerPage);
  
    return (
      <ReactPaginate
        previousLabel="Previous"
        nextLabel="Next"
        pageCount={pageCount}
        onPageChange={handleRacePageChange}
        containerClassName="pagination"
        activeClassName="active"
      />
    );
  };
  
  const renderTable2Pagination = () => {
    const pageCount = Math.ceil(table2Data.length / table2PerPage);
  
    return (
      <ReactPaginate
        previousLabel="Previous"
        nextLabel="Next"
        pageCount={pageCount}
        onPageChange={handleTable2PageChange}
        containerClassName="pagination"
        activeClassName="active"
      />
    );
  };
  
  // Render pagination for additional tables as needed
  

  return (
    <div>
      {renderRaces()}
      {renderTable1Pagination()}
  
      {renderTable2()}
      {renderTable2Pagination()}
    </div>
  );
  
};

export default Documentation