import "dotenv/config";

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is missing in environment variables");
}

if (!process.env.MISTRAL_KEY) {
    throw new Error("MISTRAL_KEY is missing in environment variables");
}

export default {
    port: process.env.PORT || 3000,
    databaseUrl: process.env.DATABASE_URL,
    mistralKey: process.env.MISTRAL_KEY,
    frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173"
};