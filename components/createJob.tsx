'use client';

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import HeaderTitle from '@/components/headerTitle';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { createJobSchema, CreateJobType } from '@/lib/schemas';
import { contractTypes, experienceLevels, industries } from '@/lib/constants';
import { Label } from '@/components/ui/label';
import { createJobFn } from '@/actions/createJob';
import { toast } from 'sonner';

const RichTextEditor = dynamic(() => import('@/components/richTextEditor'), {
  ssr: false,
});

export default function CreateJob() {
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [question, setQuestion] = useState<string>('');
  const [questions, setQuestions] = useState<string[]>([]);

  const form = useForm<CreateJobType>({
    defaultValues: {
      aboutCompany: '',
      closeDate: undefined,
      company: '',
      contract: '',
      description: '',
      experienceLevel: '',
      industry: '',
      location: '',
      rolesAndResponsibilities: '',
      salary: 0,
      title: '',
    },
    mode: 'onChange',
    resolver: zodResolver(createJobSchema),
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const handleAddTag = () => {
    if (tags.length === 0) {
      setTags([tag]);
    } else if (tags.length > 0) {
      setTags((prev) => [...prev, tag]);
    }

    setTag('');

    return;
  };

  const handleRemoveTag = (tag: string) => {
    setTags((prev) => prev.filter((item) => item !== tag));
    return;
  };

  const handleCreateJob = async (values: CreateJobType) => {
    if (tags.length === 0) {
      return toast.error('Error', {
        description: 'No tags have been given for the job.',
      });
    }

    const res = await createJobFn(values, tags, questions);

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

      window.location.reload();
    }
  };

  const handleAddQuestion = () => {
    if (questions.length === 0) {
      setQuestions([question]);

      setQuestion('');
      return;
    }

    setQuestions((prev) => [...prev, question]);

    setQuestion('');
    return;
  };

  const handleRemoveQuestion = (question: string) => {
    setQuestions((prev) => prev.filter((item) => item !== question));
  };

  return (
    <main className='px-4 font-[family-name:var(--font-nunito)] space-y-10 py-5'>
      <HeaderTitle title='Create job' subtitle='Create a job opportunity.' />
      <section className='min-h-dvh'>
        <Form {...form}>
          <form
            className='max-w-[700px] w-full space-y-7 mx-auto'
            onSubmit={handleSubmit(handleCreateJob)}
          >
            <FormField
              name='title'
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter Job Title' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='company'
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter Company Name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex flex-col items-start gap-2 sm:flex-row sm:items-center'>
              <FormField
                name='contract'
                control={control}
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Contract</FormLabel>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select Contract Type' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className='font-[family-name:var(--font-nunito)]'>
                        {contractTypes.map((contract) => (
                          <SelectItem key={contract} value={contract}>
                            {contract}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name='closeDate'
                control={control}
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Close Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full flex items-center justify-start gap-2',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            <CalendarIcon className='h-4 w-4 opacity-50' />
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span className='text-start'>Pick a date</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        className='w-auto p-0 font-[family-name:var(--font-nunito)]'
                        align='start'
                      >
                        <Calendar
                          mode='single'
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='flex flex-col items-start gap-2 sm:flex-row sm:items-center'>
              <FormField
                name='experienceLevel'
                control={control}
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Experience Level</FormLabel>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select Experience Level' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className='font-[family-name:var(--font-nunito)]'>
                        {experienceLevels.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name='industry'
                control={control}
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Industry</FormLabel>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select Industry' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className='font-[family-name:var(--font-nunito)]'>
                        {industries.map((industry) => (
                          <SelectItem key={industry} value={industry}>
                            {industry}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              name='location'
              control={control}
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter Job Location' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='salary'
              control={control}
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>Salary (R)</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      placeholder='Enter Salary'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex flex-col items-start gap-2 w-full'>
              <Label>Tags</Label>
              <div className='flex items-end gap-2 w-full'>
                <Input
                  className='flex-1'
                  placeholder='Enter tag for job. Hint: You can add one at a time'
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                />
                <Button
                  type='button'
                  variant='outline'
                  disabled={tag.length === 0}
                  onClick={handleAddTag}
                >
                  Add Tag
                </Button>
              </div>
              {tags.length > 0 && (
                <div className='mt-2 p-2'>
                  <ul className='flex items-center gap-4 flex-wrap'>
                    {tags.map((tag) => (
                      <li
                        className='p-2 text-xs bg-muted rounded-md font-semibold hover:cursor-pointer'
                        key={tag}
                        onClick={() => handleRemoveTag(tag)}
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <FormField
              name='aboutCompany'
              control={control}
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>About Company</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Enter Details about the company.'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='description'
              control={control}
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Enter Details about the job.'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name='rolesAndResponsibilities'
              control={control}
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>Roles and Responsibilities</FormLabel>
                  <FormControl>
                    <RichTextEditor
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex flex-col items-start gap-2'>
              <Label>Questions (Optional)</Label>

              <div className='flex items-center gap-2 w-full'>
                <Input
                  className='flex-1'
                  placeholder='Enter Question'
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
                <Button
                  disabled={question.length === 0}
                  type='button'
                  variant='outline'
                  onClick={handleAddQuestion}
                >
                  Add Question
                </Button>
              </div>
              {questions.length > 0 && (
                <div className='flex flex-col items-start gap-2 text-sm'>
                  <span className='opacity-70'>Question:</span>
                  {questions.map((q) => (
                    <p key={q} onClick={() => handleRemoveQuestion(q)}>
                      {q}
                    </p>
                  ))}
                </div>
              )}
            </div>

            <Button
              type='submit'
              className='flex items-center gap-2'
              disabled={isSubmitting}
            >
              {isSubmitting && <Loader2 className='loader' />}
              Create Job
            </Button>
          </form>
        </Form>
      </section>
    </main>
  );
}
