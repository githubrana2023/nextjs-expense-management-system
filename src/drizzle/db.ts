import 'dotenv/config'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import * as schema from './schema'

// Disable prefetch as it is not supported for "Transaction" pool mode 
const client = postgres(process.env.LOCAL_DATABASE_URL!)
export const db = drizzle({ client, schema });

