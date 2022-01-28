import dotenv from 'dotenv'
dotenv.config()

export const config = {
    PORT: process.env.PORT as string,
    SMS_API_SECRET: process.env.SMS_API_SECRET as string
}