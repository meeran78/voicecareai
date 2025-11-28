import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { IconArrowRight } from '@tabler/icons-react';
import { AnyColumn } from 'drizzle-orm';

import { doctorAgent } from './DrAgentCard';
type props = {
	doctorAgent: doctorAgent;
	setSelectedDrs: any;
	selectedDr: any;
};

function SuggestedDrsCard({ doctorAgent, setSelectedDrs, selectedDr }: props) {
	console.log(selectedDr);
	return (
		<div
			className={`flex flex-col items-center  border rounded-2xl p-3 
        shadow-2xl hover:border-blue-600}   ${
					selectedDr?.id === doctorAgent.id && 'border-blue-600 hover:cursor-pointer'
				}`}
			onClick={() => setSelectedDrs(doctorAgent)}>
			<Image
				src={doctorAgent.image}
				alt={doctorAgent.specialist}
				width={80}
				height={80}
				className='w-[60px] h-[60px] rounded-4xl object-cover shadow-2xl'
			/>

			<h2 className='font-bold text-sm text-center mt-2'>
				{doctorAgent.specialist}
			</h2>
			<p className='text-xs text-center line-clamp-2'>
				{doctorAgent.description}
			</p>
		</div>
	);
}

export default SuggestedDrsCard;
