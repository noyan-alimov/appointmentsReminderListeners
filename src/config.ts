import dotenv from 'dotenv'
dotenv.config()

export const config = {
    SUPABASE_SECRET: process.env.SUPABASE_SECRET as string,
    SUPABASE_URL: process.env.SUPABASE_URL as string,
    SMS_API_SECRET: process.env.SMS_API_SECRET as string
}