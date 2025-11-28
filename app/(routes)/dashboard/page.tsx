import { DrsAgentList } from './_components/DrsAgentList';
import { AddNewSessionDialog } from './_components/AddNewSessionDialog';
import { doctorAgent } from './_components/DrAgentCard';

function Dashboard({doctor}: {doctor:doctorAgent}) {
	return (
		<div>
			<div className='flex justify-between items-center'>
				<h2 className='font-bold text-2xl'>My Dashboard</h2>
				<AddNewSessionDialog selectedDr={doctor}/>
			</div>
			<DrsAgentList />
		</div>
	);
}

export default Dashboard;
