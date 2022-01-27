import { definitions } from './types/supabase'
import { supabase } from './supabaseClient'
import { handleInsertSubscription } from './handlers/insert'

supabase
  .from<definitions['appointment']>('appointment')
  .on('INSERT', handleInsertSubscription)
  .subscribe()

supabase
  .from<definitions['appointment']>('appointment')
  .on('UPDATE', payload => {
    console.log('Change received!', payload)
  })
  .subscribe()

supabase
  .from<definitions['appointment']>('appointment')
  .on('DELETE', payload => {
    console.log('Change received!', payload)
  })
  .subscribe()