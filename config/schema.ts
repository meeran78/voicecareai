import { integer, pgTable, varchar, text, json } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	name: varchar({ length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull().unique(),
	credits: integer(),
});

export const SessionChatTable = pgTable('sessionChat', {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	sessionId: varchar().notNull(),
	notes: text(),
  selectedDr : json(),
	conversation: json(),
	report: json(),
	createBy: varchar().references(() => usersTable.email),

	createdOn: varchar(),
});
