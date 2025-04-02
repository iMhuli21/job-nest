import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogContent,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { JsonValue } from '@prisma/client/runtime/library';
import { isValidResponseArr } from '@/lib/utils';
import { Label } from './ui/label';

interface Props {
  answers: JsonValue[];
}

export default function ResponsesDropdown({ answers }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild className='pl-2'>
        <Button variant='ghost'>View Responses</Button>
      </DialogTrigger>
      <DialogContent className='font-[family-name:var(--font-nunito)]'>
        <DialogHeader>
          <DialogTitle>Responses</DialogTitle>
          <DialogDescription>
            View responses to the questions asked.
          </DialogDescription>
        </DialogHeader>
        <div className='flex flex-col items-start gap-3'>
          {isValidResponseArr(answers) &&
            answers.map((res) => (
              <div
                key={res.question}
                className='flex flex-col items-start gap-1'
              >
                <Label className='text-base opacity-50'>{res.question}</Label>
                <p className='text-sm'>{res.answer}</p>
              </div>
            ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
