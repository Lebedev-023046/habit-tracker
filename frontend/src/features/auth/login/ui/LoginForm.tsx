import { PasswordField } from '@/features/auth/fields/PasswordField';
import { ROUTES } from '@/shared/config/routes';
import { AuthFormShell } from '@/shared/ui/auth-form-shell';
import { InputField } from '@/shared/ui/form-fields/RHF/input-field';
import { Typography } from '@/shared/ui/typography';
import { MdOutlineEmail } from 'react-icons/md';
import { useLoginForm } from '../model/useLoginForm';

import { getApiErrorMessage } from '@/shared/api/getErrorMessage';
import { ErrorMessage } from '@/shared/ui/form-fields/error-message';
import { Link } from 'react-router-dom';

import { LoginButton } from '../../controls/LoginButton';

export function LoginForm() {
  const { control, isPending, error, isError, onSubmit } = useLoginForm();

  const hasError = isError;
  const errorText = getApiErrorMessage(error);

  return (
    <AuthFormShell
      title="Sign in"
      onSubmit={onSubmit}
      controls={
        <>
          <LoginButton isPending={isPending} />
          {/* <GoogleAuthButton /> */}
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
        name="password"
        autoComplete="new-password"
      />

      <ErrorMessage isError={hasError} message={errorText} />
    </AuthFormShell>
  );
}

const Footer = () => {
  return (
    <Typography variant="captionMuted">
      Don't have an account?{' '}
      <Link
        style={{ color: 'var(--text-color-primary)' }}
        to={ROUTES.auth.register()}
      >
        Sign up
      </Link>
    </Typography>
  );
};
