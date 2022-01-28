import { definitions } from '../types/supabase'
import { handleDeleteAppointment } from './delete'
import { handleInsertAppointment } from './insert'


export const handleUpdateAppointment = (record: definitions['appointment']) => {
    handleDeleteAppointment(record)
    handleInsertAppointment(record)
}