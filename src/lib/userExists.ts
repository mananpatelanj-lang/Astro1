import { supabase } from '@/integrations/supabase/client';

/**
 * Check if a user already exists with the given email
 * @param email - Email to check
 * @returns Promise<{exists: boolean, provider?: string}>
 */
export async function checkUserExists(email: string): Promise<{exists: boolean, provider?: string}> {
  try {
    // Try to get user info by checking auth.users table
    const { data, error } = await supabase.rpc('check_user_exists', {
      email_address: email.toLowerCase()
    });

    if (error) {
      console.error('Error checking user existence:', error);
      return { exists: false };
    }

    return data || { exists: false };
  } catch (error) {
    console.error('Error in checkUserExists:', error);
    return { exists: false };
  }
}
