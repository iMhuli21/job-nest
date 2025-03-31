'use server';

import { auth } from '@/auth';
import prisma from '@/lib/db';
import { profileSchema, ProfileType } from '@/lib/schemas';

export async function updateProfileFn(
  values: ProfileType,
  fileUrl: string | null
) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: 'User is not logged in.',
    };
  }

  const validData = profileSchema.safeParse(values);

  if (validData.error) {
    return {
      error: 'Invalid data sent.',
    };
  }

  const { contactNumber, email, fullName, jobTitle } = validData.data;

  if (!fileUrl) {
    const updateProfile = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        contactNumber,
        email,
        fullName,
        jobTitle,
      },
    });

    if (!updateProfile) {
      return {
        error: 'Something went wrong.',
      };
    }

    return {
      success: 'Successfully updated profile.',
    };
  } else {
    const updateProfile = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        contactNumber,
        email,
        fullName,
        jobTitle,
        cvUrl: fileUrl,
      },
    });

    if (!updateProfile) {
      return {
        error: 'Something went wrong.',
      };
    }

    return {
      success: 'Successfully updated profile.',
    };
  }
}
