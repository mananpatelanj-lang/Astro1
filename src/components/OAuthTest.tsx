import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export function OAuthTest() {
  const [testResult, setTestResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testGoogleOAuth = async () => {
    setLoading(true);
    setTestResult('Testing Google OAuth...\n');
    
    try {
      console.log('=== OAUTH TEST START ===');
      
      // Test 1: Check Supabase connection
      setTestResult(prev => prev + 'Test 1: Checking Supabase connection...\n');
      const { data: session } = await supabase.auth.getSession();
      setTestResult(prev => prev + `✓ Supabase connected. Session: ${session ? 'exists' : 'none'}\n`);
      
      // Test 2: Get current URL details
      setTestResult(prev => prev + 'Test 2: Current URL details...\n');
      setTestResult(prev => prev + `Origin: ${window.location.origin}\n`);
      setTestResult(prev => prev + `Full URL: ${window.location.href}\n`);
      
      // Test 3: Try Google OAuth
      setTestResult(prev => prev + 'Test 3: Attempting Google OAuth...\n');
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });
      
      if (error) {
        setTestResult(prev => prev + `❌ OAuth Error: ${error.message}\n`);
        setTestResult(prev => prev + `Error details: ${JSON.stringify(error, null, 2)}\n`);
      } else {
        setTestResult(prev => prev + `✓ OAuth initiated successfully\n`);
        setTestResult(prev => prev + `Data: ${JSON.stringify(data, null, 2)}\n`);
      }
      
    } catch (err: any) {
      setTestResult(prev => prev + `❌ Test failed: ${err.message}\n`);
      console.error('OAuth test error:', err);
    } finally {
      setLoading(false);
    }
  };

  const testSimpleOAuth = async () => {
    setLoading(true);
    try {
      setTestResult('Testing simple OAuth (no redirect)...\n');
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google'
      });
      
      if (error) {
        setTestResult(prev => prev + `❌ Simple OAuth Error: ${error.message}\n`);
      } else {
        setTestResult(prev => prev + `✓ Simple OAuth initiated\n`);
      }
    } catch (err: any) {
      setTestResult(prev => prev + `❌ Simple OAuth failed: ${err.message}\n`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-gray-50 border rounded-lg">
      <h3 className="font-bold mb-4">OAuth Debug Tool</h3>
      
      <div className="space-y-2 mb-4">
        <button 
          onClick={testGoogleOAuth}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? 'Testing...' : 'Test Google OAuth (Full)'}
        </button>
        
        <button 
          onClick={testSimpleOAuth}
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-gray-400 ml-2"
        >
          {loading ? 'Testing...' : 'Test Simple OAuth'}
        </button>
      </div>
      
      {testResult && (
        <div className="bg-black text-green-400 p-4 rounded font-mono text-sm whitespace-pre-wrap max-h-96 overflow-y-auto">
          {testResult}
        </div>
      )}
    </div>
  );
}
