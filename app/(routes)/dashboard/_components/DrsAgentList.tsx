import React from 'react'
import { AIDoctorsList } from '@/shared/drsdetails'
import DrAgentCard from './DrAgentCard'

export const DrsAgentList = () => {
  return (
    <div className='mt-10'>
    <h2 className='font-bold text-xl'>Carevoice AI Specialit Agents</h2>
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 mt-5'>
         {
        AIDoctorsList.map((doctor, index)=>(
            <div key={index} >
                <DrAgentCard doctor={doctor} />
            </div>
        ))
    }
    </div>
   
    </div>
  )
}
