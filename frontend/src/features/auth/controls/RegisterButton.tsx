import { Button } from '@/shared/ui/button';

import { LuUserPlus } from 'react-icons/lu';

export function RegisterButton({ isPending }: { isPending: boolean }) {
  return (
    <Button
      disabled={isPending}
      type="submit"
      align="center"
      borderRadius="0.5rem"
    >
      <LuUserPlus size="2rem" /> Register
    </Button>
  );
}
