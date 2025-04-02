'use server';

import { auth, signOut } from '@/auth';
import prisma from '@/lib/db';

export async function deleteAccFn() {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: 'User not logged in.',
    };
  }

  const user = await prisma.user.delete({
    where: {
      id: session.user.id,
    },
  });

  if (!user) {
    return {
      error: 'Something went wrong try again.',
    };
  }

  await signOut({
    redirectTo: '/',
  });

  return {
    success: 'Successfully deleted account.',
  };
}
