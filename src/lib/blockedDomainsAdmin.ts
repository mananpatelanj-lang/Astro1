import { supabase } from '@/integrations/supabase/client';

export interface BlockedDomain {
  id: string;
  domain: string;
  reason: string;
  created_at: string;
  updated_at: string;
}

/**
 * Get all blocked email domains
 * @returns Promise<BlockedDomain[]>
 */
export async function getBlockedDomains(): Promise<BlockedDomain[]> {
  const { data, error } = await supabase
    .from('blocked_email_domains')
    .select('*')
    .order('domain', { ascending: true });

  if (error) {
    console.error('Error fetching blocked domains:', error);
    throw new Error('Failed to fetch blocked domains');
  }

  return data || [];
}

/**
 * Add a new blocked email domain
 * @param domain - The domain to block
 * @param reason - Reason for blocking
 * @returns Promise<BlockedDomain>
 */
export async function addBlockedDomain(domain: string, reason: string = 'Temporary email provider'): Promise<BlockedDomain> {
  const { data, error } = await supabase
    .from('blocked_email_domains')
    .insert({
      domain: domain.toLowerCase(),
      reason
    })
    .select()
    .single();

  if (error) {
    console.error('Error adding blocked domain:', error);
    throw new Error('Failed to add blocked domain');
  }

  return data;
}

/**
 * Remove a blocked email domain
 * @param id - The ID of the domain to remove
 * @returns Promise<void>
 */
export async function removeBlockedDomain(id: string): Promise<void> {
  const { error } = await supabase
    .from('blocked_email_domains')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error removing blocked domain:', error);
    throw new Error('Failed to remove blocked domain');
  }
}

/**
 * Update a blocked email domain
 * @param id - The ID of the domain to update
 * @param updates - The updates to apply
 * @returns Promise<BlockedDomain>
 */
export async function updateBlockedDomain(
  id: string, 
  updates: { domain?: string; reason?: string }
): Promise<BlockedDomain> {
  const { data, error } = await supabase
    .from('blocked_email_domains')
    .update({
      ...updates,
      domain: updates.domain?.toLowerCase(),
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating blocked domain:', error);
    throw new Error('Failed to update blocked domain');
  }

  return data;
}
