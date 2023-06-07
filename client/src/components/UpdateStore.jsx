import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams, Link } from "react-router-dom";
import StoreForm from './StoreForm';

const UpdateStore = (props) => {
  const { id } = useParams();
  const [store, setStore] = useState({});
  const [errors, setErrors] = useState([]);
  const [loaded, setLoaded] =useState(false)

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/api/stores/find/${id}`)
      .then(res => {
        setStore(res.data.store)
        console.log(res.data.store)
        res.data.store ?
        setLoaded(true) :
        setLoaded(false)
      })
        .catch(err => console.log(err))
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateStore = storeData => {
    axios.patch(`http://localhost:8000/api/stores/update/${id}`, storeData)
      .then(res => {
        console.log(res);
        navigate(`/stores/${res.data.store._id}`);
      })
      .catch(err => {
        console.log(err)
        const errorResponse = err.response.data.errors;
        const errorArray = [];
        for (const key of Object.keys(errorResponse)) {
          errorArray.push(errorResponse[key].message)
        }
        setErrors(errorArray)
        console.log(errors)
      })
  }

  return (
    <div>
      <h3 className=' font-bold'>Edit this Store:</h3>
      {loaded? 
      <div>
        <StoreForm onSubmission={updateStore} placeholderName={store.name} placeholderStoreNumber={store.storeNumber} placeholderIsOpen={store.isOpen}  errors={errors}/>
      </div>:
      <div>
        <p>"We're sorry, but we could not find the store you are looking for. Would you like to add a new store to the database?"</p>
        <Link className='storesItem ' to={"/stores/create"}><button className='bg-purple-100 hover:bg-purple-200 rounded px-1 border-solid border-2 mt-3 border-purple-500 mb-5'>Add a new Store</button></Link>
      </div>}
    </div>
  )
}
export default UpdateStore;

