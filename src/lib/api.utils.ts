import axios from "axios";
import { supabase } from "../supabaseClient";


export const getAuthHeaders = async (contentType: 'json' | 'form-data' = 'json'): Promise<Record<string, string>> => {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session?.access_token) {
    throw new Error('No authentication token available');
  }

  const headers: Record<string, string> = {
    'Authorization': `Bearer ${session.access_token}`
  };

  if (contentType === 'json') {
    headers['Content-Type'] = 'application/json';
  } else if (contentType === 'form-data') {
    // Let browser set Content-Type with boundary for FormData
  }

  return headers;
};

export const handleApiError = async (error: unknown, operation: string): Promise<never> => {
  console.error(`Error ${operation}:`, error);
  
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 401) {
      throw new Error('Authentication failed - please login again');
    }
    if (error.response?.status === 403) {
      throw new Error('You do not have permission to perform this action');
    }
  }
  
  throw error;
};