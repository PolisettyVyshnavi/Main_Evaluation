import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv'
import { table } from 'node:console';
dotenv.config();

const supabaseUrl=process.SUPABASE_URL;
const supabasekey=process.SUPABASE_KEY; 

if(!supabaseUrl || !supabasekey){
    console.error("Missing Supabase URL or Key in .env file")
}

export const from=(tableName)=>
    supabase.from(tableName)

