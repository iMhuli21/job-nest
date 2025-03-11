'use client';

import { Tabs, TabsContent, TabsTrigger, TabsList } from '@/components/ui/tabs';
import { useRouter } from 'next/navigation';
import Job from './job';

interface Props {
  tab: string | null;
}

export default function ManageJobs({ tab }: Props) {
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
        <Job />
        <Job />
        <Job />
        <Job />
        <Job />
        <Job />
        <Job />
        <Job />
        <Job />
        <Job />
      </TabsContent>
      <TabsContent
        value='all'
        className='flex gap-4 items-center md:items-start justify-center xl:justify-start flex-wrap 2xl:grid 2xl:grid-cols-4'
      >
        <Job />
        <Job />
        <Job />
        <Job />
        <Job />
        <Job />
        <Job />
        <Job />
        <Job />
        <Job />
      </TabsContent>
    </Tabs>
  );
}
