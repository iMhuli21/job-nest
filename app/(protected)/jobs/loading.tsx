import HeaderTitle from '@/components/headerTitle';
import SkeletonJob from '@/components/skeletonJob';

export default function loading() {
  return (
    <main className='px-4 font-[family-name:var(--font-nunito)] space-y-10 py-5'>
      <HeaderTitle
        title='jobs'
        subtitle='These are the latest job opportunities.'
      />
      <section className='min-h-dvh space-y-7'>
        <div className='flex gap-4 items-center md:items-start justify-center xl:justify-start flex-wrap 2xl:grid 2xl:grid-cols-4'>
          <SkeletonJob />
          <SkeletonJob />
          <SkeletonJob />
          <SkeletonJob />
          <SkeletonJob />
          <SkeletonJob />
          <SkeletonJob />
          <SkeletonJob />
          <SkeletonJob />
          <SkeletonJob />
          <SkeletonJob />
          <SkeletonJob />
        </div>
      </section>
    </main>
  );
}
