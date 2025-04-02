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
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { loginUserFn } from '@/actions/loginUser';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema, SignInType } from '@/lib/schemas';
import { Loader2 } from 'lucide-react';

export default function SignIn() {
  const route = useRouter();
  const search = useSearchParams();

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
    try {
      const res = await loginUserFn(values);

      if (res?.error) {
        return toast.error('Error', {
          description: res.error,
          className: 'font-[family-name:var(--font-nunito)]',
        });
      } else if (res?.success) {
        toast.success('Success', {
          description: res.success,
          className: 'font-[family-name:var(--font-nunito)]',
        });

        const redirectUrl = search.get('returnUrl') as string;

        if (redirectUrl) {
          return route.push(`${decodeURIComponent(redirectUrl)}`);
        }

        return route.push('/jobs');
      }
    } catch (e) {
      if (e instanceof Error) {
        toast.error('Error', {
          description: e.message,
          className: 'font-[family-name:var(--font-nunito)]',
        });
      }
    }
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
              {isSubmitting && <Loader2 className='loader' />}
              Log In
            </Button>
          </div>
        </form>
      </Form>
    </main>
  );
}
