import { usersTable } from '@/config/schema';
import { currentUser } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import {db} from '@/config/db';

export async function POST(request: NextRequest) {
	const user = await currentUser();
	try {
		//If user already exists
		const users = await db
			.select()
			.from(usersTable)
			//@ts-ignore
			.where(eq(usersTable.email, user?.primaryEmailAddress?.emailAddress));

		if (users.length > 0) {
			return NextResponse.json(users[0]);
		} else {
			//Create new user
            console.log('Inside create new user');
			const result = await db
				.insert(usersTable)
				.values({
					//@ts-ignore

					name: user?.fullName,
					email: user?.primaryEmailAddress?.emailAddress,

					credits: 10,
				})
				//@ts-ignore
				.returning({ usersTable });
			return NextResponse.json(result[0].usersTable);
		}

		//Create new user
	} catch (e) {
		return NextResponse.json(e);
	}
}
