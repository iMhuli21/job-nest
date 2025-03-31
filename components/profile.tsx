'use client';

import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormMessage,
  FormControl,
} from '@/components/ui/form';
import {
  generateClientDropzoneAccept,
  generatePermittedFileTypes,
} from 'uploadthing/client';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { useDropzone } from '@uploadthing/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema, ProfileType } from '@/lib/schemas';
import { useUploadThing } from '@/lib/uploadthing';
import { updateProfileFn } from '@/actions/updateProfile';
import { useRouter } from 'next/navigation';

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
  const route = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [cvUrl, setCvUrl] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

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
    const res = await updateProfileFn(values, cvUrl);

    if (res?.error) {
      return toast.error('Error', {
        description: res.error,
      });
    } else if (res?.success) {
      toast.success('Success', {
        description: res.success,
      });

      return route.refresh();
    }
  };

  const { startUpload, routeConfig, isUploading } = useUploadThing(
    'cvUploader',
    {
      onClientUploadComplete: (res) => {
        toast.success('Success', {
          description: 'Uploaded successfully!',
        });

        setFiles([]);

        setCvUrl(res[0].ufsUrl);
      },
      onUploadError: () => {
        toast.error('Error', {
          description: 'Error occurred while uploading',
        });
      },
      onUploadBegin: () => {
        toast.info('Message', {
          description: 'Upload has begun',
        });
      },
    }
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: generateClientDropzoneAccept(
      generatePermittedFileTypes(routeConfig).fileTypes
    ),
  });

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
          <div className='space-y-3 w-full'>
            <div
              className='w-full border-2 border-dashed p-4 h-[150px] rounded-md flex items-center justify-center opacity-60'
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {files.length === 0 ? (
                <span>Drop files here!</span>
              ) : (
                <span>File selected.</span>
              )}
            </div>
            {files.length > 0 && (
              <div className='flex items-center gap-2'>
                <Button
                  className='flex items-center gap-2'
                  disabled={isUploading}
                  variant='secondary'
                  onClick={() => startUpload(files)}
                >
                  {isUploading && (
                    <Loader2 className='w-4 h-4 flex-none animate-spin' />
                  )}
                  Upload File
                </Button>
                <Button disabled={isUploading} onClick={() => setFiles([])}>
                  Cancel Upload
                </Button>
              </div>
            )}
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
