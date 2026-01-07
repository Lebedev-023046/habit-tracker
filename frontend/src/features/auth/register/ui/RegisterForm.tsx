import { PasswordField } from '@/features/auth/fields/PasswordField';
import { getApiErrorMessage } from '@/shared/api/getErrorMessage';
import { ROUTES } from '@/shared/config/routes';
import { AuthFormShell } from '@/shared/ui/auth-form-shell';
import { ErrorMessage } from '@/shared/ui/form-fields/error-message';
import { InputField } from '@/shared/ui/form-fields/RHF/input-field';
import { Typography } from '@/shared/ui/typography';
import { MdOutlineEmail } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { RegisterButton } from '../../controls/RegisterButton';
import { useRegisterForm } from '../model/useRegisterForm';

export function RegisterForm() {
  const { control, onSubmit, isPending, isError, error } = useRegisterForm();

  const hasError = isError;
  const errorText = getApiErrorMessage(error);

  return (
    <AuthFormShell
      title="Create account"
      onSubmit={onSubmit}
      controls={
        <>
          <RegisterButton isPending={isPending} />
          {/* <GoogleAuthButton />, */}
        </>
      }
      footer={<Footer />}
    >
      <InputField
        name="email"
        placeholder="email"
        leftIcon={<MdOutlineEmail size="2rem" />}
        autoComplete="email"
        control={control}
      />
      <PasswordField
        control={control}
        autoComplete="new-password"
        name="password"
      />
      <PasswordField
        control={control}
        autoComplete="current-password"
        name="confirmPassword"
        placeholder="confirm password"
      />

      <ErrorMessage isError={hasError} message={errorText} />
    </AuthFormShell>
  );
}

const Footer = () => {
  return (
    <Typography variant="captionMuted">
      Already have an account?{' '}
      <Link
        style={{ color: 'var(--text-color-primary)' }}
        to={ROUTES.auth.login()}
      >
        Log In
      </Link>
    </Typography>
  );
};
