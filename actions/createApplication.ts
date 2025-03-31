'use server';

import { auth } from '@/auth';
import { Responses } from '@/lib/constants';
import prisma from '@/lib/db';

export async function userApplyFn(
  cvUrl: string,
  jobId: string,
  responses: Responses[]
) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: 'User not logged in.',
    };
  }

  if (!cvUrl) {
    return {
      error: 'User has not uploaded cv.',
    };
  }

  const job = await prisma.job.findUnique({
    where: {
      id: jobId,
    },
    select: {
      questions: true,
      id: true,
    },
  });

  if (!job) {
    return {
      error: 'Job does not exist.',
    };
  }

  if (job.questions.length > 0) {
    //basic check
    if (job.questions.length !== responses.length) {
      return {
        error: 'Questions not answered.',
      };
    }
    const applyUser = await prisma.application.create({
      data: {
        status: 'applied',
        answers: responses,
        applicant: {
          connect: {
            id: session.user.id,
          },
        },
        job: {
          connect: {
            id: job.id,
          },
        },
      },
    });

    if (!applyUser) {
      return {
        error: 'Something went wrong, try again.',
      };
    }

    return {
      success: 'Successfully sent application.',
    };
  } else {
    const applyUser = await prisma.application.create({
      data: {
        status: 'applied',
        answers: responses,
        applicant: {
          connect: {
            id: session.user.id,
          },
        },
        job: {
          connect: {
            id: job.id,
          },
        },
      },
    });

    if (!applyUser) {
      return {
        error: 'Something went wrong, try again.',
      };
    }

    return {
      success: 'Successfully sent application.',
    };
  }
}
