'use server';

import prisma from '@/lib/db';
import bcrypt from 'bcryptjs';
import { SignUpType, signUpSchema } from '@/lib/schemas';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export async function createAccountFn(values: SignUpType) {
  const validate = signUpSchema.safeParse(values);

  if (validate.error) {
    return {
      error: 'Invalid details sent.',
    };
  }

  try {
    const { contactNumber, email, firstName, jobTitle, lastName, password } =
      validate.data;

    const fullName = `${firstName} ${lastName}`;

    const avatarUrl =
      'https://pc92dhkjxi.ufs.sh/f/8NNLpGsaQ1Rnn6MtQqGFXOqRy2JzGkamM4vwBogPhYEb6Z5N';

    const hashPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        contactNumber,
        email,
        fullName,
        jobTitle,
        password: hashPassword,
        avatarUrl,
      },
    });
    return {
      success: 'Successfully created your account.',
    };
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        return {
          error: 'Email already exists.',
        };
      }
    }

    if (e instanceof Error) {
      return {
        error: e.message,
      };
    }
  }
}
