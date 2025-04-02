'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { signOutUserFn } from '@/actions/signOutUser';
import { Loader2 } from 'lucide-react';

export default function SignOutBtn() {
  const route = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    await signOutUserFn();
    setLoading(false);

    route.refresh();
  };
  return (
    <Button
      disabled={loading}
      variant={'ghost'}
      className='w-full flex items-center justify-start gap-2 text-left pl-2'
      onClick={handleSignOut}
    >
      {loading && <Loader2 className='loader' />}
      Sign Out
    </Button>
  );
}
