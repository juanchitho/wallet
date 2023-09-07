import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://iqjkzfimjvoziricyweg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlxamt6ZmltanZvemlyaWN5d2VnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM5MTk4MTEsImV4cCI6MjAwOTQ5NTgxMX0.JaOowN6Q4FNfG9KlilJYjrsvyPK7G7V8-H2RiIhlWgQ';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
