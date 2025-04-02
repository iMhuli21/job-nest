'use client';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { deleteJobFn } from '@/actions/deleteJob';

export default function DeleteDialog({ id }: { id: string }) {
  const route = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDeleteJob = async () => {
    setLoading(true);
    const res = await deleteJobFn(id);

    if (res?.error) {
      setLoading(false);
      return toast.error('Error', {
        description: res.error,
      });
    } else if (res?.success) {
      setLoading(false);

      toast.success('Success', {
        description: res.success,
      });

      return route.refresh();
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild className='pl-2'>
        <Button
          variant={'ghost'}
          className='flex items-center gap-2 w-full text-left justify-start'
        >
          <Trash2 className='w-4 h-4 flex-none' />
          Delete Job
        </Button>
      </DialogTrigger>
      <DialogContent className='font-[family-name:var(--font-nunito)] py-4'>
        <DialogHeader>
          <DialogTitle>Delete Job</DialogTitle>
          <DialogDescription>Confirm action.</DialogDescription>
        </DialogHeader>
        <p className='opacity-50 text-sm'>
          Are you sure that you want to delete this job? All related data with
          also be deleted, this action is irreversible.
        </p>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              onClick={handleDeleteJob}
              disabled={loading}
              variant={'destructive'}
              className='flex items-center gap-2 capitalize font-normal'
            >
              {loading && <Loader2 className='loader' />}
              <Trash2 />
              Delete job
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
