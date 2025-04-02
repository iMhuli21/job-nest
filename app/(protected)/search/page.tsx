'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { useCallback, useEffect, useState } from 'react';
import Job from '@/components/job';
import { industries, JobData } from '@/lib/constants';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Pagination from '@/components/pagination';
import HeaderTitle from '@/components/headerTitle';
import { Loader2, SearchIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import SkeletonJob from '@/components/skeletonJob';

export default function SearchPage() {
  const route = useRouter();
  const search = useSearchParams();
  const [resetKey, setResetKey] = useState(0);
  const [res, setRes] = useState<JobData | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState(search.get('query') || '');
  const [industry, setIndustry] = useState(search.get('industry') || '');

  const currentPage = Number(search.get('page')) || 1;

  const handleSearch = () => {
    if (industry.length === 0 && query.length === 0) {
      return toast('Error', {
        description: 'No query parameters set.',
      });
    }

    window.location.assign(
      `/search?industry=${encodeURIComponent(
        industry
      )}&query=${encodeURIComponent(query)}&page=${currentPage}`
    );
  };

  const handleReset = () => {
    setRes(null);
    setIndustry('');
    setQuery('');
    setResetKey((prev) => prev + 1);

    route.push('/search');
  };

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    const response = await fetch(
      `/api/search?industry=${encodeURIComponent(
        industry
      )}&query=${encodeURIComponent(query)}&page=${currentPage}`
    );

    if (response.ok) {
      const data = (await response.json()) as unknown as JobData;
      setRes(data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (search.get('query') || search.get('industry') || search.get('page')) {
      fetchJobs();
    }
  }, [fetchJobs, search]);

  return (
    <main className='px-4 font-[family-name:var(--font-nunito)] space-y-10 py-5'>
      <HeaderTitle title='search' subtitle='Find a job that suits you.' />
      <section className='min-h-dvh space-y-10'>
        <form className='space-y-4'>
          <Select
            key={resetKey}
            defaultValue={industry}
            onValueChange={(val) => setIndustry(val)}
          >
            <SelectTrigger className='max-w-[300px] w-full'>
              <SelectValue placeholder='Select industry' />
            </SelectTrigger>

            <SelectContent className='font-[family-name:var(--font-nunito)]'>
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

            <div className='flex items-center gap-2'>
              <Button type='button' onClick={handleReset}>
                Clear
              </Button>
              <Button
                type='button'
                disabled={isLoading}
                variant='yellow'
                onClick={handleSearch}
                className='flex items-center gap-2'
              >
                {isLoading && <Loader2 className='loader' />}
                Search
              </Button>
            </div>
          </div>
        </form>

        <div className='flex gap-4 items-center md:items-start justify-center xl:justify-start flex-wrap 2xl:grid 2xl:grid-cols-4'>
          {res?.jobs.map((job) => (
            <Job key={job.id} job={job} />
          ))}
        </div>

        {isLoading && (
          <div className='flex gap-4 items-center md:items-start justify-center xl:justify-start flex-wrap 2xl:grid 2xl:grid-cols-4'>
            <SkeletonJob />
            <SkeletonJob />
            <SkeletonJob />
            <SkeletonJob />
            <SkeletonJob />
            <SkeletonJob />
            <SkeletonJob />
          </div>
        )}

        {res?.jobs.length === 0 && (
          <p className='text-center opacity-60 font-semibold'>
            Jobs not found...
          </p>
        )}
      </section>
      {res?.jobs && res?.jobs.length > 0 && (
        <Pagination href='/search' numberOfPages={res?.numPages} />
      )}
    </main>
  );
}
