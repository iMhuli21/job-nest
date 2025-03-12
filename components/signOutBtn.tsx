'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { signOutUserFn } from '@/actions/signOutUser';

export default function SignOutBtn() {
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    await signOutUserFn();
    setLoading(false);
  };
  return (
    <Button
      disabled={loading}
      variant={'ghost'}
      className='w-full'
      onClick={handleSignOut}
    >
      Sign Out
    </Button>
  );
}
