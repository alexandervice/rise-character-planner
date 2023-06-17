import React from 'react';
import PrismaZoom from 'react-prismazoom'

const Map = () => {

  return (
    <div className='p-5 dark:bg-zinc-900 bg-slate-300'>
      <PrismaZoom maxZoom={5}>
        <p></p>
        <img src="https://rise-character-planner.s3.us-west-1.amazonaws.com/images/map/campain+map+(v1.0).png" alt='Map of Elara'/>
      </PrismaZoom>
    </div>
  )
}

export default Map