import { Dayjs } from 'dayjs'
import { DateModel } from './types/types'

const formatDate = (value: number): string => {
    if (value < 10) return `0${value}`
    return value.toString()
}

export const convertFromDateModelToJSDate = (dateModel: DateModel): Date => {
    return new Date(`2022-${formatDate(dateModel.month)}-${formatDate(dateModel.dayOfMonth)}T${formatDate(dateModel.hour)}:${formatDate(dateModel.minute)}:00`)
}

export const convertFromDayjsDateToDateModel = (dayjsDate: Dayjs): DateModel => {
    const jsDate = dayjsDate.toDate()
    return {
        minute: jsDate.getMinutes(),
        hour: jsDate.getHours(),
        dayOfMonth: jsDate.getDate(),
        month: jsDate.getMonth() + 1
    }
}