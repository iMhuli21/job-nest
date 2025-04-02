'use server';

import { auth } from '@/auth';
import prisma from '@/lib/db';

export async function deleteJobFn(id: string) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: 'User not logged in.',
    };
  }

  const job = await prisma.job.delete({
    where: {
      id,
      authorId: session.user.id,
    },
  });

  if (!job) {
    return {
      error: 'Something went wrong try again.',
    };
  }

  return {
    success: 'Successfully deleted job.',
  };
}
