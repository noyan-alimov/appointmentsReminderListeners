import { SupabaseRealtimePayload } from '@supabase/supabase-js'
import cron from 'node-cron'
import day, { Dayjs } from 'dayjs'

import { cronJobs } from '../timeouts'
import { definitions } from '../types/supabase'
import { Appointment, DateModel, ReminderPeriod } from '../types/types'
import { convertFromDateModelToJSDate, convertFromDayjsDateToDateModel } from '../utils'
import { sendSMS } from '../communicationChannels/sms'

export const handleInsertSubscription = (payload: SupabaseRealtimePayload<definitions['appointment']>) => {
    const appointment: Appointment = {
        ...payload.new,
        date: JSON.parse(payload.new.date),
        requestor: JSON.parse(payload.new.requestor),
        invitee: JSON.parse(payload.new.invitee)
    }

    const getDateModelsFromRemindPeriods = (remindPeriods: ReminderPeriod[]): DateModel[] => remindPeriods.map(getDateModelFromRemindPeriod)

    const getDateModelFromRemindPeriod = (remindPeriod: ReminderPeriod): DateModel => {
        const jsDate = convertFromDateModelToJSDate(appointment.date)
        const dayDate = day(jsDate)

        let result: Dayjs

        switch (remindPeriod) {
            case 'oneDay':
                result = dayDate.subtract(1, 'day')
                break
            case 'oneHour':
                result = dayDate.subtract(1, 'hour')
                break
            case 'thirtyMins':
                result = dayDate.subtract(30, 'minute')
                break
            default:
                // should not reach here
                result = dayDate
        }

        return convertFromDayjsDateToDateModel(result)
    }

    const createCronJob = (dateModel: DateModel, asyncCallback: () => Promise<void>) => {
        return cron.schedule(
            `${dateModel.minute} ${dateModel.hour} ${dateModel.dayOfMonth} ${dateModel.month} *`,
            asyncCallback,
            {
                scheduled: true,
                timezone: appointment.timezone
            }
        )
    }

    const inviteeDateModels = getDateModelsFromRemindPeriods(appointment.invitee_reminder_periods)
    const requestorDateModels = getDateModelsFromRemindPeriods(appointment.requestor_reminder_periods)

    const inviteeCronJobs = inviteeDateModels.map(dateModel => {
        return createCronJob(dateModel, () => {
            return sendSMS({
                message: `
                    Hi ${appointment.invitee.name}!
                    You have an appointment with ${appointment.requestor.name}
                    at ${day(convertFromDateModelToJSDate(appointment.date)).format('DD/MM/YYYY HH:mm')}.
                    Please don't forget :)
                `,
                to: appointment.invitee.phoneNumber
            })
        })
    })

    const requestorCronJobs = requestorDateModels.map(dateModel => {
        return createCronJob(dateModel, () => {
            return sendSMS({
                message: `
                    Hi ${appointment.requestor.name}!
                    You have an appointment with ${appointment.invitee.name}
                    at ${day(convertFromDateModelToJSDate(appointment.date)).format('DD/MM/YYYY HH:mm')}.
                    Please don't forget :)
                `,
                to: appointment.requestor.phoneNumber
            })
        })
    })

    cronJobs[appointment.id] = [...inviteeCronJobs, ...requestorCronJobs]
}