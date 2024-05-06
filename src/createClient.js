import { createClient } from "@supabase/supabase-js";


export const connection = createClient(
  "https://ohcytqpzpksmwkyllyuz.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oY3l0cXB6cGtzbXdreWxseXV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ5OTE4OTksImV4cCI6MjAzMDU2Nzg5OX0.NNNDnxtINY5NpnmY3ryaUnj0-d4MaD5CUEWgp1gdDbQ"
);