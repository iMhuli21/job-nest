import { routes } from '@/lib/constants';
import { Copyright } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  const date = new Date();
  return (
    <footer className='font-[family-name:var(--font-nunito)] p-4'>
      <div className='flex flex-col items-start gap-4 p-4 bg-muted rounded-2xl'>
        <div className='flex items-center gap-7'>
          <Image
            src={'/logo-bg-trans.png'}
            alt='logo'
            width={100}
            height={100}
            priority
            className='object-center object-cover'
          />
          <div>
            <h3>Sitemap</h3>
            <div className='flex items-center gap-4'>
              {routes.map((route) => (
                <Link href={route.href} key={route.href}>
                  {route.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <p className='flex items-center gap-2 text-sm'>
          <Copyright className='size-4' /> {date.getFullYear()} Rights Reserved.
          Created by Hulisani Sadiki
        </p>
      </div>
    </footer>
  );
}
