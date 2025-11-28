import React, { useState } from 'react';
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { SessionDetail } from '../care-agent/[sessionId]/page';
import moment from 'moment';

import ViewreportDialog from './ViewreportDialog';
type Props = {
	historyList: SessionDetail[];
};

function HistoryListview({ historyList }: Props) {
	return (
		<div>
			<Table>
				<TableCaption>Consultation Report</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className='w-[300px]'>AI Medical Spcialist</TableHead>
						<TableHead className='w-[500px]'>Description</TableHead>
						<TableHead>Date</TableHead>
						<TableHead className='text-right'>Action</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{historyList.map((item, index) => (
						<TableRow key={index}>
							<TableCell className='font-medium'>
								{item.selectedDr.specialist}
							</TableCell>
							<TableCell>{item.notes}</TableCell>
							<TableCell>{moment(new Date(item.createdOn)).fromNow()}</TableCell>
							<TableCell className='text-right'>
								<ViewreportDialog item={item} />
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}

export default HistoryListview;
