import Candidate from '@/components/candidate';
import HeaderTitle from '@/components/headerTitle';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SelectContent } from '@radix-ui/react-select';
import { Dot, Search } from 'lucide-react';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function page({ params }: Props) {
  const { id } = await params;
  return (
    <main className='px-4 font-[family-name:var(--font-nunito)] space-y-10 py-5'>
      <HeaderTitle
        title='candidates'
        subtitle='View all the candidates for your job post.'
      />
      <section className='min-h-dvh space-y-6'>
        <div className='flex flex-col items-start gap-1'>
          <h3 className='text-lg font-semibold'>Frontend Developer</h3>
          <div className='flex items-center gap-1 text-sm opacity-50'>
            <span>Remote</span>
            <Dot className='flex-none w-5 h-5' />
            <span>Senior</span>
            <Dot className='flex-none w-5 h-5' />
            <span>Full-Time</span>
            <Dot className='flex-none w-5 h-5' />
            <span>400</span>
          </div>
        </div>
        <div className='flex items-center gap-0 px-3 py-1 h-9 border shadow-xs rounded-md focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px] w-full max-w-[300px]'>
          <Search className='flex-none w-4 h-4 opacity-50' />
          <Input
            className='border-0 ring-0 focus-visible:border-0 focus-visible:ring-0'
            placeholder='Search candidates...'
          />
        </div>
        <Select defaultValue='applied'>
          <SelectTrigger className='w-fit border-0 ring-0'>
            <SelectValue placeholder='Select Job Status' />
          </SelectTrigger>
          <SelectContent className='max-w-[300px] w-full bg-black z-50 p-2 rounded-md shadow-xs'>
            <SelectItem value='applied'>
              Applied{' '}
              <span className='bg-muted py-1 px-2 text-xs rounded w-fit mr-2'>
                100
              </span>
            </SelectItem>
            <SelectItem value='shortlisted'>
              Shortlisted{' '}
              <span className='bg-muted py-1 px-2 text-xs rounded w-fit mr-2'>
                20
              </span>
            </SelectItem>
            <SelectItem value='rejected'>
              Rejected{' '}
              <span className='bg-muted py-1 px-2 text-xs rounded w-fit mr-2'>
                200
              </span>
            </SelectItem>
          </SelectContent>
        </Select>
        <div className='flex gap-4 items-center md:items-start justify-center xl:justify-start flex-wrap 2xl:grid 2xl:grid-cols-4'>
          <Candidate />
          <Candidate />
          <Candidate />
          <Candidate />
          <Candidate />
          <Candidate />
          <Candidate />
          <Candidate />
          <Candidate />
          <Candidate />
        </div>
      </section>
    </main>
  );
}
