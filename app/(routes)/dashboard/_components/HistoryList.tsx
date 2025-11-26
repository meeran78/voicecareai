'use client'
import React, { useState } from 'react'
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { AddNewSessionDialog } from './AddNewSessionDialog';
function HistoryList() {
    const [historyList, setHistoryList] = useState([]);
  return (
    <div className='mt-7'>
        {historyList.length == 0 ? <div className='flex items-center flex-col justify-center p-7 border border-dashed rounded-2xl border-2'>
            <Image src={'/medicalassistant.jpg'} alt="logo" width={200} height={200}/>
            <h2 className='font-bold text-xl mt-5'>No Recent Consultation</h2>
            <p>Its look like you haven't consulted with any doctors yet.</p>
            <AddNewSessionDialog />

        </div> : <div>No Recent Consultation</div>}
    </div>
  )
}

export default HistoryList