import axios from 'axios'
import { config } from '../config'

type BodyType = {
    message: string
    to: string
}

export const sendSMS = async (body: BodyType) => {
    try {
        await axios.post('https://api.sms.to/sms/send', body, {
            headers: {
                'Authorization': `Bearer ${config.SMS_API_SECRET}`,
                'Content-Type': 'application/json'
            }
        })
    } catch (error) {
        console.error(error)
    }
}