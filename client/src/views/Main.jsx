import React, { useEffect, useState } from 'react'
import axios from 'axios';
import StoreList from '../components/StoreList';
const Main = (props) => {
  const [storeArray, setStoreArray] = useState([]);
  useEffect(()=>{
    axios.get("http://localhost:8000/api/stores/find/all")
      .then((res)=>{
        // console.log(res.data.stores);
        setStoreArray(res.data.stores);
      })
      .catch(err=>console.log(err))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeArray.length])


  const deleteStore = (id) => {
    // window.location.reload(false);
    setStoreArray(storeArray.filter(store => store.id !== id));
  }

  return (
    <div>
      {/* more could be added here for the main page */}
      <StoreList storeArray={storeArray} deleteStore={deleteStore}/>
    </div>
  )
}
export default Main;
