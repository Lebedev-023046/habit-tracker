import { GoogleOAuthProvider } from '@react-oauth/google';
import { type PropsWithChildren } from 'react';

export default function GoogleAuthProvider({ children }: PropsWithChildren) {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  return (
    <GoogleOAuthProvider clientId={clientId}>{children}</GoogleOAuthProvider>
  );
}
