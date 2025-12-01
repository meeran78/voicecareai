'use client';
import { useParams } from 'next/navigation';
import React, { use, useEffect, useState } from 'react';
import axios from 'axios';
import { doctorAgent } from '../../_components/DrAgentCard';
import { Circle, Loader, Phone, PhoneOutgoing } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Vapi from '@vapi-ai/web';
import { IconPhoneEnd } from '@tabler/icons-react';
import Provider from '@/app/provider';

export type SessionDetail = {
	id: number;
	notes: string;
	sessionId: string;
	report: JSON;
	selectedDr: doctorAgent;
	createdOn: string;
};

type message = {
	role: string;
	text: string;
};

function CareAgent() {
	const { sessionId } = useParams();
	const [sessionInfo, setSessionInfo] = useState<SessionDetail | undefined>();
	const [callStarted, setCallStarted] = useState(false);
	const [currentRole, setCurrentRole] = useState<string | null>();
	const [liveTranscript, setLiveTranscript] = useState<string>();
	const [vapiInstance, setVapiInstance] = useState<any>();
	const [messages, setMessages] = useState<message[]>([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		sessionId && GetSessionInfo();
	}, [sessionId]);

	const GetSessionInfo = async () => {
		const result = await axios.get(`/api/session-chat?sessionId=${sessionId}`);
		//console.log(result.data);
		setSessionInfo(result.data);
	};

	const StartCall = () => {
		setLoading(true);
		const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);
		setVapiInstance(vapi);

		//Customizing the agent
		const VapiAgentConfig = {
			name: 'AI Medical Doctor Voice Agent',
			firstMessage:
				"Hi there! I'm your AI Medical assistant. I'm here to help you with any health questions or concerns you might today. How can I assist you?",  
			transcriber: {
				provider: 'assembly-ai',
				language: 'en',
			},
			voice: {
				provider: 'vapi',
				voiceId: sessionInfo?.selectedDr.voiceId,
			},
			model: {
				provider: 'openai',
				model: 'gpt-4',
				messages: [
					{
						role: 'system',
						content: sessionInfo?.selectedDr?.agentPrompt,
					},
				],
			},
		};
		//Calling custom vapi agent config\
		//@ts-ignore
		vapi.start(VapiAgentConfig);

		//Below code will run default voice id setup in vapi
		//vapi.start(process.env.NEXT_PUBLIC_VAPI_VOICE_ASSISTNAT_ID);

		vapi.on('call-start', () => {
			setLoading(false);
			//console.log('Call started');
			setCallStarted(true);
		});

		vapi.on('call-end', () => {
			//console.log('Call ended');
			setCallStarted(false);
		});

		vapi.on('message', (message) => {
			if (message.type === 'transcript') {
				const { role, transcriptType, transcript } = message;
				//console.log(`${message.role}: ${message.transcript}`);
				if (transcriptType == 'final') {
					setMessages((prev) => [...prev, { role:role, text: transcript }]);
					setLiveTranscript("");
					setCurrentRole(null);
				} else {
					setLiveTranscript(transcript);
					setCurrentRole(role);
				}
			}
		});

		vapi.on('speech-start', () => {
			console.log('Assistant start speaking');
			setCurrentRole('assistant');
		});
		vapi.on('speech-end', () => {
			console.log('Assistant stopped speaking');
			setCurrentRole('user');
		});
	};

	const EndCall = async () => {
		console.log(vapiInstance)
		setLoading(true);
		if (!vapiInstance) return;
		vapiInstance.stop();
		//Optionally remove listner
		
		// vapiInstance.off('call-start');
		// vapiInstance.off('call-end');
		// vapiInstance.off('message');
		// vapiInstance.off('speech-start');
		// vapiInstance.off('speech-end');
		setCallStarted(false);
		setVapiInstance(null);

		const report = await GenerateReport();
		setLoading(false);
		//console.log(report);
	};

	const GenerateReport = async () => {
		const result = await axios.post('/api/generate-report', {
			sessionId: sessionInfo?.sessionId,
			sessionInfo: sessionInfo,
			messages: messages,
		});
		//console.log(result.data);

		return result.data;
	};
	return (
		<div className='p-5 border rounded-4xl shadow-gray-500 bg-secondary'>
			<div className='flex justify-between items-center'>
				<h1 className='p-1 px-2 border rounded-md flex gap-2 items-center'>
					<Circle
						className={`h-4 w-4
           ${callStarted ? 'bg-green-500' : 'bg-red-500'} `}
					/>
					{callStarted ? 'Connected' : 'Not Connected'}
				</h1>
				<h2 className='font-bold text-xl text-gray-300'>00:00</h2>
			</div>
			{sessionInfo && (
				<div className='flex items-center flex-col mt-14'>
					<Image
						src={sessionInfo?.selectedDr?.image}
						alt={sessionInfo?.selectedDr?.specialist}
						width={200}
						height={200}
						className='h-[100px] w-[100px] object-cover rounded-full shadow-2xl'
					/>
					<h2 className='mt-2 text-lg'>
						{sessionInfo?.selectedDr?.specialist}
					</h2>
					<p className='text-sm text-gray-500'>AI Care Voice Agent</p>

					<div className='mt-32 overflow-y-auto flex flex-col items-center px-10 md:px-28 lg:px-52 xl:px-72'>
						{messages?.slice(-6).map((message, index) => (
							<div key={index}>
								<h2 className='text-gray-400 p-3'>
									{message.role} : {message.text}
								</h2>
							</div>
						))}

						{liveTranscript && liveTranscript?.length > 0 && (
							<h2 className='text-lg'>
								{currentRole} : {liveTranscript}
							</h2>
						)}
					</div>
					{/* onClick={() => StartCall()} */}
					{!callStarted ? (
						<Button className='mt-56' onClick={StartCall} disabled={loading}>
							{loading ? (
								<Loader className='animate-spin' />
							) : (
								<PhoneOutgoing />
							)}
							Start Call
						</Button>
					) : (
						<Button variant={'destructive'} onClick={EndCall}>
							{loading ? <Loader className='animate-spin' /> : <IconPhoneEnd />}
							Disconnect
						</Button>
					)}
				</div>
			)}
		</div>
	);
}

export default CareAgent;
