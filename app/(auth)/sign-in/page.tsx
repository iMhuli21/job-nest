'use client';

import Link from 'next/link';
import {
  Form,
  FormControl,
  FormField,
  FormMessage,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema, SignInType } from '@/lib/schemas';

export default function SignIn() {
  const form = useForm<SignInType>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
    resolver: zodResolver(signInSchema),
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  const handleSignInAcc = async (values: SignInType) => {
    console.log(values);
  };
  return (
    <main className='px-4 font-[family-name:var(--font-nunito)] space-y-10 py-5 min-h-dvh flex items-center justify-center'>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(handleSignInAcc)}
          className='max-w-[700px] w-full mx-auto space-y-6'
        >
          <div className='flex flex-col items-start gap-2'>
            <h1 className='text-4xl font-[family-name:var(--font-bebas_neue)]'>
              Log In
            </h1>
            <div className='flex items-center gap-2 tracking-tight'>
              <span>Don&apos;t have account?</span>
              <Link href='/sign-up' className='underline'>
                Sign Up
              </Link>
            </div>
          </div>

          <FormField
            name='email'
            control={control}
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type='email'
                    placeholder='Enter Your Email'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name='password'
            control={control}
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='Enter Your Password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='w-fit ml-auto'>
            <Button
              type='submit'
              disabled={isSubmitting}
              variant='yellow'
              className='font-semibold'
            >
              Log In
            </Button>
          </div>
        </form>
      </Form>
    </main>
  );
}
