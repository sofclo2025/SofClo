import React from 'react';
import { Button } from '../ui/button';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface SignInOrUpFormProps {
  mode: 'signin' | 'signup';
  signInOptions: {
    google?: boolean;
  };
  className?: string;
}

export function SignInOrUpForm({ mode, signInOptions, className }: SignInOrUpFormProps) {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success('Signed in successfully with Google!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign in with Google');
    }
  };

  return (
    <div className={className}>
      {signInOptions.google && (
        <Button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="w-5 h-5 mr-2"
          />
          Continue with Google
        </Button>
      )}
    </div>
  );
}
