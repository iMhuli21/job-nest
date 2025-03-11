import Image from 'next/image';
import { HiOutlineAdjustmentsVertical } from 'react-icons/hi2';
import { Building2, HandCoins, MapPinned, Clock2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import HeaderTitle from '@/components/headerTitle';

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
        title='View job'
        subtitle='Find out all the details of the job.'
      />
      <section className='min-h-dvh w-full max-w-[900px] mx-auto p-4 flex flex-col items-start gap-4'>
        <Image
          src={'/Job.png'}
          alt='Job banner Image'
          width={900}
          height={100}
          className='rounded-t-xl object-cover object-center w-full h-50'
          priority
        />
        <h2 className='text-xl font-semibold'>Frontend Developer</h2>
        <div className='flex items-center gap-4 w-full justify-between flex-wrap'>
          <div className='flex items-end gap-2 opacity-50'>
            <Building2 className='w-5 h-5' />
            <span className='text-sm capitalize'>ABC Company</span>
          </div>
          <div className='flex items-end gap-2 opacity-50'>
            <HiOutlineAdjustmentsVertical className='w-5 h-5' />
            <span className='text-sm capitalize'>Senior</span>
          </div>
          <div className='flex items-end gap-2 opacity-50'>
            <MapPinned className='w-5 h-5' />
            <span className='text-sm capitalize'>Remote</span>
          </div>
          <div className='flex items-end gap-2 opacity-50'>
            <HandCoins className='w-5 h-5' />
            <span className='text-sm'>R 50 000.00</span>
          </div>
          <div className='flex items-end gap-2 opacity-50'>
            <Clock2Icon className='w-5 h-5' />
            <span className='text-sm capitalize'>Close date: 10 Feb 2025</span>
          </div>
        </div>
        <div className='flex flex-col items-start gap-1'>
          <h3 className='font-medium'>About Company</h3>
          <p className='text-sm opacity-50'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex modi
            numquam, praesentium nemo omnis incidunt facilis! Illo qui,
            veritatis quibusdam repudiandae pariatur repellat optio autem
            deserunt fugit aut laboriosam sunt? Sit in officia facere, numquam,
            fuga illo nesciunt reprehenderit aperiam illum animi facilis
            molestiae voluptatem velit magni, quidem saepe! Illum consectetur
            illo voluptate quam provident quos at tenetur possimus nostrum.
            Ipsum doloribus repellendus ut quibusdam ad aliquid laboriosam
            repudiandae sed! Soluta distinctio dolores tempore nobis, atque odio
            porro labore eum doloribus enim ?
          </p>
        </div>
        <div className='flex flex-col items-start gap-1'>
          <h3 className='font-medium'>Description</h3>
          <p className='text-sm opacity-50'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex modi
            numquam, praesentium nemo omnis incidunt facilis! Illo qui,
            veritatis quibusdam repudiandae pariatur repellat optio autem
            deserunt fugit aut laboriosam sunt? Sit in officia facere, numquam,
            fuga illo nesciunt reprehenderit aperiam illum animi facilis
            molestiae voluptatem velit magni, quidem saepe! Illum consectetur
            illo voluptate quam provident quos at tenetur possimus nostrum.
            Ipsum doloribus repellendus ut quibusdam ad aliquid laboriosam
            repudiandae sed! Soluta distinctio dolores tempore nobis, atque odio
            porro labore eum doloribus enim ?
          </p>
        </div>
        <div className='flex flex-col items-start gap-1'>
          <h3 className='font-medium'>Roles and Responsibilities</h3>
          <p className='text-sm opacity-50'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex modi
            numquam, praesentium nemo omnis incidunt facilis! Illo qui,
            veritatis quibusdam repudiandae pariatur repellat optio autem
            deserunt fugit aut laboriosam sunt? Sit in officia facere, numquam,
            fuga illo nesciunt reprehenderit aperiam illum animi facilis
            molestiae voluptatem velit magni, quidem saepe! Illum consectetur
            illo voluptate quam provident quos at tenetur possimus nostrum.
            Ipsum doloribus repellendus ut quibusdam ad aliquid laboriosam
            repudiandae sed! Soluta distinctio dolores tempore nobis, atque odio
            porro labore eum doloribus enim ?
          </p>
        </div>
        <Button>Apply</Button>
      </section>
    </main>
  );
}
