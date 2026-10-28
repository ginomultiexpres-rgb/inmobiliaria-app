import { supabase } from "@/lib/supabase";

export const mockProperties = async () => {
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching properties:", error);
    return [];
  }

  return data || [];
};

export const getPropertyById = async (id: string) => {
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching property:", error);
    return null;
  }

  return data;
};

export const mockPropertyImages = async (propertyId: string) => {
  const { data, error } = await supabase
    .from("property_images")
    .select("*")
    .eq("property_id", propertyId);

  if (error) {
    console.error("Error fetching property images:", error);
    return [];
  }

  return data || [];
};
