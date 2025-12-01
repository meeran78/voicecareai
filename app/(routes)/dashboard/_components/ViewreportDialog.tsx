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
import { SessionDetail } from '../care-agent/[sessionId]/page';
type Props = {
	item: SessionDetail;
};

function ViewreportDialog({ item }: Props) {
	
	return (
		<Dialog>
			<DialogTrigger>
				<Button variant={'link'}>View Report</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle asChild>
						<h2 className='text-center text-3xl'>Medical Agent Voice Report</h2>
					</DialogTitle>
					<DialogDescription asChild>
						<div className='mt-10'>
							<div>
								<h2 className='font-bold text-purple-500 text-lg'>
									Session Info:
								</h2>
								<hr className='' />
								<div className='grid grid-cols-2 mt-4'>
									<div>
										<h2>
											<span className='font-bold'>Doctor Specialization</span>{' '}
											{item.selectedDr?.specialist}
										</h2>
										<h2>
											<span className='font-bold'>Consulted On:</span> {new Date(item.createdOn).toDateString()}
										</h2>
									</div>
									<div>
										<h2>
											<span className='font-bold'>User:</span>{' '}
											{item.report?.user}
										</h2>
										<h2><span className='font-bold'>Agent: </span>{item.report?.agent}</h2>
									</div>
								</div>
							</div>
							<div className='mt-5'>
								<h2 className='font-bold text-purple-500 text-lg'>Complaint</h2>
								<hr className='' />
								<div>
									<p> {item?.report?.chiefComplaint} </p>
								</div>
							</div>
							<div className='mt-5'>
								<h2 className='font-bold text-purple-500 text-lg'>Summary</h2>
								<hr className='' />
								<div>
									<p> {item?.report?.summary} </p>
								</div>
							</div>
							<div className='mt-5'>
								<h2 className='font-bold text-purple-500 text-lg'>Symtoms</h2>
								<hr className='' />
								<div>
									 {item?.report?.symptoms.map((symptom, index) => (
										<ul className=''>
											<li className='mx-8 list-disc list-inside'>{symptom}</li>
										</ul>
										
									))} 
								</div>
							</div>
							<div className='mt-5'>
								<h2 className='font-bold text-purple-500 text-lg'>Severity</h2>
								<hr className='' />
								<div>
									<p> {item?.report?.severity} </p>
								</div>
							</div>
<div className='mt-5'>
								<h2 className='font-bold text-purple-500 text-lg'>Symtoms</h2>
								<hr className='' />
								<div>
									 {item?.report?.medicationsMentioned.map((medication, index) => (
										<ul className=''>
											<li className='mx-8 list-disc list-inside'>{medication}</li>
										</ul>
										
									))} 
								</div>
							</div>
							<div className='mt-5'>
								<h2 className='font-bold text-purple-500 text-lg'>Symtoms</h2>
								<hr className='' />
								<div>
									 {item?.report?.recommendations.map((recommend, index) => (
										<ul className=''>
											<li className='mx-8 list-disc list-inside'>{recommend}</li>
										</ul>
										
									))} 
								</div>
							</div>
							<div className='mt-4'>
								<p><span className='font-bold text-orange-600'>AI Usage Disclosure:</span></p>
								<p> This document/content was created with assistance from AI tools. The content has been reviewed and edited by a human. While we strive for accuracy, users are advised to verify all critical information independently and exercise caution when relying on this content. </p>
							</div>
						</div>
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}

export default ViewreportDialog;
