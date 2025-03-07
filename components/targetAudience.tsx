'use client';

import { audienceData } from '@/lib/constants';
import { Tabs, TabsList, TabsContent, TabsTrigger } from './ui/tabs';
import { Card, CardContent } from './ui/card';
import { Briefcase, GraduationCap, Globe, Paintbrush } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function TargetAudience() {
  const [selected, setSelected] = useState(0);
  return (
    <div className='max-w-[700px]'>
      <Tabs defaultValue='jobSeekers'>
        <TabsList>
          {audienceData.map((audience, i) => (
            <TabsTrigger
              key={audience.title}
              value={audience.name}
              onClick={() => setSelected(i)}
              className='text-base'
            >
              {audience.title}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value='jobSeekers'>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardContent className='flex flex-col items-center gap-4'>
                <GraduationCap className='size-12' />
                <h2 className='text-xl font-semibold'>
                  {audienceData[selected].title}
                </h2>
                <p className='opacity-50'>
                  {audienceData[selected].description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
        <TabsContent value='employers&recruiters'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardContent className='flex flex-col items-center gap-4'>
                <Briefcase className='size-12' />
                <h2 className='text-xl font-semibold'>
                  {audienceData[selected].title}
                </h2>
                <p className='opacity-50'>
                  {audienceData[selected].description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
        <TabsContent value='freelancers'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardContent className='flex flex-col items-center gap-4'>
                <Paintbrush className='size-12' />
                <h2 className='text-xl font-semibold'>
                  {audienceData[selected].title}
                </h2>
                <p className='opacity-50'>
                  {audienceData[selected].description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
        <TabsContent value='remoteWorkers'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardContent className='flex flex-col items-center gap-4'>
                <Globe className='size-12' />
                <h2 className='text-xl font-semibold'>
                  {audienceData[selected].title}
                </h2>
                <p className='opacity-50'>
                  {audienceData[selected].description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
