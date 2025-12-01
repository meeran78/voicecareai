'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { AddNewSessionDialog } from './AddNewSessionDialog';
import axios from 'axios';
import HistoryListview from './HistoryListview';
import { SessionDetail } from '../care-agent/[sessionId]/page';
import { doctorAgent } from './DrAgentCard';

type Props = {
	selectedDr: doctorAgent;
};

function HistoryList() {

  const [historyList, setHistoryList] = useState<SessionDetail[]>([])
  const [selectedDr, setSelectedDr] = useState<doctorAgent | null>()
	const GetHistoryList = async () => {
		const result = await axios.get('/api/session-chat?sessionId=all');
		console.log(result.data);
		setHistoryList(result.data);
	};
	useEffect(() => {
		GetHistoryList();
	}, []);

	return (
      
		<div className='mt-7 '>
			{historyList.length == 0 ? (
				<div className='flex items-center flex-col justify-center p-7 border border-dashed rounded-2xl border-2'>
					<Image
						src={'/medicalassistant.jpg'}
						alt='logo'
						width={200}
						height={200}
					/>
					<h2 className='font-bold text-xl mt-5'>No Recent Consultation</h2>
					<p>Its look like you haven't consulted with any doctors yet.</p>
					<AddNewSessionDialog selectedDr={selectedDr}/>
				</div>
			) : (
				
          <HistoryListview historyList={historyList} />
       
			)}
		</div>
	);
}

export default HistoryList;
