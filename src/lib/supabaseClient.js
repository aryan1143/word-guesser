import {createClient} from '@supabase/supabase-js'

const supabaseurl = import.meta.env.VITE_SUPABASE_URL;
const supabaseanonkey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseurl, supabaseanonkey);