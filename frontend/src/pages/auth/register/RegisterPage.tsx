import { RegisterForm } from '@/features/auth/register/ui/RegisterForm';
import AuthLayout from '../AuthLayout';

export default function RegisterPage() {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
}
