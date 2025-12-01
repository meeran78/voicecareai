import { NextResponse } from 'next/server';
import { openai } from '@/config/OpenAiModel';
import { json } from 'stream/consumers';
import { db } from '@/config/db';
import { eq } from 'drizzle-orm';
import { SessionChatTable } from '@/config/schema';
export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
}
const REPORT_GEN_PROMPT = `You are an AI Medical Voice Agent that just finished a voice conversation with a user. 

Based on the Depends on doctor AI agent info and coversation between AI medical agent and user. 
Please generate a structured report with the following fields:

1. sessionId: a unique session identifier
2. agent: the medical specialist name (e.g., "General Physician AI")
3. user: name of the patient or "Anonymous" if not provided
4. timestamp: current date and time in ISO format
5. chiefComplaint: one-sentence summary of the main health concern
6. summary: a 2-3 sentence summary of the conversation, symptoms, and recommendations
7. symptoms: list of symptoms mentioned by the user
8. duration: how long the user has experienced the symptoms
9. severity: mild, moderate, or severe
10. medicationsMentioned: list of any medicines mentioned
11. recommendations: list of AI suggestions (e.g., rest, see a doctor)
Return the result in this JSON format:
{
 "sessionId": "string",
 "agent": "string",
 "user": "string",
 "timestamp": "ISO Date string",
 "chiefComplaint": "string",
 "summary": "string",
 "symptoms": ["symptom1", "symptom2"],
 "duration": "string",
 "severity": "string",
 "medicationsMentioned": ["med1", "med2"],
 "recommendations": ["rec1", "rec2"],


Only include valid fields. Respond with nothing else.}

`;
export async function POST(request: Request) {
	const { sessionId, sessionInfo, messages } = await request.json();
	//console.log(sessionId, sessionInfo, messages);
	try {
		const UserInput =
			'AI Agent Doctor Info: ' +
			JSON.stringify(sessionInfo) +
			', Coversation:' +
			JSON.stringify(messages);

		const completion = await openai.chat.completions.create({
			model: 'google/gemini-2.5-flash-lite-preview-09-2025',
			messages: [
				// { role: 'system', content: 'You are a helpful assistant.' },

				{ role: 'system', content: REPORT_GEN_PROMPT },
				{
					role: 'user',
					content: UserInput,
				},
			],
		});
		const rawResp = completion.choices[0].message;
		//@ts-ignore
		const resp = rawResp.content
			.trim()
			.replace('```json', '')
			.replace('```', '');

		//console.log(resp);

		//Save to Database
		const result = await db
			.update(SessionChatTable)
			.set({
				report: resp,
				conversation: messages,
			})
			.where(eq(SessionChatTable.sessionId, sessionId));
		//console.log(result);
		return NextResponse.json(JSON.parse(resp));
	} catch (e) {
		console.log(e);
		return NextResponse.json(e);
	}
}
