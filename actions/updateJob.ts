'use server';

import { auth } from '@/auth';
import prisma from '@/lib/db';
import { createJobSchema, CreateJobType } from '@/lib/schemas';

export async function updateJobFn(
  jobId: string,
  values: CreateJobType,
  tags: string[],
  questions: string[]
) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: 'User not logged in.',
    };
  }

  const validate = createJobSchema.safeParse(values);

  if (validate.error) {
    return {
      error: 'Invalid data sent.',
    };
  }

  if (!tags || tags.length === 0) {
    return {
      error: 'No tags were given for the job.',
    };
  }

  const {
    aboutCompany,
    closeDate,
    company,
    contract,
    description,
    experienceLevel,
    industry,
    location,
    rolesAndResponsibilities,
    salary,
    title,
  } = validate.data;

  //find out if the user that is logged has an account
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

  const newJob = await prisma.job.update({
    where: {
      authorId: user.id,
      id: jobId,
    },
    data: {
      aboutCompany,
      closeDate,
      company,
      contract,
      description,
      experienceLevel,
      industry,
      location,
      rolesAndResponsibilities,
      salary,
      title,
      tags,
      questions,
    },
  });

  if (!newJob) {
    return {
      error: 'Something went wrong try again.',
    };
  }

  return {
    success: 'Successfully updated job post.',
  };
}
