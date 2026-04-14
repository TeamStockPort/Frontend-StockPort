import { supabase } from "@/lib/supabase";
import type { BacktestRequest, BacktestResult } from "@/_BacktestingPage/types/backtestFormType";

export interface SavedBacktest {
  id: string;
  user_id: string;
  title: string;
  request: BacktestRequest;
  result: BacktestResult;
  created_at: string;
}

export async function saveBacktestResult({
  title,
  request,
  result,
}: {
  title: string;
  request: BacktestRequest;
  result: BacktestResult;
}) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("로그인이 필요합니다.");

  const { data, error } = await supabase
    .from("backtest_results")
    .insert({
      user_id: user.id,
      title,
      request,
      result,
    })
    .select()
    .single();

  if (error) throw error;
  return data as SavedBacktest;
}

export async function getBacktestList() {
  const { data, error } = await supabase
    .from("backtest_results")
    .select("id, title, request, result, created_at")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as SavedBacktest[];
}

export async function getBacktestById(id: string) {
  const { data, error } = await supabase.from("backtest_results").select("*").eq("id", id).single();

  if (error) throw error;
  return data as SavedBacktest;
}

export async function deleteBacktest(id: string) {
  const { error } = await supabase.from("backtest_results").delete().eq("id", id);

  if (error) throw error;
}
