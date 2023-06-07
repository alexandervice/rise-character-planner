import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate} from "react-router-dom";
import StoreForm from './StoreForm';

const CreateStore = (props) => {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const createStore = storeData => {
    axios.post('http://localhost:8000/api/stores/create', storeData)
      .then(res=>{
        console.log(res.data);
        navigate(`/stores/${res.data.store._id}`);
      })
      .catch(err=> {
        console.log(storeData)
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
      <h3 className=' font-bold'>Add a new Store:</h3>
      <div>
        <StoreForm onSubmission={createStore} placeholderName={""} placeholderStoreNumber={1} placeholderIsOpen={false} errors={errors}/>
      </div>
    </div>
  )
}
export default CreateStore;

