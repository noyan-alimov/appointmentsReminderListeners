import { cronJobs } from '../timeouts'
import { definitions } from '../types/supabase'
import { Appointment } from '../types/types'


export const handleDeleteAppointment = (record: definitions['appointment']) => {
    const appointment: Appointment = {
        ...record,
        date: JSON.parse(record.date),
        requestor: JSON.parse(record.requestor),
        invitee: JSON.parse(record.invitee)
    }

    const schedulers = cronJobs[appointment.id] as any[]
    if (!schedulers) return

    schedulers.forEach(scheduler => {
        scheduler.stop()
    })

    delete cronJobs[appointment.id]
}