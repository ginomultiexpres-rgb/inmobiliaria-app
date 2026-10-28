import { supabase } from "@/lib/supabase";

export const mockContracts = async () => {
  const { data, error } = await supabase
    .from("contracts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching contracts:", error);
    return [];
  }

  return data || [];
};

export const getContractById = async (id: string) => {
  const { data, error } = await supabase
    .from("contracts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching contract:", error);
    return null;
  }

  return data;
};

export const createContract = async (contractData: any) => {
  const { data, error } = await supabase
    .from("contracts")
    .insert(contractData)
    .select()
    .single();

  if (error) {
    console.error("Error creating contract:", error);
    return null;
  }

  return data;
};
