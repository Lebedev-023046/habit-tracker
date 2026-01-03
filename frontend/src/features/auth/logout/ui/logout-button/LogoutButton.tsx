import { useLogout } from '@/features/auth/hooks/useLogout';
import { Button } from '@/shared/ui/button';

export function LogoutButton() {
  const { logout, isPending } = useLogout();

  const handleLogout = () => logout();

  return (
    <Button variant="plain" disabled={isPending} onClick={handleLogout}>
      Logout
    </Button>
  );
}
