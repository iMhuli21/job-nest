import TargetAudience from '@/components/targetAudience';
import { Button } from '@/components/ui/button';
import { stats } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className='px-4 font-[family-name:var(--font-nunito)] space-y-10 py-5'>
      <section className='min-h-[80dvh] flex flex-col-reverse items-start md:flex-row md:items-center md:justify-between gap-4 md:gap-10 p-4'>
        <div className='flex flex-col items-start gap-4'>
          <h1 className='font-[family-name:var(--font-bebas_neue)] text-3xl sm:text-4xl md:text-5xl'>
            Empowering your job search journey
          </h1>
          <p className='w-full max-w-[700px]'>
            JobNest is a dynamic job board platform designed to streamline the
            job search process for both employers and job seekers alike. Whether
            you&apos;re a recent graduate, a seasoned professional, or a company
            looking to hire top talent, JobNest provides the tools and resources
            you need to succeed.
          </p>
          <div className='flex items-center gap-4'>
            <Button asChild>
              <Link href={'/search'}>Find Job</Link>
            </Button>
            <Button variant='yellow' asChild>
              <Link href={'/job/create'}>Post Job</Link>
            </Button>
          </div>
        </div>
        <Image
          src={'/globe-bg-trans.png'}
          alt='hero image'
          width={500}
          height={500}
          priority
        />
      </section>
      <section className='bg-muted p-6 rounded-2xl space-y-4'>
        <h2 className='font-[family-name:var(--font-bebas_neue)] text-2xl text-center'>
          Benefits of jobnest
        </h2>
        <div className='flex items-center overflow-hidden whitespace-nowrap'>
          <div className='flex animate-scroll space-x-8'>
            {stats.map((stat, index) => (
              <div key={index} className='min-w-max px-4'>
                <span className='text-lg'>{stat}</span>
              </div>
            ))}
            {/* Clone the stats to create a seamless loop */}
            {stats.map((stat, index) => (
              <div key={`clone-${index}`} className='min-w-max px-4'>
                <span className='text-lg'>{stat}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className='flex flex-col items-center justify-center gap-4'>
        <h2 className='font-[family-name:var(--font-bebas_neue)] text-2xl text-center'>
          who is jobnest for
        </h2>
        <TargetAudience />
      </section>
    </main>
  );
}
