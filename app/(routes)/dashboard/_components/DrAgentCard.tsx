import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { IconArrowRight } from '@tabler/icons-react';
import Link from 'next/link';
import { AddNewSessionDialog } from './AddNewSessionDialog';
export type doctorAgent = {
	id: number;
	name: string;
	specialist: string;
	image: string;
	agentPrompt: string;
	description: string;
	voiceId: string;
};
const DrAgentCard = ({ doctor }: { doctor: doctorAgent }) => {
	return (
		<div className='shadow-2xl p-1'>
			<Image
				src={doctor.image}
				alt={doctor.specialist}
				width={200}
				height={300}
				className='w-full h-[250px] object-cover rounded-xl shadow-2xl'
			/>

			<h2 className='font-bold mt-1'>{doctor.specialist}</h2>
			<p className='text-sm h-[140px] '>{doctor.description}</p>
			<div className='w-full cursor-pointer mx-auto flex justify-center items-center'>
				<AddNewSessionDialog selectedDr={doctor} />
			</div>

			{/* <Link href={`/dashboard/care-agent/${doctor.id}`}>  <Button className='w-full mt-2 cursor-pointer'>Start Consultation <IconArrowRight /></Button></Link> */}
		</div>
	);
};

export default DrAgentCard;
