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
	console.log(item);
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
											Consulted On: {new Date(item.createdOn).toDateString()}
										</h2>
									</div>
									<div>
										<h2>
											<span className='font-bold'>User:</span>{' '}
											{item.report?.user}
										</h2>
										<h2>Agent: {item.agent}</h2>
									</div>
								</div>
							</div>
							<div className='mt-5'>
								<h2 className='font-bold text-purple-500 text-lg'>Complaint</h2>
								<hr className='' />
								<div>
									<p> {item.report?.complaint} User reports sharp back pain</p>
								</div>
							</div>
						</div>
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}

export default ViewreportDialog;
