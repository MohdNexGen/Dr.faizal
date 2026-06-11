import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zqceoinkfmdwnycdfote.supabase.co";

const supabaseKey =
  "sb_publishable_yWk3sJxueDzfvaMAf_3qgg_76Siz_b7";

export const supabase = createClient(supabaseUrl, supabaseKey);