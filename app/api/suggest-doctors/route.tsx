import { openai } from '@/config/OpenAiModel';
import { AIDoctorsList } from '@/shared/drsdetails';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	const { notes, selectedDr } = await request.json();
	//console.log(notes);
	//console.log(selectedDr);


	try {
		const completion = await openai.chat.completions.create({
			model: 'google/gemini-2.5-flash-lite-preview-09-2025',
			messages: [
				// { role: 'system', content: 'You are a helpful assistant.' },

				{ role: 'system', content: selectedDr ? JSON.stringify(selectedDr) : JSON.stringify(AIDoctorsList) },
				{
					role: 'user',
					content:
						'User Notes/Symptoms:' +
						notes +
						', Depends on user notes and symptoms, please suggest list of doctors, return objects in json only',
				},
			],
		});
        const rawResp = completion.choices[0].message;
        //@ts-ignore
        const resp = rawResp.content.trim().replace('```json', '').replace('```', '');
      
        //console.log(resp);
	
		return NextResponse.json(JSON.parse(resp));
	} catch (e) {
		console.log(e);
		return NextResponse.json(e);
	}
}
