import { definitions } from './types/supabase'
import { supabase } from './supabaseClient'
import { handleInsertSubscription } from './handlers/insert'

supabase
  .from<definitions['appointment']>('appointment')
  .on('INSERT', payload => {
    console.log('Change received, insert!', payload)
  })
  .on('UPDATE', payload => {
    console.log('Change received!', payload)
  })
  .on('DELETE', payload => {
    console.log('Change received!', payload)
  })
  .subscribe()