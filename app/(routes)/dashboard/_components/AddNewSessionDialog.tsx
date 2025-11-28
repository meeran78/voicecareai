'use client';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { DialogClose } from '@radix-ui/react-dialog';
import { IconAi, IconArrowLeft, IconArrowRight, IconWand } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import DrAgentCard, { doctorAgent } from './DrAgentCard';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import SuggestedDrsCard from './SuggestedDrsCard';

type Props = {
	selectedDr: doctorAgent;
};
export function AddNewSessionDialog({ selectedDr }: Props) {
	const [note, setNote] = useState();
	const [loading, setLoading] = useState(false);
	const [suggestedDoctors, setSuggestedDoctors] = useState<doctorAgent[]>();
	const [selectedDoctor, setSelectedDoctor] = useState<doctorAgent>();
	const router = useRouter();

	useEffect(() => {
		if (selectedDr) setSelectedDoctor(selectedDr);
	}, []);

	const OnClickNext = async () => {
		setLoading(true);
		//if (!selectedDr) {
		const result = await axios.post('/api/suggest-doctors', {
			notes: note,
			selectedDr: selectedDr,
		});
		console.log(result.data);
		setSuggestedDoctors(result.data);
		//}

		setLoading(false);
	};
	const onStartConsultation = async () => {
		if (selectedDr) setSelectedDoctor(selectedDr);

		setLoading(true);
		const result = await axios.post('/api/session-chat', {
			notes: note,
			selectedDr: selectedDoctor,
		});
		//console.log(result.data);
		if (result.data?.sessionId) {
			console.log(result.data);
			router.push(`/dashboard/care-agent/${result.data.sessionId}`);
		}
		setLoading(false);
	};

	return (
		<Dialog>
			<DialogTrigger>
				<Button className='mt-4 cursor-pointer'>+ Start a Consultation</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						{!suggestedDoctors ? 'Add basic details' : 'Select the specialist'}
					</DialogTitle>
					<DialogDescription asChild>
						{!suggestedDoctors ? (
							<div>
								<h2 className='font=semibold'>
									Add Symptoms are any other details
								</h2>

								<Textarea
									placeholder='Add Detail here...'
									className='h-[200px] mt-2'
									//@ts-ignore
									onChange={(e) => setNote(e.target.value)}
								/>
							</div>
						) : (
							<div className='grid grid-cols-3 gap-7'>
								{suggestedDoctors.map((doctor, index) => (
									<div key={index}>
										<SuggestedDrsCard
											doctorAgent={doctor}
											setSelectedDrs={() => setSelectedDoctor(doctor)}
											selectedDr={doctor}
										/>
									</div>
								))}
							</div>
						)}
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<DialogClose>
						<Button>Cancel</Button>
					</DialogClose>

					{selectedDr ? (
						<Button
							disabled={!note}
							onClick={() => onStartConsultation()}
							className='pointer-cursor'>
							{' '}
							Go <IconArrowRight />
							{loading && <Loader2 className='animate-spin' />}{' '}
						</Button>
					) : (
						<>
						{!suggestedDoctors ? (
						<Button
							disabled={!note || loading}
							onClick={() => OnClickNext()}
							className='pointer-cursor'>
							Go <IconArrowRight />
							{loading && <Loader2 className='animate-spin' />}
						</Button>
					) : (
						<Button
							disabled={loading || !selectedDoctor}
							onClick={() => onStartConsultation()}
							className='pointer-cursor'>
							{' '}
							Start Consulation
							{loading && <Loader2 className='animate-spin' />}{' '}
						</Button>
					)}</>
					)
}

					
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
