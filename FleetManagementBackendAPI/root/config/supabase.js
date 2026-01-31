import { createClient } from '@supabase/supabase-js';
require('dotenv').config();

const supabaseUrl=process.SUPABASE_URL;
const supabasekey=process.SUPABASE_KEY; 

if(!supabaseUrl || !supabasekey){
    console.error("Missing Supabase URL or Key in .env file")
}

const supabase=createClient(supabaseUrl,supabasekey)

