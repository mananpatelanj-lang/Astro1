import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Check if we have auth fragments in the URL
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        const error = hashParams.get('error');

        if (error) {
          console.error('OAuth error:', error);
          navigate('/?error=auth_failed');
          return;
        }

        if (accessToken) {
          // Set the session from URL fragments
          const { data, error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken || ''
          });

          if (sessionError) {
            console.error('Session error:', sessionError);
            navigate('/?error=auth_failed');
            return;
          }

          if (data.session) {
            // Clear the URL hash
            window.history.replaceState({}, document.title, window.location.pathname);
            // Successfully authenticated, redirect to dashboard
            navigate('/dashboard');
            return;
          }
        }

        // Fallback: check current session
        const { data, error: getSessionError } = await supabase.auth.getSession();

        if (getSessionError) {
          console.error('Auth callback error:', getSessionError);
          navigate('/?error=auth_failed');
          return;
        }

        if (data.session) {
          navigate('/dashboard');
        } else {
          navigate('/');
        }
      } catch (err) {
        console.error('Unexpected auth callback error:', err);
        navigate('/?error=auth_failed');
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <p className="text-gray-600">Completing sign in...</p>
      </div>
    </div>
  );
};

export default AuthCallback;
