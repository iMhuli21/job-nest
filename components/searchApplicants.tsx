'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchApplicants({ id }: { id: string }) {
  const route = useRouter();
  const search = useSearchParams();

  const statusParam = search.get('status');
  const [query, setQuery] = useState<string>('');
  const [status, setStatus] = useState<string>(statusParam || 'applied');

  const currentPage = Number(search.get('page') as string) || 1;

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();

    return route.push(
      `/job/${id}/applicants?status=${encodeURIComponent(
        status
      )}&query=${encodeURIComponent(query)}&page=${currentPage}`
    );
  };
  return (
    <form className='space-y-4' onSubmit={handleSearch}>
      <Select defaultValue={status} onValueChange={(val) => setStatus(val)}>
        <SelectTrigger className='max-w-[300px] w-full'>
          <SelectValue placeholder='Select Job Status' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='applied'>Applicants</SelectItem>
          <SelectItem value='shortlisted'>Shortlisted</SelectItem>
          <SelectItem value='rejected'>Rejected</SelectItem>
        </SelectContent>
      </Select>

      <div className='flex flex-col sm:flex-row items-start gap-4 w-full'>
        <div className='flex items-center gap-1 border border-input focus-within:border-ring focus-within:ring-[3px] rounded-md px-3 py-1 h-9 w-full'>
          <Search className='flex-none w-4 h-4 opacity-50' />
          <Input
            className='border-0 focus-visible:border-0 focus-visible:ring-0 w-full'
            placeholder='Search Applicant...'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <Button variant='yellow' type='submit'>
          Search
        </Button>
      </div>
    </form>
  );
}
