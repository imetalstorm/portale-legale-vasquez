import { createClient }
from '@supabase/supabase-js'

const supabaseUrl =
'https://xtlgpfmlrwrdcupsncjl.supabase.co'

const supabaseKey =
'sb_publishable_6GPDYW8rBHXfuB6Fl27z8A_wiRuiOHh'

export const supabase =
createClient(
  supabaseUrl,
  supabaseKey
)