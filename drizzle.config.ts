import 'dotenv/config'
import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: "./src/drizzle/schema.ts",
    out: process.env.NODE_ENV === 'development' ? "./src/drizzle/local-migration" : "./src/drizzle/migration",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.LOCAL_DATABASE_URL!
    }
});

