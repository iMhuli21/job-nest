'use server';

import { auth } from '@/auth';
import prisma from '@/lib/db';

export async function updateAvatarFn(imageUrl: string) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: 'User not logged in.',
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      id: true,
    },
  });

  if (!user) {
    return {
      error: 'User does not exist.',
    };
  }

  const avatar = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      avatarUrl: imageUrl,
    },
  });

  if (!avatar) {
    return {
      error: 'Something went wrong try again.',
    };
  }

  return {
    success: 'Successfully updated avatar.',
  };
}
