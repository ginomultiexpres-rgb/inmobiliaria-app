// Supabase client configuration
// Copy this to .env and fill in your actual values

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || "https://cgscbiqhzmsfmxieschl.supabase.co";
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || "your_anon_key_here";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;


export { supabase };