import Link from 'next/link';
import Image from 'next/image';
import { Search } from 'lucide-react';
import { routes } from '@/lib/constants';
import MenuDropdown from './menuDropdown';

export default function Navbar() {
  return (
    <header className='w-full'>
      <nav className='flex items-center gap-4 justify-between px-4 font-[family-name:var(--font-nunito)] py-2'>
        <Link href='/'>
          <Image
            src={'/logo-bg-trans.png'}
            alt='logo'
            width={130}
            height={130}
            priority
            className='object-center object-cover'
          />
        </Link>
        <div className='flex items-center gap-7'>
          {routes.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className='hidden sm:block'
            >
              {route.label}
            </Link>
          ))}
          <Link href='/search'>
            <Search className='text-xl hover:cursor-pointer' />
          </Link>
          <MenuDropdown />
        </div>
      </nav>
    </header>
  );
}
