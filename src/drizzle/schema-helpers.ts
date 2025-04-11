import { timestamp } from "drizzle-orm/pg-core";


export const createdAt = timestamp('created_at', { withTimezone: true }).notNull().defaultNow()

export const updatedAt = timestamp('updated_at', { withTimezone: true }).notNull().$defaultFn(() => new Date())
export const trxNameVariant = ['SOURCE', 'RECEIVE', 'BOTH'] as const