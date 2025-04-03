'use server';

import prisma from '@/lib/db';
import bcrypt from 'bcryptjs';
import { auth, signOut } from '@/auth';
import { accountSchema, AccountType } from '@/lib/schemas';

export async function changePasswordFn(values: AccountType) {
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
  });

  if (!user) {
    return {
      error: 'User does not exist.',
    };
  }

  const validate = accountSchema.safeParse(values);

  if (validate.error) {
    return {
      error: 'Invalid details sent.',
    };
  }

  const { password } = validate.data;

  const hashPassword = await bcrypt.hash(password, 10);

  const updateUser = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: hashPassword,
    },
  });

  if (!updateUser) {
    return {
      error: 'Something went wrong try again.',
    };
  }
  ///Sign out the user

  await signOut({
    redirectTo: '/sign-in',
  });

  return {
    success: 'Successfully updated password. Log back in to resume the search.',
  };
}
