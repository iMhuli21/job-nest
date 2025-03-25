'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { FormEvent, useState } from 'react';
import { SearchIcon } from 'lucide-react';
import { industries } from '@/lib/constants';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchComponent({ data }: { data: unknown }) {
  const route = useRouter();
  const search = useSearchParams();
  const [query, setQuery] = useState<string>('');
  const [industry, setIndustry] = useState<string>('');

  const currentPage = Number(search.get('page') as string) || 1;

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();

    return route.push(
      `/search?industry=${encodeURIComponent(
        industry
      )}&query=${encodeURIComponent(query)}&page=${currentPage}`
    );
  };
  return (
    <section className='min-h-dvh space-y-10'>
      <form className='space-y-4' onSubmit={handleSearch}>
        <Select
          defaultValue={industry}
          onValueChange={(val) => setIndustry(val)}
        >
          <SelectTrigger className='max-w-[300px] w-full'>
            <SelectValue placeholder='Select industry' />
          </SelectTrigger>

          <SelectContent>
            {industries.map((industry) => (
              <SelectItem value={industry} key={industry}>
                {industry}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className='flex flex-col sm:flex-row items-start gap-4 w-full'>
          <div className='flex items-center gap-1 border border-input focus-within:border-ring focus-within:ring-[3px] rounded-md px-3 py-1 h-9 w-full'>
            <SearchIcon className='flex-none w-4 h-4 opacity-50' />
            <Input
              className='border-0 focus-visible:border-0 focus-visible:ring-0 w-full'
              placeholder='Search Job Title...'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <Button variant='yellow' type='submit'>
            Search
          </Button>
        </div>
      </form>

      <div className='flex gap-4 items-center md:items-start justify-center xl:justify-start flex-wrap 2xl:grid 2xl:grid-cols-4'>
        {/* <Job /> */}
        jobs
      </div>
      {JSON.stringify(data)}
    </section>
  );
}
