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
import { signUpSchema, SignUpType } from '@/lib/schemas';

export default function SignUp() {
  const form = useForm<SignUpType>({
    defaultValues: {
      contactNumber: '',
      email: '',
      firstName: '',
      lastName: '',
      password: '',
    },
    mode: 'onChange',
    resolver: zodResolver(signUpSchema),
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  const handleCreateAcc = async (values: SignUpType) => {
    console.log(values);
  };
  return (
    <main className='px-4 font-[family-name:var(--font-nunito)] space-y-10 py-5 min-h-dvh flex items-center justify-center'>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(handleCreateAcc)}
          className='max-w-[700px] w-full mx-auto space-y-6'
        >
          <div className='flex flex-col items-start gap-2'>
            <h1 className='text-4xl font-[family-name:var(--font-bebas_neue)]'>
              Create your account
            </h1>
            <div className='flex items-center gap-2 tracking-tight'>
              <span>Already have account?</span>
              <Link href='/sign-in' className='underline'>
                Log In
              </Link>
            </div>
          </div>
          <div className='flex flex-col items-start sm:flex-row sm:items-center w-full sm:justify-between gap-5 mt-10'>
            <FormField
              name='firstName'
              control={control}
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter Your First Name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='lastName'
              control={control}
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter Your Last Name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            name='contactNumber'
            control={control}
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Contact Number</FormLabel>
                <FormControl>
                  <Input placeholder='Enter Your Contact Number' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
              Create Account
            </Button>
          </div>
        </form>
      </Form>
    </main>
  );
}
