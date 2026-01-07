import { LoginForm } from '@/features/auth/login/ui/LoginForm';
import AuthLayout from '../AuthLayout';

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
