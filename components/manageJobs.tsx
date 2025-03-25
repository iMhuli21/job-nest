'use client';

import Job from './job';
import { JobData } from '@/lib/constants';
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsTrigger, TabsList } from '@/components/ui/tabs';

interface Props {
  tab: string | null;
  data: JobData | null | undefined;
}

export default function ManageJobs({ tab, data }: Props) {
  const route = useRouter();
  const activeTab = !tab ? 'for-you' : tab;
  return (
    <Tabs defaultValue={activeTab} className='space-y-4'>
      <TabsList className='mx-auto w-fit'>
        <TabsTrigger
          value='for-you'
          onClick={() => route.push('/jobs?tab=for-you')}
        >
          For You
        </TabsTrigger>
        <TabsTrigger value='all' onClick={() => route.push('/jobs?tab=all')}>
          All
        </TabsTrigger>
      </TabsList>
      <TabsContent
        value='for-you'
        className='flex gap-4 items-center md:items-start justify-center xl:justify-start flex-wrap 2xl:grid 2xl:grid-cols-4'
      >
        {data?.jobs && data.jobs.map((job) => <Job key={job.id} job={job} />)}
      </TabsContent>
      <TabsContent
        value='all'
        className='flex gap-4 items-center md:items-start justify-center xl:justify-start flex-wrap 2xl:grid 2xl:grid-cols-4'
      >
        {data?.jobs && data.jobs.map((job) => <Job key={job.id} job={job} />)}
      </TabsContent>
    </Tabs>
  );
}
