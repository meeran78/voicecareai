import { SessionChatTable } from '@/config/schema';
import { currentUser } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/config/db';
import { v4 as uuid } from 'uuid';

export async function POST(request: NextRequest) {
	const { notes, selectedDr } = await request.json();
	const user = await currentUser();

	try {
		const sessionId = uuid();
		const result = await db
			.insert(SessionChatTable)
			.values({
				sessionId: sessionId,
				createBy: user?.primaryEmailAddress?.emailAddress,
				notes: notes,
				selectedDr: selectedDr,
				createdOn: new Date().toString(),
			}) //@ts-ignore
			.returning({ SessionChatTable });
		return NextResponse.json(result[0].SessionChatTable);
	} catch (e) {
		NextResponse.json(e);
	}
}

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const sessionId = searchParams.get('sessionId');
	console.log(sessionId);
	const user = await currentUser();
	if (sessionId != 'all') {
		const result = await db.select().from(SessionChatTable)
		//@ts-ignore
		.where(eq(SessionChatTable.sessionId, sessionId))
		.orderBy(SessionChatTable.id);
		return NextResponse.json(result[0]);
	} else {
		const result = await db.select().from(SessionChatTable)
		//@ts-ignore
		.where(eq(SessionChatTable.createBy, user?.primaryEmailAddress?.emailAddress));
		return NextResponse.json(result)
	}
	const result = await db
		.select()
		.from(SessionChatTable)
		//@ts-ignore
		.where(eq(SessionChatTable.sessionId, sessionId));
	return NextResponse.json(result[0]);
}
