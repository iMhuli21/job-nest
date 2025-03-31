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
import { toast } from 'sonner';
import { useState } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Loader2 } from 'lucide-react';
import { Responses } from '@/lib/constants';
import { isStringArray } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { FaCloudArrowDown } from 'react-icons/fa6';
import { JsonValue } from '@prisma/client/runtime/library';
import { userApplyFn } from '@/actions/createApplication';

interface Props {
  disabled?: boolean;
  jobId: string;
  questions: JsonValue[];
  cvUrl: string | null;
}

export default function ApplyBtn({ disabled, cvUrl, jobId, questions }: Props) {
  const route = useRouter();

  const customQuestions =
    isStringArray(questions) &&
    questions.map((item, i) => ({ question: item, id: i + 1 }));
  const [answers, setAnswers] = useState<{ [questionId: number]: string }>({});
  const [loading, setLoading] = useState(false);
  const [responses, setResponses] = useState<Responses[]>([]);

  const handleSendApp = async () => {
    setLoading(true);
    if (!cvUrl) {
      setLoading(false);
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

    if (questions.length !== responses.length) {
      setLoading(false);
      return toast.error('Error', {
        description: 'Questions not answered.',
      });
    }

    const res = await userApplyFn(cvUrl, jobId, responses);

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

      route.refresh();
      return;
    }
  };

  const addAnswer = (questionId: number, answer: string) => {
    if (customQuestions) {
      setAnswers((prev) => ({ ...prev, [questionId]: answer }));
    }
  };

  const handleResponse = (questionId: number, question: string) => {
    setResponses((prev) => {
      const existingIndex = prev.findIndex((res) => res.question === question);

      if (existingIndex !== -1) {
        const updatedResponses = [...prev];
        updatedResponses[existingIndex] = {
          question,
          answer: answers[questionId],
        };
        return updatedResponses;
      }

      // Add new answer
      return [...prev, { question, answer: answers[questionId] }];
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={disabled}>{disabled ? 'Applied' : 'Apply'}</Button>
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
              className='flex items-center gap-2 border ring-input rounded-md p-2 ring-1 text-sm'
            >
              <FaCloudArrowDown />
              <span>View Resume</span>
            </a>
          </div>
          <div className='flex flex-col items-start gap-2 w-full'>
            <h3>2. Questions</h3>
            <div className='flex flex-col items-start gap-6 w-full'>
              {customQuestions &&
                customQuestions.map((item, i) => (
                  <div
                    className='w-full flex flex-col items-start gap-2'
                    key={item.question}
                  >
                    <Label className='opacity-70'>{item.question}</Label>
                    <div className='flex items-center gap-2 w-full'>
                      <Input
                        className='flex-1'
                        placeholder='Enter answer'
                        value={answers[item.id] || ''}
                        onChange={(e) => addAnswer(item.id, e.target.value)}
                      />
                      <Button
                        variant='outline'
                        onClick={() => handleResponse(item.id, item.question)}
                      >
                        Add
                      </Button>
                    </div>
                    {responses.length > 0 && responses[i] && (
                      <span className='w-full block text-sm'>
                        Answer: {responses[i].answer}
                      </span>
                    )}
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
            <Button disabled={loading}>Cancel</Button>
          </DialogClose>
          <Button
            disabled={disabled || loading}
            className='flex items-center gap-2'
            variant='yellow'
            onClick={handleSendApp}
          >
            {loading && <Loader2 className='w-4 h-4 flex-none animate-spin' />}
            Send Application
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
