'use server';

import { signOut } from '@/auth';

export async function signOutUserFn() {
  await signOut({
    redirectTo: '/',
  });
}
