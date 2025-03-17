'use client';

import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormMessage,
  FormControl,
} from '@/components/ui/form';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema, ProfileType } from '@/lib/schemas';

interface Props {
  user: {
    contactNumber: string;
    fullName: string;
    email: string;
    jobTitle: string;
    createdAt: Date;
    cvUrl: string | null;
  } | null;
}

export default function Profile({ user }: Props) {
  const form = useForm<ProfileType>({
    defaultValues: {
      contactNumber: user?.contactNumber,
      email: user?.email,
      fullName: user?.fullName,
      jobTitle: user?.jobTitle,
    },
    mode: 'onChange',
    resolver: zodResolver(profileSchema),
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const handleProfileUpdate = async (values: ProfileType) => {
    console.log(values);
  };
  return (
    <div className='px-2 space-y-4'>
      <div className='flex flex-col items-start gap-1'>
        <h3 className='text-xl font-medium'>Edit Profile</h3>
        <span className='opacity-50 font-medium text-sm'>
          Keep your information up to date.
        </span>
      </div>
      <Form {...form}>
        <form
          className='max-w-[900px] w-full flex flex-col items-start gap-7'
          onSubmit={handleSubmit(handleProfileUpdate)}
        >
          <div className='w-full border-2 border-dashed rounded-md flex items-center justify-center p-4 h-40 hover:cursor-pointer bg-muted/20'>
            <span className='opacity-50'>
              Drag your file or click here to upload your cv.
            </span>
          </div>
          <FormField
            name='contactNumber'
            control={control}
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Contact Number</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name='fullName'
            control={control}
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                  <Input type='email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name='jobTitle'
            control={control}
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type='submit'
            disabled={isSubmitting}
            variant={'yellow'}
            className='flex items-center gap-2'
          >
            {isSubmitting && (
              <Loader2 className='animate-spin w-4 h-4 flex-none' />
            )}
            Save Changes
          </Button>
        </form>
      </Form>
    </div>
  );
}
