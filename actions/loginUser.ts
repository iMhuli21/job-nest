'use server';

import { InvalidLoginError, signIn } from '@/auth';
import { SignInType, signInSchema } from '@/lib/schemas';

export async function loginUserFn(values: SignInType) {
  const validate = signInSchema.safeParse(values);

  if (validate.error) {
    return {
      error: 'Invalid details sent.',
    };
  }

  const { email, password } = validate.data;

  try {
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    return {
      success: 'Successfully logged in.',
      url: res,
    };
  } catch (e) {
    if (e instanceof InvalidLoginError) {
      return {
        error: e.message,
      };
    }

    if (e instanceof Error) {
      return {
        error: e.message,
      };
    }
  }
}
