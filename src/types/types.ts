export interface Appointment {
    id: number
    name: string // dentist, business meeting
    date: DateModel
    requestor: UserModel // person who scheduled an apoointment
    invitee: UserModel
    requestor_reminder_periods: ReminderPeriod[] // When to remind a requestor
    invitee_reminder_periods: ReminderPeriod[] // When to remind an invitee
    timezone: TimezoneType
}

export interface DateModel {
    minute: number
    hour: number
    dayOfMonth: number
    month: number
}

export interface UserModel {
    name: string
    phoneNumber: string
}

// When to remind about the appointment (before 30 minutes, etc...)
export type ReminderPeriod = 'thirtyMins' | 'oneHour' | 'oneDay'
export const allAvailableRemindPeriods: ReminderPeriod[] = ['thirtyMins', 'oneHour', 'oneDay']

export type TimezoneType = 'Europe/London' | 'Asia/Almaty'
export const allTimezones: TimezoneType[] = ['Europe/London', 'Asia/Almaty']