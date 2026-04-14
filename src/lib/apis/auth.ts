import { supabase } from "@/lib/supabase";

export async function signUp({ email, password }: { email: string; password: string }) {
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) throw error;

  return data;
}

export async function signIn({ email, password }: { email: string; password: string }) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) throw error;

  return data;
}

export async function signInWithGitHub() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: window.location.origin,
    },
  });

  if (error) throw error;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) throw error;
}
