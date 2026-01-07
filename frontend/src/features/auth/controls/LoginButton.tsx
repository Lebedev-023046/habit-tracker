import { Button } from '@/shared/ui/button';
import { IoIosLogIn } from 'react-icons/io';

export function LoginButton({ isPending }: { isPending: boolean }) {
  return (
    <Button
      disabled={isPending}
      type="submit"
      align="center"
      borderRadius="0.5rem"
    >
      <IoIosLogIn size="2rem" /> Log In
    </Button>
  );
}
