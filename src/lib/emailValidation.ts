import { supabase } from '@/integrations/supabase/client';

/**
 * Check if an email domain is blocked (temporary email provider)
 * @param email - The email address to check
 * @returns Promise<boolean> - true if blocked, false if allowed
 */
export async function isEmailDomainBlocked(email: string): Promise<boolean> {
  try {
    const { data, error } = await supabase.rpc('is_email_domain_blocked', {
      email_address: email
    });

    if (error) {
      console.error('Error checking blocked email domains:', error);
      // In case of error, allow the email (fail open)
      return false;
    }

    return data === true;
  } catch (error) {
    console.error('Error in email domain validation:', error);
    // In case of error, allow the email (fail open)
    return false;
  }
}

/**
 * Validate email format and check for blocked domains
 * @param email - The email address to validate
 * @returns Promise<{isValid: boolean, error?: string}>
 */
export async function validateEmail(email: string): Promise<{isValid: boolean, error?: string}> {
  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email) {
    return { isValid: false, error: 'Email is required' };
  }

  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }

  // Check for blocked domains
  const isBlocked = await isEmailDomainBlocked(email);
  
  if (isBlocked) {
    return { 
      isValid: false, 
      error: 'Temporary email addresses are not allowed. Please use a permanent email address.' 
    };
  }

  return { isValid: true };
}

/**
 * Extract domain from email address
 * @param email - The email address
 * @returns string - The domain part of the email
 */
export function extractEmailDomain(email: string): string {
  return email.split('@')[1]?.toLowerCase() || '';
}
