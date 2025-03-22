import { Skeleton } from './ui/skeleton';

export default function SkeletonJob() {
  return (
    <div className='font-[family-name:var(--font-nunito)] p-4 border rounded-md shadow flex flex-col items-start gap-4 w-[350px] hover:cursor-pointer bg-inherit'>
      <div className='flex items-center gap-4'>
        <Skeleton className='animate-pulse w-[60px] h-[60px] rounded-md' />
        <div className='flex flex-col items-start gap-2'>
          <Skeleton className='animate-pulse w-[150px] h-6 rounded-md' />
          <Skeleton className='animate-pulse w-[150px] h-2 rounded-md' />
        </div>
      </div>
      <div className='flex items-center gap-4 w-[350px]'>
        <Skeleton className='animate-pulse w-[100px] h-5 rounded-md' />
        <Skeleton className='animate-pulse w-[150px] h-5 rounded-md' />
      </div>
      <div className='flex items-center gap-4 w-[350px]'>
        <Skeleton className='animate-pulse w-[100px] h-5 rounded-md' />
        <Skeleton className='animate-pulse w-[150px] h-5 rounded-md' />
      </div>

      <Skeleton className='animate-pulse w-full h-[70px] rounded-md' />
      <div className='flex items-center gap-4'>
        <Skeleton className='animate-pulse w-[150px] h-10 rounded-md' />
        <Skeleton className='animate-pulse w-[150px] h-10 rounded-md' />
      </div>
    </div>
  );
}
