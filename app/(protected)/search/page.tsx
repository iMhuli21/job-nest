'use client';

import {
  Form,
  FormControl,
  FormItem,
  FormMessage,
  FormField,
} from '@/components/ui/form';
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectValue,
} from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { searchSchema, SearchType } from '@/lib/schemas';
import { industries } from '@/lib/constants';
import { SearchIcon } from 'lucide-react';
import Job from '@/components/job';

export default function SearchPage() {
  const form = useForm<SearchType>({
    defaultValues: {
      industry: '',
      query: '',
    },
    mode: 'onChange',
    resolver: zodResolver(searchSchema),
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  const searchForJob = async (values: SearchType) => {
    console.log('Search...', values);
  };
  return (
    <main className='px-4 font-[family-name:var(--font-nunito)] space-y-10 py-5'>
      <div className='flex flex-col items-center justify-center gap-1'>
        <h2 className='font-[family-name:var(--font-bebas_neue)] text-2xl text-center'>
          search
        </h2>
        <span className='opacity-60'>Find a job that suits you.</span>
      </div>
      <section className='min-h-dvh space-y-10'>
        <Form {...form}>
          <form className='space-y-4' onSubmit={handleSubmit(searchForJob)}>
            <FormField
              name='industry'
              control={control}
              render={({ field }) => (
                <FormItem className='max-w-[300px] w-full'>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select industry' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem value={industry} key={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex flex-col sm:flex-row items-start gap-4 w-full'>
              <FormField
                name='query'
                control={control}
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormControl>
                      <div className='flex items-center gap-2 border border-input focus-within:border-ring focus-within:ring-[3px] rounded-md px-3 py-1 h-9 w-full'>
                        <SearchIcon className='opacity-50' />
                        <Input
                          className='border-0 focus-visible:border-0 focus-visible:ring-0 w-full'
                          placeholder='Search'
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='flex items-center gap-4'>
                <Button type='button' disabled={isSubmitting}>
                  Clear
                </Button>
                <Button type='submit' disabled={isSubmitting} variant='yellow'>
                  Search
                </Button>
              </div>
            </div>
          </form>
        </Form>
        <div className='flex gap-4 items-center md:items-start justify-center xl:justify-start flex-wrap 2xl:grid 2xl:grid-cols-4'>
          <Job />
          <Job />
          <Job />
          <Job />
          <Job />
          <Job />
          <Job />
          <Job />
          <Job />
        </div>
      </section>
    </main>
  );
}
