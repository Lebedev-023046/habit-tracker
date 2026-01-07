import { Button } from '@/shared/ui/button';
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc';
import { useGoogleAuth } from '../hooks/useGoogleAuth';

export function GoogleAuthButton() {
  const { googleAuth, isPending } = useGoogleAuth();
  const login = useGoogleLogin({
    onSuccess: res => {
      const accessToken = res?.access_token ?? '';
      googleAuth({ accessToken });
    },
  });

  return (
    <Button
      align="center"
      disabled={isPending}
      variant="outlined"
      onClick={() => login()}
    >
      <FcGoogle /> Continue with Google
    </Button>
  );
}
