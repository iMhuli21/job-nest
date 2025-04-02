'use server';

import { auth } from '@/auth';
import prisma from '@/lib/db';
import { Status } from '@prisma/client';

export async function changeStatusFn(applicationId: string, value: Status) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: 'User not logged in.',
    };
  }

  const application = await prisma.application.findUnique({
    where: {
      id: applicationId,
    },
  });

  if (!application) {
    return {
      error: 'Application does not exist.',
    };
  }

  const updateApplication = await prisma.application.update({
    where: {
      id: application.id,
    },
    data: {
      status: value,
    },
  });

  if (!updateApplication) {
    return {
      error: 'Something went wrong try again.',
    };
  }

  return {
    success: 'Successfully updated status.',
  };
}
