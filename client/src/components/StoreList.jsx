import React from 'react';
import {Link} from "react-router-dom";
import DeleteButton from './DeleteButton';

const StoreList = (props) => {
  const {storeArray, deleteStore} = props;
  return (
    <div>
      <h3 className=' font-bold mb-4'>Find stores in your area!</h3>
      <table className='table-auto border border-slate-500  border border-slate-500 font-semibold text-slate-900 text-center'>
        <thead className='bg-slate-100'>
          <tr>
            <th className='py-2 px-3'>Store Name</th>
            <th className='py-2 px-3'>Store Number</th>
            <th className='py-2 px-3'>Open?</th>
            <th className='py-2 px-3'>Actions Available</th>
          </tr>
        </thead>
        <tbody>
        {
          storeArray.map((store, index)=>{
          return(
            <tr key={index}>
              <td className='py-2 px-3 text-blue-500'>
                <Link to={`/stores/${store._id}`}>{store.name}</Link>
              </td>
              <td className='py-2 px-3'>{store.storeNumber}</td>
              {
              store.isOpen ?
              <td className='py-2 px-3'>Open</td> :
              <td className='py-2 px-3'>Closed</td>
              }
              
              <td className='py-2 px-3'>
                <Link className='storeItem' to={`/stores/edit/${store._id}`}><button className='bg-blue-200 hover:bg-blue-300 rounded px-1 border-solid border-2 border-blue-400'>Edit</button></Link>
                <DeleteButton storeId={store._id} successCallback = {deleteStore}/>
              </td>
            </tr>
          )})
        }
        </tbody>
      </table>
      <Link className='storeItem ' to={"/stores/create"}><button className='mt-5 bg-yellow-100 hover:bg-yellow-200 rounded px-1 border-solid border-2 border-yellow-400 mb-5'>Add a new Store</button></Link>
    </div>
  )
}
export default StoreList;

