'use client';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FaCloudArrowDown } from 'react-icons/fa6';
import { JsonValue } from '@prisma/client/runtime/library';
import { isStringArray } from '@/lib/utils';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface Props {
  questions: JsonValue[];
  cvUrl: string | null;
}

export default function ApplyBtn({ cvUrl, questions }: Props) {
  const route = useRouter();
  const handleSendApp = async () => {
    if (!cvUrl) {
      return toast.error('Error', {
        className:
          'font-[family-name:var(--font-nunito)] flex items-center gap-2',
        description: 'No Cv added, go to settings to add your cv.',
        action: {
          label: 'Go',
          onClick: () => route.push('/settings'),
        },
      });
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Apply</Button>
      </DialogTrigger>
      <DialogContent className='font-[family-name:var(--font-nunito)]'>
        <DialogHeader>
          <DialogTitle>Send Application</DialogTitle>
          <DialogDescription>
            Review your application details before sending your application in.
          </DialogDescription>
        </DialogHeader>
        <div className='py-3 space-y-4'>
          <div className='flex flex-col items-start gap-2'>
            <h3>1. Resume</h3>
            <a
              href={!cvUrl ? '#' : cvUrl}
              target='_blank'
              className='flex items-center gap-2 border rounded-md p-2 ring-1 text-sm'
            >
              <FaCloudArrowDown />
              <span>View Resume</span>
            </a>
          </div>
          <div className='flex flex-col items-start gap-2'>
            <h3>2. Questions</h3>
            <div className='flex flex-col items-start gap-2'>
              {isStringArray(questions) &&
                questions.map((item) => (
                  <div key={item}>
                    <Label>{item}</Label>
                    <div className='flex items-center gap-2 w-full'>
                      <Input className='flex-1' placeholder='Enter answer' />
                      <Button>Add</Button>
                    </div>
                  </div>
                ))}
            </div>
            {questions.length === 0 && (
              <p className='opacity-60'>No questions added.</p>
            )}
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Cancel</Button>
          </DialogClose>

          <Button variant='yellow' onClick={handleSendApp}>
            Send Application
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
