import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams, Link} from "react-router-dom";
import CancelButton from './CancelButton';

const OneStore = (props) => {
  const [store, setStore] = useState({});
  const {id} = useParams();


  useEffect(() => {
    axios.get(`http://localhost:8000/api/stores/find/${id}`)
      .then( res => {
        console.log(res.data.store);
        setStore(res.data.store);
      })
      .catch( err=>console.log(err) );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="p-4 px-6 bg-slate-200">
      <h3 className='text-2xl text-left font-bold'>{store.name}</h3>
      <h3 className='text-2xl text-left font-bold'>#: {store.storeNumber}</h3>
      {
      store.isOpen ?
      <h3 className='text-2xl text-left font-bold'>Open</h3> :
      <h3 className='text-2xl text-left font-bold'>Closed</h3>
      }
      </div>
      <CancelButton/>
      <Link className='storeItem' to={`/stores/edit/${id}`}><button className='bg-blue-100 hover:bg-blue-200 rounded px-1 border-solid border-2 mt-5 border-blue-400 mb-5'>Edit Store Details</button></Link>
    </div>
  );
}

export default OneStore;