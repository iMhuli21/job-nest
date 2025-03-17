'use client';

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Loader2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { accountSchema, AccountType } from '@/lib/schemas';
import { changePasswordFn } from '@/actions/changePassword';

export default function Account() {
  const route = useRouter();
  const form = useForm<AccountType>({
    defaultValues: {
      password: '',
    },
    mode: 'onChange',
    resolver: zodResolver(accountSchema),
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const handleChangePassword = async (values: AccountType) => {
    const res = await changePasswordFn(values);

    if (res?.error) {
      return toast.error('Error', {
        description: res.error,
      });
    } else if (res?.success) {
      toast.success('Success', {
        description: res.success,
      });

      return route.push('/sign-in');
    }
  };

  return (
    <div className='px-2 space-y-4'>
      <div className='flex flex-col items-start gap-1'>
        <h3 className='text-xl font-medium'>Account</h3>
        <span className='opacity-50 font-medium text-sm'>
          Make changes to your account.
        </span>
      </div>
      <div className='flex flex-col items-start gap-7'>
        <Form {...form}>
          <form
            className='flex items-end gap-2 w-full max-w-[700px]'
            onSubmit={handleSubmit(handleChangePassword)}
          >
            <FormField
              name='password'
              control={control}
              render={({ field }) => (
                <FormItem className='flex-1'>
                  <FormLabel>Change Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter new password'
                      type='password'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={isSubmitting}
              variant={'default'}
              className='flex items-center gap-2'
            >
              {isSubmitting && (
                <Loader2 className='w-4 h-4 flex-none animate-spin' />
              )}
              Save Changes
            </Button>
          </form>
        </Form>
        <div className='flex flex-col items-start gap-2'>
          <h4 className='text-sm'>Delete Account</h4>
          <p className='opacity-50 text-sm'>
            By initiating this action your related data including your job posts
            will all be deleted. This action is irrevisable.
          </p>
          <Button className='flex items-center' variant='destructive'>
            <Trash2 />
            <span>Delete Account</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
